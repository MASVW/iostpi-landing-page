<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use App\Models\SiteContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class PublicSiteContentController extends Controller
{
    public function frontend(): JsonResponse
    {
        $contents = SiteContent::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        $pages = $contents
            ->where('content_type', 'page')
            ->keyBy(fn (SiteContent $content): string => $this->pageSlug($content))
            ->map(fn (SiteContent $content): array => $this->pagePayload($content, $contents));

        $homeHero = $contents->firstWhere('key', 'home.hero');
        $homePartnerNotes = $contents->firstWhere('key', 'home.partner-notes');
        $homeActivities = $contents->firstWhere('key', 'home.activities');

        return response()->json([
            'navigation' => $this->navigationPayload($contents),
            'pages' => $pages,
            'home' => [
                'hero' => $homeHero ? $this->contentPayload($homeHero) + [
                    'slides' => $this->heroSlides($homeHero),
                ] : null,
                'partner_notes' => $homePartnerNotes ? $this->contentPayload($homePartnerNotes) + [
                    'items' => $this->partnerNotes($homePartnerNotes),
                ] : null,
                'activities' => $homeActivities ? $this->contentPayload($homeActivities) + [
                    'items' => $this->extractActivities($homeActivities->content),
                ] : null,
                'announcements' => [
                    'items' => $this->latestAnnouncements(),
                ],
            ],
            'footer' => [
                'contact' => optional($contents->firstWhere('key', 'footer.contact'), fn (SiteContent $content): array => $this->contentPayload($content)),
                'partners' => optional($contents->firstWhere('key', 'footer.partners'), fn (SiteContent $content): array => $this->contentPayload($content)),
            ],
        ]);
    }

    public function page(string $slug): JsonResponse
    {
        $contents = SiteContent::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        $record = $contents->firstWhere('key', "page.{$slug}");

        abort_if(! $record, 404);

        return response()->json($this->pagePayload($record, $contents));
    }

    protected function navigationPayload(Collection $contents): array
    {
        $sambutanChildren = $this->groupLinks($contents, 'Sambutan', exceptKey: 'page.sambutan');
        $teacherChildren = $this->groupLinks($contents, 'Kompetisi Guru', exceptKey: 'page.kompetisi-guru');
        $studentChildren = $this->groupLinks($contents, 'Olimpiade Siswa', exceptKey: 'page.olimpiade-siswa');

        return [
            ['label' => 'Beranda', 'path' => '/'],
            [
                'label' => 'Sambutan',
                'path' => $sambutanChildren[0]['path'] ?? '/',
                'children' => $sambutanChildren,
            ],
            [
                'label' => $contents->firstWhere('key', 'page.kompetisi-guru')?->navigation_label ?? 'Kompetisi Guru',
                'path' => '/page/kompetisi-guru',
                'children' => $teacherChildren,
            ],
            [
                'label' => 'Olimpiade Siswa',
                'path' => $studentChildren[0]['path'] ?? '/',
                'children' => $studentChildren,
            ],
            ...$this->linksForKeys($contents, [
                'page.prosedur-pendaftaran',
                'page.kumpulan-soal',
                'page.lokasi-ujian',
                'page.pengumuman',
            ]),
        ];
    }

    protected function pagePayload(SiteContent $content, Collection $contents): array
    {
        return $this->contentPayload($content) + [
            'slug' => $this->pageSlug($content),
            'related' => $this->relatedLinks($content, $contents),
        ];
    }

    protected function contentPayload(SiteContent $content): array
    {
        return [
            'key' => $content->key,
            'type' => $content->content_type,
            'navigation_group' => $content->navigation_group,
            'navigation_label' => $content->navigation_label,
            'title' => $content->title,
            'image_url' => $content->image_url,
            'content' => $content->rendered_content,
            'data' => $content->structured_data,
            'sort_order' => $content->sort_order,
        ];
    }

    protected function relatedLinks(SiteContent $content, Collection $contents): array
    {
        return match ($content->navigation_group) {
            'Sambutan' => $this->groupLinks($contents, 'Sambutan', exceptKey: 'page.sambutan'),
            'Kompetisi Guru' => $this->groupLinks($contents, 'Kompetisi Guru', exceptKey: 'page.kompetisi-guru'),
            'Olimpiade Siswa' => $this->groupLinks($contents, 'Olimpiade Siswa', exceptKey: 'page.olimpiade-siswa'),
            default => [
                ...$this->linksForKeys($contents, [
                    'page.kompetisi-guru',
                    'page.prosedur-pendaftaran',
                    'page.kumpulan-soal',
                    'page.lokasi-ujian',
                    'page.pengumuman',
                ]),
            ],
        };
    }

    protected function groupLinks(Collection $contents, string $group, ?string $exceptKey = null): array
    {
        return $contents
            ->where('content_type', 'page')
            ->where('navigation_group', $group)
            ->reject(fn (SiteContent $content): bool => $exceptKey && $content->key === $exceptKey)
            ->sortBy('sort_order')
            ->map(fn (SiteContent $content): array => $this->linkPayload($content))
            ->values()
            ->all();
    }

    protected function linksForKeys(Collection $contents, array $keys): array
    {
        return collect($keys)
            ->map(fn (string $key): ?SiteContent => $contents->firstWhere('key', $key))
            ->filter()
            ->map(fn (SiteContent $content): array => $this->linkPayload($content))
            ->values()
            ->all();
    }

    protected function linkPayload(SiteContent $content): array
    {
        return [
            'label' => $content->navigation_label,
            'path' => $content->key === 'page.pengumuman'
                ? '/pengumuman'
                : '/page/' . $this->pageSlug($content),
        ];
    }

    protected function pageSlug(SiteContent $content): string
    {
        return Str::after($content->key, 'page.');
    }

    protected function heroSlides(SiteContent $content): array
    {
        $slides = collect($content->structured_data['slides'] ?? [])
            ->filter(fn (mixed $slide): bool => is_array($slide) && filled($slide['image_url'] ?? null))
            ->map(fn (array $slide, int $index): array => [
                'judul' => trim((string) ($slide['caption'] ?? '')) ?: 'Slide ' . ($index + 1),
                'filename' => $slide['image_url'],
            ])
            ->values()
            ->all();

        return $slides ?: $this->extractHeroSlides($content->rendered_content);
    }

    protected function partnerNotes(SiteContent $content): array
    {
        $items = collect($content->structured_data['notes'] ?? [])
            ->filter(fn (mixed $note): bool => is_array($note) && filled($note['title'] ?? null))
            ->map(fn (array $note): array => [
                'title' => trim((string) ($note['title'] ?? '')),
                'description' => trim(preg_replace('/\s+/', ' ', strip_tags((string) ($note['description'] ?? '')))),
                'url' => blank($note['url'] ?? null) ? null : trim((string) $note['url']),
            ])
            ->values()
            ->all();

        return $items ?: $this->extractPartnerNotes($content->rendered_content);
    }

    protected function latestAnnouncements(): array
    {
        return Announcement::query()
            ->with('user')
            ->published()
            ->orderByDesc('published_at')
            ->orderByDesc('sort_order')
            ->orderByDesc('id')
            ->limit(3)
            ->get()
            ->map(fn (Announcement $announcement): array => [
                'id' => $announcement->id,
                'title' => $announcement->title,
                'slug' => $announcement->slug,
                'path' => '/pengumuman/' . $announcement->slug,
                'excerpt' => $announcement->excerpt,
                'image_url' => $announcement->image_url,
                'published_at' => $announcement->published_at?->toIso8601String(),
                'publisher_name' => $announcement->publisher_name,
                'viewers' => $announcement->viewers,
            ])
            ->all();
    }

    protected function extractHeroSlides(string $html): array
    {
        return $this->loadHtml($html, function (\DOMXPath $xpath): array {
            $slides = [];

            foreach ($xpath->query('//li') as $item) {
                $image = $xpath->query('.//img', $item)->item(0);
                $imageUrl = $image?->getAttribute('src');

                $title = trim(preg_replace('/\s+/', ' ', $item->textContent));

                if ($imageUrl) {
                    $slides[] = [
                        'judul' => $title ?: ($image?->getAttribute('alt') ?: 'Slide ' . (count($slides) + 1)),
                        'filename' => $imageUrl,
                    ];
                }
            }

            return $slides;
        });
    }

    protected function extractPartnerNotes(string $html): array
    {
        return $this->loadHtml($html, function (\DOMXPath $xpath): array {
            $headings = $xpath->query('//h2|//h3');
            $items = [];

            foreach ($headings as $heading) {
                $title = trim($heading->textContent);
                $description = '';
                $url = null;

                for ($node = $heading->nextSibling; $node; $node = $node->nextSibling) {
                    if ($node instanceof \DOMElement && in_array(strtolower($node->tagName), ['h2', 'h3'], true)) {
                        break;
                    }

                    if ($node instanceof \DOMElement && strtolower($node->tagName) === 'p') {
                        $link = $node->getElementsByTagName('a')->item(0);

                        if ($link) {
                            $url = $link->getAttribute('href');
                        } elseif (blank($description)) {
                            $description = trim(preg_replace('/\s+/', ' ', $node->textContent));
                        }
                    }
                }

                if ($title) {
                    $items[] = compact('title', 'description', 'url');
                }
            }

            return $items;
        });
    }

    protected function extractActivities(string $html): array
    {
        return $this->loadHtml($html, function (\DOMXPath $xpath): array {
            $paths = [
                'Seminar Guru' => '/page/seminar-guru',
                'Olimpiade Guru' => '/page/olimpiade-guru',
                'LKTI Guru' => '/page/lkti-guru',
                'Olimpiade Siswa SMA/MA/SMK' => '/page/olimpiade-siswa-sma-ma-smk',
                'Olimpiade Siswa SMP/MTs' => '/page/olimpiade-siswa-smp-mts',
                'Olimpiade Siswa SD/MI' => '/page/olimpiade-siswa-sd-mi',
            ];

            $items = [];

            foreach ($xpath->query('//li') as $item) {
                $text = trim(preg_replace('/\s+/', ' ', $item->textContent));

                if (! $text) {
                    continue;
                }

                [$title, $description] = array_pad(preg_split('/\s+-\s+/', $text, 2), 2, '');

                $items[] = [
                    'title' => $title,
                    'description' => $description,
                    'path' => $paths[$title] ?? '/',
                ];
            }

            return $items;
        });
    }

    protected function loadHtml(string $html, callable $callback): array
    {
        if (blank($html)) {
            return [];
        }

        $document = new \DOMDocument();
        $previous = libxml_use_internal_errors(true);
        $document->loadHTML('<?xml encoding="utf-8" ?>' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_clear_errors();
        libxml_use_internal_errors($previous);

        return $callback(new \DOMXPath($document));
    }
}

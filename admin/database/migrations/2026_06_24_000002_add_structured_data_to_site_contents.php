<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('site_contents')) {
            return;
        }

        if (! Schema::hasColumn('site_contents', 'data')) {
            Schema::table('site_contents', function (Blueprint $table): void {
                $table->json('data')->nullable()->after('content');
            });
        }

        $this->seedStructuredData();
    }

    public function down(): void
    {
        if (! Schema::hasTable('site_contents') || ! Schema::hasColumn('site_contents', 'data')) {
            return;
        }

        Schema::table('site_contents', function (Blueprint $table): void {
            $table->dropColumn('data');
        });
    }

    protected function seedStructuredData(): void
    {
        $records = DB::table('site_contents')
            ->whereIn('key', [
                'home.hero',
                'home.partner-notes',
                'footer.contact',
                'footer.partners',
            ])
            ->get();

        foreach ($records as $record) {
            if (filled($record->data)) {
                continue;
            }

            $data = match ($record->key) {
                'home.hero' => ['slides' => $this->extractSlides($record->content)],
                'home.partner-notes' => ['notes' => $this->extractPartnerNotes($record->content)],
                'footer.contact' => $this->footerContactData($record->content),
                'footer.partners' => $this->footerPartnersData($record->content),
                default => null,
            };

            DB::table('site_contents')
                ->where('id', $record->id)
                ->update([
                    'data' => json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                    'updated_at' => now(),
                ]);
        }
    }

    protected function extractSlides(string $html): array
    {
        return $this->loadHtml($html, function (DOMXPath $xpath): array {
            $slides = [];

            foreach ($xpath->query('//li') as $item) {
                $image = $xpath->query('.//img', $item)->item(0);
                $imagePath = $image?->getAttribute('src');

                if (! $imagePath) {
                    continue;
                }

                $caption = trim(preg_replace('/\s+/', ' ', $item->textContent));

                $slides[] = [
                    'caption' => $caption ?: ($image?->getAttribute('alt') ?: 'Slide ' . (count($slides) + 1)),
                    'image_path' => ltrim($imagePath, '/'),
                ];
            }

            return $slides;
        });
    }

    protected function extractPartnerNotes(string $html): array
    {
        return $this->loadHtml($html, function (DOMXPath $xpath): array {
            $notes = [];

            foreach ($xpath->query('//h2|//h3') as $heading) {
                $title = trim($heading->textContent);
                $description = '';
                $url = '';

                for ($node = $heading->nextSibling; $node; $node = $node->nextSibling) {
                    if ($node instanceof DOMElement && in_array(strtolower($node->tagName), ['h2', 'h3'], true)) {
                        break;
                    }

                    if (! $node instanceof DOMElement || strtolower($node->tagName) !== 'p') {
                        continue;
                    }

                    $link = $node->getElementsByTagName('a')->item(0);

                    if ($link) {
                        $url = $link->getAttribute('href');
                        continue;
                    }

                    if (blank($description)) {
                        $description = $this->innerHtml($node);
                    }
                }

                if ($title) {
                    $notes[] = compact('title', 'description', 'url');
                }
            }

            return $notes;
        });
    }

    protected function footerContactData(string $html): array
    {
        $contacts = $this->loadHtml($html, function (DOMXPath $xpath): array {
            $items = [];

            foreach ($xpath->query('//li') as $item) {
                $text = trim(preg_replace('/\s+/', ' ', $item->textContent));

                if (preg_match('/^(.*?)\s*\((.*?)\)$/', $text, $matches)) {
                    $items[] = [
                        'label' => trim($matches[2]),
                        'phone' => trim($matches[1]),
                    ];
                    continue;
                }

                if ($text) {
                    $items[] = [
                        'label' => 'Kontak',
                        'phone' => $text,
                    ];
                }
            }

            return $items;
        });

        $secretariat = $this->loadHtml($html, function (DOMXPath $xpath): string {
            $paragraph = $xpath->query('//p')->item(0);

            return $paragraph ? trim(preg_replace('/\s+/', ' ', $paragraph->textContent)) : '';
        });

        return [
            'logos' => [
                ['name' => 'IKA FMIPA USU', 'image_path' => 'seeded-assets/ika-fmipa.png'],
                ['name' => 'IOSTPI', 'image_path' => 'seeded-assets/iostpi.jpg'],
            ],
            'contacts' => $contacts ?: [
                ['label' => 'Tingkat SMA', 'phone' => '0813 6021 1850'],
                ['label' => 'Tingkat SMP', 'phone' => '0813 6021 1845'],
                ['label' => 'Tingkat SD', 'phone' => '0853 8124 7216'],
            ],
            'secretariat_title' => 'Sekretariat Pendaftaran',
            'secretariat_address' => $secretariat ?: 'The Prime Residence Blok A No. 22-23 Jln. Setia Budi Ujung Simpang Selayang, Medan. (Dekat SPBU & Pos Polisi Simpang Selayang)',
        ];
    }

    protected function footerPartnersData(string $html): array
    {
        return $this->loadHtml($html, function (DOMXPath $xpath): array {
            $heading = $xpath->query('//h2|//h3')->item(0);
            $logos = [];

            foreach ($xpath->query('//img') as $image) {
                $logos[] = [
                    'name' => $image->getAttribute('alt') ?: 'Partner',
                    'image_path' => ltrim($image->getAttribute('src'), '/'),
                ];
            }

            return [
                'heading' => $heading ? trim($heading->textContent) : 'Dewan Juri LKTI & Seminar Guru Bekerjasama Dengan:',
                'logos' => $logos ?: [
                    ['name' => 'Universitas Sumatera Utara', 'image_path' => 'seeded-assets/usu.png'],
                    ['name' => 'Universitas Negeri Medan', 'image_path' => 'seeded-assets/unimed.png'],
                    ['name' => 'Institut Teknologi Bandung', 'image_path' => 'seeded-assets/itb-logo.png'],
                    ['name' => 'Pemerintah Kota Medan', 'image_path' => 'seeded-assets/pemko-medan-logo.png'],
                ],
            ];
        });
    }

    protected function loadHtml(string $html, callable $callback): mixed
    {
        if (blank($html)) {
            return [];
        }

        $document = new DOMDocument();
        $previous = libxml_use_internal_errors(true);
        $document->loadHTML('<?xml encoding="utf-8" ?>' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_clear_errors();
        libxml_use_internal_errors($previous);

        return $callback(new DOMXPath($document));
    }

    protected function innerHtml(DOMNode $node): string
    {
        $html = '';

        foreach ($node->childNodes as $child) {
            $html .= $node->ownerDocument->saveHTML($child);
        }

        return trim($html);
    }
};

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SiteContent extends Model
{
    protected $fillable = [
        'key',
        'content_type',
        'navigation_group',
        'navigation_label',
        'title',
        'image_path',
        'content',
        'data',
        'sort_order',
        'is_active',
    ];

    protected $appends = [
        'image_url',
        'rendered_content',
        'structured_data',
    ];

    protected function casts(): array
    {
        return [
            'data' => 'array',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function getImageUrlAttribute(): ?string
    {
        if (blank($this->image_path)) {
            return null;
        }

        return static::resolveAssetUrl($this->image_path);
    }

    public function getRenderedContentAttribute(): string
    {
        return static::rewriteAssetUrls($this->structuredContentHtml() ?: $this->content);
    }

    public function getStructuredDataAttribute(): array
    {
        return static::resolveDataAssetUrls($this->structuredData());
    }

    public function structuredData(): array
    {
        return is_array($this->data) ? $this->data : [];
    }

    public function structuredContentHtml(): string
    {
        $data = $this->structuredData();

        if ($data === []) {
            return '';
        }

        return match ($this->key) {
            'home.hero' => static::heroContentHtml($data),
            'home.partner-notes' => static::partnerNotesContentHtml($data),
            'footer.contact' => static::footerContactContentHtml($data),
            'footer.partners' => static::footerPartnersContentHtml($data),
            default => '',
        };
    }

    public static function rewriteAssetUrls(?string $html): string
    {
        if (blank($html)) {
            return '';
        }

        return preg_replace_callback(
            '/\s(src|href)=([\'"])(.*?)\2/i',
            function (array $matches): string {
                $url = html_entity_decode($matches[3]);
                $rewrittenUrl = static::resolveAssetUrl($url);

                if ($rewrittenUrl === $url) {
                    return $matches[0];
                }

                return sprintf(' %s=%s%s%s', $matches[1], $matches[2], e($rewrittenUrl, false), $matches[2]);
            },
            $html,
        ) ?? $html;
    }

    public static function resolveAssetUrl(mixed $pathOrUrl): ?string
    {
        if (! is_string($pathOrUrl)) {
            return null;
        }

        if (blank($pathOrUrl)) {
            return null;
        }

        $pathOrUrl = trim($pathOrUrl);
        $assetPath = static::resolveAssetPath($pathOrUrl);

        if ($assetPath === null) {
            return $pathOrUrl;
        }

        return asset($assetPath);
    }

    public static function resolveDataAssetUrls(mixed $value): mixed
    {
        if (! is_array($value)) {
            return $value;
        }

        $resolved = [];

        foreach ($value as $key => $item) {
            if (is_array($item)) {
                $resolved[$key] = static::resolveDataAssetUrls($item);
                continue;
            }

            $resolved[$key] = $item;

            if (is_string($key) && str_ends_with($key, 'image_path')) {
                $resolved[str_replace('image_path', 'image_url', $key)] = static::resolveAssetUrl($item);
            }
        }

        return $resolved;
    }

    public static function heroContentHtml(array $data): string
    {
        $slides = array_values(array_filter($data['slides'] ?? [], fn (mixed $slide): bool => is_array($slide) && filled($slide['image_path'] ?? null)));

        if ($slides === []) {
            return '';
        }

        $items = collect($slides)
            ->map(function (array $slide): string {
                $caption = e($slide['caption'] ?? 'Slide');
                $imagePath = e(static::resolveAssetUrl($slide['image_path'] ?? '') ?? '', false);

                return "<li>{$caption}<br><img src=\"{$imagePath}\" alt=\"{$caption}\"></li>";
            })
            ->implode('');

        return '<h1>Science Competition Expo</h1><p>Daftar slide hero yang sedang digunakan pada halaman beranda.</p><ol>' . $items . '</ol>';
    }

    public static function partnerNotesContentHtml(array $data): string
    {
        $notes = array_values(array_filter($data['notes'] ?? [], fn (mixed $note): bool => is_array($note) && filled($note['title'] ?? null)));

        return collect($notes)
            ->map(function (array $note): string {
                $title = e($note['title'] ?? '');
                $description = static::rewriteAssetUrls($note['description'] ?? '');
                $url = trim($note['url'] ?? '');
                $link = $url ? '<p><a href="' . e($url, false) . '">View More</a></p>' : '';

                return "<h2>{$title}</h2>{$description}{$link}";
            })
            ->implode('');
    }

    public static function footerContactContentHtml(array $data): string
    {
        $contacts = array_values(array_filter($data['contacts'] ?? [], fn (mixed $contact): bool => is_array($contact) && filled($contact['phone'] ?? null)));
        $secretariatTitle = e($data['secretariat_title'] ?? 'Sekretariat Pendaftaran');
        $secretariatAddress = nl2br(e($data['secretariat_address'] ?? ''), false);

        $items = collect($contacts)
            ->map(function (array $contact): string {
                $label = filled($contact['label'] ?? null) ? ' (' . e($contact['label']) . ')' : '';

                return '<li>' . e($contact['phone'] ?? '') . $label . '</li>';
            })
            ->implode('');

        return '<h2>Science Competition Expo</h2><h3>CP Panitia</h3><ul>' . $items . '</ul><h3>' . $secretariatTitle . '</h3><p>' . $secretariatAddress . '</p>';
    }

    public static function footerPartnersContentHtml(array $data): string
    {
        $heading = e($data['heading'] ?? 'Dewan Juri LKTI & Seminar Guru Bekerjasama Dengan:');
        $logos = array_values(array_filter($data['logos'] ?? [], fn (mixed $logo): bool => is_array($logo) && filled($logo['image_path'] ?? null)));

        $names = collect($logos)
            ->map(fn (array $logo): string => '<li>' . e($logo['name'] ?? 'Partner') . '</li>')
            ->implode('');

        $images = collect($logos)
            ->map(function (array $logo): string {
                $name = e($logo['name'] ?? 'Partner');
                $imagePath = e(static::resolveAssetUrl($logo['image_path'] ?? '') ?? '', false);

                return "<img src=\"{$imagePath}\" alt=\"{$name}\">";
            })
            ->implode(' ');

        return '<h3>' . $heading . '</h3><ul>' . $names . '</ul><p>' . $images . '</p>';
    }

    protected static function resolveAssetPath(string $pathOrUrl): ?string
    {
        if (Str::startsWith($pathOrUrl, ['data:', 'blob:', 'mailto:', 'tel:', '#'])) {
            return null;
        }

        $path = $pathOrUrl;

        if (Str::startsWith($pathOrUrl, ['http://', 'https://', '//'])) {
            $normalizedUrl = Str::startsWith($pathOrUrl, '//') ? 'http:' . $pathOrUrl : $pathOrUrl;
            $parts = parse_url($normalizedUrl);

            if (! static::isLocalAssetHost($parts['host'] ?? null)) {
                return null;
            }

            $path = $parts['path'] ?? '';
        }

        $path = ltrim($path, '/');

        if (Str::startsWith($path, ['storage/', 'seeded-assets/'])) {
            return $path;
        }

        if (Str::startsWith($path, 'site-content/')) {
            return 'storage/' . $path;
        }

        return null;
    }

    protected static function isLocalAssetHost(?string $host): bool
    {
        if (blank($host)) {
            return true;
        }

        $host = Str::lower($host);
        $configuredHost = parse_url((string) config('app.url'), PHP_URL_HOST);
        $requestHost = request()?->getHost();

        $localHosts = array_filter([
            'localhost',
            '127.0.0.1',
            '::1',
            $configuredHost ? Str::lower($configuredHost) : null,
            $requestHost ? Str::lower($requestHost) : null,
        ]);

        return in_array($host, $localHosts, true);
    }
}

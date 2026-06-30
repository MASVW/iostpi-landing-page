<?php

namespace App\Filament\Pages;

use App\Filament\Resources\Announcements\AnnouncementResource;
use App\Models\Announcement;
use App\Models\SiteContent;
use Filament\Pages\Dashboard as BaseDashboard;
use Illuminate\Contracts\Support\Htmlable;

class Dashboard extends BaseDashboard
{
    protected static bool $isDiscovered = false;

    protected string $view = 'filament.pages.dashboard';

    protected static ?string $navigationLabel = 'Dashboard';

    protected static ?int $navigationSort = -10;

    public int $activeHeroSlide = 0;

    public function getTitle(): string | Htmlable
    {
        return 'Dashboard Admin SCE';
    }

    public function getHeroSlides(): array
    {
        $content = SiteContent::query()
            ->where('key', 'home.hero')
            ->first();

        $slides = data_get($content?->structured_data, 'slides', []);

        return collect(is_array($slides) ? $slides : [])
            ->filter(fn (mixed $slide): bool => is_array($slide) && filled($slide['image_url'] ?? null))
            ->values()
            ->map(fn (array $slide): array => [
                'caption' => $slide['caption'] ?? 'Slide Hero',
                'image_url' => $slide['image_url'],
            ])
            ->all();
    }

    public function getPartnerNotes(): array
    {
        $content = SiteContent::query()
            ->where('key', 'home.partner-notes')
            ->first();

        $notes = data_get($content?->structured_data, 'notes', []);

        return collect(is_array($notes) ? $notes : [])
            ->filter(fn (mixed $note): bool => is_array($note) && filled($note['title'] ?? null))
            ->take(4)
            ->values()
            ->map(fn (array $note): array => [
                'title' => $note['title'] ?? 'Partner Note',
                'description' => SiteContent::rewriteAssetUrls($note['description'] ?? ''),
                'url' => $note['url'] ?? null,
            ])
            ->all();
    }

    public function getRecentAnnouncements(): array
    {
        return Announcement::query()
            ->with('user')
            ->latest('published_at')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn (Announcement $announcement): array => [
                'title' => $announcement->title,
                'excerpt' => $announcement->excerpt,
                'image_url' => $announcement->image_url,
                'published_at' => $announcement->published_at?->translatedFormat('d M Y, H:i'),
                'publisher_name' => $announcement->publisher_name,
                'viewers' => $announcement->viewers,
                'is_published' => $announcement->is_published,
            ])
            ->all();
    }

    public function getDashboardStats(): array
    {
        return [
            [
                'label' => 'Slide Hero',
                'value' => count($this->getHeroSlides()),
                'tone' => 'blue',
            ],
            [
                'label' => 'Partner Notes',
                'value' => count($this->getPartnerNotes()),
                'tone' => 'cyan',
            ],
            [
                'label' => 'Pengumuman Aktif',
                'value' => Announcement::query()->published()->count(),
                'tone' => 'amber',
            ],
        ];
    }

    public function getHeroCarouselUrl(): string
    {
        return HeroCarousel::getUrl();
    }

    public function getPartnerNotesUrl(): string
    {
        return PartnerNotes::getUrl();
    }

    public function getAnnouncementsUrl(): string
    {
        return AnnouncementResource::getUrl('index');
    }

    public function nextHeroSlide(): void
    {
        $total = count($this->getHeroSlides());

        if ($total < 1) {
            $this->activeHeroSlide = 0;

            return;
        }

        $this->activeHeroSlide = ($this->activeHeroSlide + 1) % $total;
    }

    public function previousHeroSlide(): void
    {
        $total = count($this->getHeroSlides());

        if ($total < 1) {
            $this->activeHeroSlide = 0;

            return;
        }

        $this->activeHeroSlide = ($this->activeHeroSlide - 1 + $total) % $total;
    }

    public function setHeroSlide(int $index): void
    {
        $total = count($this->getHeroSlides());

        $this->activeHeroSlide = $total > 0
            ? max(0, min($index, $total - 1))
            : 0;
    }
}

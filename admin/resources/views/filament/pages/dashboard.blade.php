<x-filament-panels::page>
    @php
        $slides = $this->getHeroSlides();
        $activeSlide = $slides[$this->activeHeroSlide] ?? $slides[0] ?? null;
        $announcements = $this->getRecentAnnouncements();
        $partnerNotes = $this->getPartnerNotes();
        $stats = $this->getDashboardStats();
    @endphp

    <style>
        .sce-dashboard {
            display: grid;
            gap: 1.25rem;
        }

        .sce-dashboard-hero {
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(14, 165, 233, 0.16);
            border-radius: 1.5rem;
            background:
                radial-gradient(circle at top left, rgba(56, 189, 248, 0.28), transparent 28rem),
                linear-gradient(135deg, rgb(14, 51, 91), rgb(20, 86, 131));
            color: white;
            box-shadow: 0 22px 60px rgba(15, 23, 42, 0.16);
        }

        .dark .sce-dashboard-hero {
            border-color: rgba(56, 189, 248, 0.18);
            box-shadow: 0 22px 60px rgba(0, 0, 0, 0.32);
        }

        .sce-dashboard-hero-inner {
            display: grid;
            grid-template-columns: minmax(18rem, 0.95fr) minmax(20rem, 1.05fr);
            gap: 1.25rem;
            align-items: stretch;
            padding: 1.25rem;
        }

        @media (max-width: 1024px) {
            .sce-dashboard-hero-inner {
                grid-template-columns: 1fr;
            }
        }

        .sce-dashboard-kicker {
            display: inline-flex;
            width: fit-content;
            align-items: center;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.13);
            padding: 0.4rem 0.75rem;
            color: rgb(224, 242, 254);
            font-size: 0.72rem;
            font-weight: 850;
            letter-spacing: 0.12em;
            text-transform: uppercase;
        }

        .sce-dashboard-title {
            margin: 1rem 0 0.75rem;
            max-width: 30rem;
            font-size: clamp(2rem, 3.5vw, 3.15rem);
            font-weight: 900;
            letter-spacing: -0.045em;
            line-height: 1.03;
        }

        .sce-dashboard-lead {
            margin: 0;
            max-width: 31rem;
            color: rgba(239, 246, 255, 0.82);
            font-size: 0.98rem;
            line-height: 1.65;
        }

        .sce-dashboard-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-top: 1.25rem;
        }

        .sce-dashboard-action {
            display: inline-flex;
            align-items: center;
            border-radius: 0.9rem;
            background: white;
            padding: 0.68rem 0.9rem;
            color: rgb(14, 51, 91);
            font-size: 0.82rem;
            font-weight: 850;
            text-decoration: none;
            box-shadow: 0 14px 30px rgba(8, 47, 73, 0.18);
            transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .sce-dashboard-action:hover {
            transform: translateY(-1px);
            box-shadow: 0 18px 40px rgba(8, 47, 73, 0.22);
        }

        .sce-hero-preview {
            min-height: 23rem;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.16);
            border-radius: 1.25rem;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .sce-hero-preview-image {
            position: relative;
            display: grid;
            min-height: 18rem;
            place-items: center;
            overflow: hidden;
            background: rgba(15, 23, 42, 0.24);
        }

        .sce-hero-preview-image img {
            height: 100%;
            min-height: 18rem;
            width: 100%;
            object-fit: cover;
        }

        .sce-hero-preview-empty {
            display: grid;
            min-height: 18rem;
            place-items: center;
            padding: 2rem;
            text-align: center;
            color: rgba(255, 255, 255, 0.8);
            font-weight: 800;
        }

        .sce-hero-preview-caption {
            display: flex;
            gap: 1rem;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
        }

        .sce-hero-preview-caption strong {
            display: block;
            font-size: 1rem;
            line-height: 1.3;
        }

        .sce-hero-controls {
            display: inline-flex;
            gap: 0.45rem;
        }

        .sce-hero-control {
            display: grid;
            height: 2.15rem;
            width: 2.15rem;
            place-items: center;
            border: 1px solid rgba(255, 255, 255, 0.22);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.12);
            color: white;
            font-weight: 900;
            transition: background 180ms ease, transform 180ms ease;
        }

        .sce-hero-control:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-1px);
        }

        .sce-hero-dots {
            display: flex;
            flex-wrap: wrap;
            gap: 0.4rem;
            padding: 0 1rem 1rem;
        }

        .sce-hero-dot {
            height: 0.55rem;
            width: 1.7rem;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.34);
            transition: width 180ms ease, background 180ms ease;
        }

        .sce-hero-dot.is-active {
            width: 2.4rem;
            background: white;
        }

        .sce-dashboard-stat-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
        }

        @media (max-width: 900px) {
            .sce-dashboard-stat-grid {
                grid-template-columns: 1fr;
            }
        }

        .sce-dashboard-stat {
            overflow: hidden;
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 1.2rem;
            background: white;
            padding: 1.1rem;
            box-shadow: 0 16px 42px rgba(15, 23, 42, 0.07);
        }

        .dark .sce-dashboard-stat,
        .dark .sce-dashboard-panel {
            border-color: rgba(51, 65, 85, 0.85);
            background: rgba(15, 23, 42, 0.72);
            box-shadow: 0 16px 42px rgba(0, 0, 0, 0.22);
        }

        .sce-dashboard-stat span {
            color: rgb(100, 116, 139);
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .dark .sce-dashboard-stat span,
        .dark .sce-dashboard-panel-subtitle,
        .dark .sce-announcement-meta,
        .dark .sce-note-text {
            color: rgb(148, 163, 184);
        }

        .sce-dashboard-stat strong {
            display: block;
            margin-top: 0.35rem;
            color: rgb(15, 23, 42);
            font-size: 2.1rem;
            font-weight: 950;
            line-height: 1;
        }

        .dark .sce-dashboard-stat strong,
        .dark .sce-dashboard-panel-title,
        .dark .sce-announcement-title,
        .dark .sce-note-title {
            color: rgb(248, 250, 252);
        }

        .sce-dashboard-content-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.1fr) minmax(18rem, 0.9fr);
            gap: 1rem;
        }

        @media (max-width: 1100px) {
            .sce-dashboard-content-grid {
                grid-template-columns: 1fr;
            }
        }

        .sce-dashboard-panel {
            overflow: hidden;
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 1.35rem;
            background: white;
            box-shadow: 0 16px 42px rgba(15, 23, 42, 0.07);
        }

        .sce-dashboard-panel-header {
            display: flex;
            gap: 1rem;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(148, 163, 184, 0.16);
            padding: 1.15rem 1.25rem;
        }

        .dark .sce-dashboard-panel-header {
            border-color: rgba(51, 65, 85, 0.8);
        }

        .sce-dashboard-panel-title {
            margin: 0;
            color: rgb(15, 23, 42);
            font-size: 1.2rem;
            font-weight: 950;
            letter-spacing: -0.02em;
        }

        .sce-dashboard-panel-subtitle {
            margin: 0.22rem 0 0;
            color: rgb(100, 116, 139);
            font-size: 0.86rem;
            font-weight: 650;
        }

        .sce-dashboard-panel-link {
            white-space: nowrap;
            border-radius: 999px;
            background: rgba(251, 191, 36, 0.14);
            padding: 0.55rem 0.8rem;
            color: rgb(180, 83, 9);
            font-size: 0.78rem;
            font-weight: 850;
            text-decoration: none;
        }

        .sce-announcement-list,
        .sce-note-list {
            display: grid;
            gap: 0.8rem;
            padding: 1rem;
        }

        .sce-announcement-card {
            display: grid;
            grid-template-columns: 5.7rem minmax(0, 1fr);
            gap: 0.9rem;
            align-items: center;
            border: 1px solid rgba(14, 165, 233, 0.16);
            border-radius: 1rem;
            background: linear-gradient(135deg, rgba(240, 249, 255, 0.9), rgba(255, 255, 255, 0.94));
            padding: 0.65rem;
        }

        .dark .sce-announcement-card,
        .dark .sce-note-card {
            border-color: rgba(14, 165, 233, 0.16);
            background: rgba(30, 41, 59, 0.58);
        }

        .sce-announcement-image {
            display: grid;
            aspect-ratio: 1.25;
            place-items: center;
            overflow: hidden;
            border-radius: 0.75rem;
            background: rgb(224, 242, 254);
            color: rgb(2, 132, 199);
            font-size: 0.7rem;
            font-weight: 900;
            text-align: center;
        }

        .sce-announcement-image img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }

        .sce-announcement-title {
            margin: 0;
            color: rgb(15, 23, 42);
            font-size: 0.98rem;
            font-weight: 900;
            line-height: 1.25;
        }

        .sce-announcement-meta {
            margin: 0.35rem 0 0;
            color: rgb(100, 116, 139);
            font-size: 0.78rem;
            font-weight: 700;
            line-height: 1.45;
        }

        .sce-status-pill {
            display: inline-flex;
            width: fit-content;
            margin-top: 0.45rem;
            border-radius: 999px;
            padding: 0.3rem 0.55rem;
            font-size: 0.72rem;
            font-weight: 850;
        }

        .sce-status-pill.is-live {
            background: rgba(16, 185, 129, 0.12);
            color: rgb(4, 120, 87);
        }

        .sce-status-pill.is-draft {
            background: rgba(239, 68, 68, 0.12);
            color: rgb(185, 28, 28);
        }

        .sce-note-card {
            border: 1px solid rgba(14, 165, 233, 0.16);
            border-radius: 1rem;
            background: linear-gradient(135deg, rgba(232, 247, 255, 0.95), rgba(255, 255, 255, 0.95));
            padding: 1rem;
        }

        .sce-note-title {
            margin: 0;
            color: rgb(15, 23, 42);
            font-size: 1rem;
            font-weight: 950;
            line-height: 1.25;
        }

        .sce-note-text {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            margin: 0.5rem 0 0;
            color: rgb(71, 85, 105);
            font-size: 0.86rem;
            line-height: 1.6;
        }

        .sce-note-text p {
            margin: 0;
        }

        .sce-dashboard-empty {
            border: 1px dashed rgba(14, 165, 233, 0.35);
            border-radius: 1rem;
            padding: 1.25rem;
            text-align: center;
            color: rgb(100, 116, 139);
            font-weight: 800;
        }
    </style>

    <div class="sce-dashboard">
        <section class="sce-dashboard-hero">
            <div class="sce-dashboard-hero-inner">
                <div>
                    <span class="sce-dashboard-kicker">Hi Admin SCE</span>
                    <h2 class="sce-dashboard-title">Pantau konten utama website SCE.</h2>
                    <p class="sce-dashboard-lead">
                        Lihat ringkasan hero carousel, pengumuman, dan partner notes terbaru sebelum dipublikasikan
                        ke peserta.
                    </p>

                    <div class="sce-dashboard-actions">
                        <a class="sce-dashboard-action" href="{{ $this->getHeroCarouselUrl() }}">Kelola Hero</a>
                        <a class="sce-dashboard-action" href="{{ $this->getAnnouncementsUrl() }}">Kelola Pengumuman</a>
                        <a class="sce-dashboard-action" href="{{ $this->getPartnerNotesUrl() }}">Kelola Partner Notes</a>
                    </div>
                </div>

                <article class="sce-hero-preview" aria-label="Preview Hero Carousel">
                    <div class="sce-hero-preview-image">
                        @if ($activeSlide)
                            <img src="{{ $activeSlide['image_url'] }}" alt="{{ $activeSlide['caption'] }}">
                        @else
                            <div class="sce-hero-preview-empty">Belum ada slide hero.</div>
                        @endif
                    </div>

                    <div class="sce-hero-preview-caption">
                        <strong>{{ $activeSlide['caption'] ?? 'Hero Carousel belum tersedia' }}</strong>
                        @if (count($slides) > 1)
                            <div class="sce-hero-controls">
                                <button class="sce-hero-control" type="button" wire:click="previousHeroSlide" aria-label="Slide sebelumnya">‹</button>
                                <button class="sce-hero-control" type="button" wire:click="nextHeroSlide" aria-label="Slide berikutnya">›</button>
                            </div>
                        @endif
                    </div>

                    @if (count($slides) > 1)
                        <div class="sce-hero-dots">
                            @foreach ($slides as $index => $slide)
                                <button
                                    @class([
                                        'sce-hero-dot',
                                        'is-active' => $index === $this->activeHeroSlide,
                                    ])
                                    type="button"
                                    wire:click="setHeroSlide({{ $index }})"
                                    aria-label="Lihat slide {{ $index + 1 }}"
                                ></button>
                            @endforeach
                        </div>
                    @endif
                </article>
            </div>
        </section>

        <section class="sce-dashboard-stat-grid">
            @foreach ($stats as $stat)
                <article class="sce-dashboard-stat">
                    <span>{{ $stat['label'] }}</span>
                    <strong>{{ $stat['value'] }}</strong>
                </article>
            @endforeach
        </section>

        <section class="sce-dashboard-content-grid">
            <article class="sce-dashboard-panel">
                <div class="sce-dashboard-panel-header">
                    <div>
                        <h3 class="sce-dashboard-panel-title">Pengumuman Terbaru</h3>
                        <p class="sce-dashboard-panel-subtitle">Ringkasan pengumuman yang tersimpan di admin.</p>
                    </div>
                    <a class="sce-dashboard-panel-link" href="{{ $this->getAnnouncementsUrl() }}">Lihat Semua</a>
                </div>

                <div class="sce-announcement-list">
                    @forelse ($announcements as $announcement)
                        <article class="sce-announcement-card">
                            <div class="sce-announcement-image">
                                @if ($announcement['image_url'])
                                    <img src="{{ $announcement['image_url'] }}" alt="{{ $announcement['title'] }}">
                                @else
                                    Tanpa Gambar
                                @endif
                            </div>
                            <div>
                                <h4 class="sce-announcement-title">{{ $announcement['title'] }}</h4>
                                <p class="sce-announcement-meta">
                                    {{ $announcement['published_at'] ?? 'Belum dijadwalkan' }}
                                    · {{ $announcement['publisher_name'] }}
                                    · {{ $announcement['viewers'] }} viewers
                                </p>
                                <span @class([
                                    'sce-status-pill',
                                    'is-live' => $announcement['is_published'],
                                    'is-draft' => ! $announcement['is_published'],
                                ])>
                                    {{ $announcement['is_published'] ? 'Aktif' : 'Nonaktif' }}
                                </span>
                            </div>
                        </article>
                    @empty
                        <div class="sce-dashboard-empty">Belum ada pengumuman.</div>
                    @endforelse
                </div>
            </article>

            <article class="sce-dashboard-panel">
                <div class="sce-dashboard-panel-header">
                    <div>
                        <h3 class="sce-dashboard-panel-title">Partner Notes</h3>
                        <p class="sce-dashboard-panel-subtitle">Catatan partner pada halaman utama.</p>
                    </div>
                    <a class="sce-dashboard-panel-link" href="{{ $this->getPartnerNotesUrl() }}">Edit Notes</a>
                </div>

                <div class="sce-note-list">
                    @forelse ($partnerNotes as $note)
                        <article class="sce-note-card">
                            <h4 class="sce-note-title">{{ $note['title'] }}</h4>
                            @if (filled($note['description']))
                                <div class="sce-note-text fi-prose frontend-rich-prose">
                                    {!! $note['description'] !!}
                                </div>
                            @else
                                <p class="sce-note-text">Belum ada deskripsi.</p>
                            @endif
                        </article>
                    @empty
                        <div class="sce-dashboard-empty">Belum ada partner notes.</div>
                    @endforelse
                </div>
            </article>
        </section>
    </div>
</x-filament-panels::page>

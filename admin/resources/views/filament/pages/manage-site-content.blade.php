<x-filament-panels::page>
    @php
        $record = $this->getRecord();
        $contentTypeLabels = [
            'home' => 'Beranda',
            'page' => 'Halaman',
            'footer' => 'Footer',
        ];
    @endphp

    <style>
        .site-content-hero-card {
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(148, 163, 184, 0.24);
            border-radius: 1.35rem;
            background:
                radial-gradient(circle at top left, rgba(245, 158, 11, 0.18), transparent 34rem),
                linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.92));
            box-shadow: 0 18px 46px rgba(15, 23, 42, 0.08);
        }

        .dark .site-content-hero-card {
            border-color: rgba(51, 65, 85, 0.9);
            background:
                radial-gradient(circle at top left, rgba(245, 158, 11, 0.16), transparent 34rem),
                linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(17, 24, 39, 0.96));
        }

        .site-content-hero-card::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
                linear-gradient(90deg, rgba(245, 158, 11, 0.12), transparent 34%),
                radial-gradient(circle at 95% 0%, rgba(14, 165, 233, 0.16), transparent 24rem);
        }

        .site-content-hero-inner {
            position: relative;
            display: grid;
            gap: 1.25rem;
            padding: 1.5rem;
        }

        @media (min-width: 1024px) {
            .site-content-hero-inner {
                grid-template-columns: minmax(0, 1.4fr) minmax(18rem, 0.6fr);
                align-items: stretch;
                padding: 1.75rem;
            }
        }

        .site-content-kicker {
            display: inline-flex;
            width: fit-content;
            align-items: center;
            border-radius: 999px;
            background: rgba(245, 158, 11, 0.12);
            padding: 0.35rem 0.75rem;
            color: rgb(180, 83, 9);
            font-size: 0.72rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .dark .site-content-kicker {
            background: rgba(245, 158, 11, 0.16);
            color: rgb(252, 211, 77);
        }

        .site-content-title {
            margin-top: 0.85rem;
            color: rgb(15, 23, 42);
            font-size: clamp(1.65rem, 3vw, 2.55rem);
            font-weight: 850;
            letter-spacing: -0.035em;
            line-height: 1.08;
        }

        .dark .site-content-title {
            color: rgb(248, 250, 252);
        }

        .site-content-subtitle {
            margin-top: 0.8rem;
            max-width: 44rem;
            color: rgb(100, 116, 139);
            font-size: 0.95rem;
            line-height: 1.75;
        }

        .dark .site-content-subtitle {
            color: rgb(148, 163, 184);
        }

        .site-content-status-panel {
            border: 1px solid rgba(148, 163, 184, 0.22);
            border-radius: 1rem;
            background: rgba(255, 255, 255, 0.74);
            padding: 1rem;
            backdrop-filter: blur(12px);
        }

        .dark .site-content-status-panel {
            border-color: rgba(51, 65, 85, 0.92);
            background: rgba(15, 23, 42, 0.64);
        }

        .site-content-status-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.45rem;
            border-radius: 999px;
            padding: 0.42rem 0.8rem;
            font-size: 0.78rem;
            font-weight: 800;
        }

        .site-content-status-badge::before {
            content: "";
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 999px;
            background: currentColor;
            box-shadow: 0 0 0 4px color-mix(in srgb, currentColor 15%, transparent);
        }

        .site-content-status-badge.is-active {
            background: rgba(16, 185, 129, 0.12);
            color: rgb(4, 120, 87);
        }

        .site-content-status-badge.is-inactive {
            background: rgba(239, 68, 68, 0.12);
            color: rgb(185, 28, 28);
        }

        .dark .site-content-status-badge.is-active {
            background: rgba(16, 185, 129, 0.16);
            color: rgb(110, 231, 183);
        }

        .dark .site-content-status-badge.is-inactive {
            background: rgba(239, 68, 68, 0.18);
            color: rgb(252, 165, 165);
        }

        .site-content-meta-list {
            margin-top: 1rem;
            display: grid;
            gap: 0.65rem;
        }

        .site-content-meta-row {
            display: grid;
            grid-template-columns: 5.75rem 1fr;
            gap: 0.75rem;
            align-items: center;
            border-radius: 0.75rem;
            background: rgba(248, 250, 252, 0.82);
            padding: 0.65rem 0.75rem;
        }

        .dark .site-content-meta-row {
            background: rgba(30, 41, 59, 0.68);
        }

        .site-content-meta-row dt {
            color: rgb(100, 116, 139);
            font-size: 0.72rem;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }

        .site-content-meta-row dd {
            margin: 0;
            color: rgb(15, 23, 42);
            font-size: 0.86rem;
            font-weight: 700;
        }

        .dark .site-content-meta-row dd {
            color: rgb(226, 232, 240);
        }

        .site-content-preview-card {
            margin-top: 2rem;
            overflow: hidden;
            border: 1px solid rgba(148, 163, 184, 0.24);
            border-radius: 1.35rem;
            background: rgb(255, 255, 255);
            box-shadow: 0 16px 40px rgba(15, 23, 42, 0.07);
        }

        .dark .site-content-preview-card {
            border-color: rgba(51, 65, 85, 0.9);
            background: rgb(17, 24, 39);
        }

        .site-content-preview-header {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(148, 163, 184, 0.2);
            padding: 1.25rem 1.5rem;
        }

        .dark .site-content-preview-header {
            border-color: rgba(51, 65, 85, 0.9);
        }

        .site-content-preview-heading {
            color: rgb(15, 23, 42);
            font-size: 1.15rem;
            font-weight: 800;
            letter-spacing: -0.02em;
        }

        .dark .site-content-preview-heading {
            color: rgb(248, 250, 252);
        }

        .site-content-preview-image {
            display: flex;
            align-items: center;
            justify-content: center;
            background:
                linear-gradient(135deg, rgba(15, 23, 42, 0.035), rgba(14, 165, 233, 0.08)),
                rgb(248, 250, 252);
            padding: 1.25rem;
        }

        .dark .site-content-preview-image {
            background:
                linear-gradient(135deg, rgba(148, 163, 184, 0.08), rgba(14, 165, 233, 0.08)),
                rgb(2, 6, 23);
        }

        .site-content-preview-image img {
            max-height: 22rem;
            width: auto;
            max-width: 100%;
            border-radius: 1rem;
            object-fit: contain;
            box-shadow: 0 16px 45px rgba(15, 23, 42, 0.16);
        }

        .site-content-preview img {
            display: block;
            max-height: 20rem;
            width: auto;
            max-width: 100%;
            margin: 1rem auto;
            border-radius: 0.75rem;
            object-fit: contain;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
        }

        .site-content-preview figure {
            margin-inline: 0;
        }

        .site-content-preview table {
            width: 100%;
        }

        .site-content-preview-body {
            padding: 1.5rem;
        }

        .site-content-preview-surface {
            border: 1px solid rgba(226, 232, 240, 0.92);
            border-radius: 1rem;
            background: rgb(248, 250, 252);
            padding: clamp(1rem, 2.5vw, 1.5rem);
        }

        .dark .site-content-preview-surface {
            border-color: rgba(51, 65, 85, 0.9);
            background: rgba(15, 23, 42, 0.62);
        }
    </style>

    <div>
        <section class="site-content-hero-card">
            <div class="site-content-hero-inner">
                <div>
                    <span class="site-content-kicker">Modul Konten</span>
                    <h2 class="site-content-title">{{ $record->title }}</h2>
                    <p class="site-content-subtitle">
                        Kelola konten yang akan tampil di frontend. Bagian preview di bawah membantu memastikan gambar dan deskripsi sudah nyaman dibaca sebelum dipublikasikan.
                    </p>
                </div>

                <aside class="site-content-status-panel">
                    <span @class([
                        'site-content-status-badge',
                        'is-active' => $record->is_active,
                        'is-inactive' => ! $record->is_active,
                    ])>
                        {{ $record->is_active ? 'Aktif di Frontend' : 'Nonaktif' }}
                    </span>

                    <dl class="site-content-meta-list">
                        <div class="site-content-meta-row">
                            <dt>Group</dt>
                            <dd>{{ $record->navigation_group ?: '-' }}</dd>
                        </div>
                        <div class="site-content-meta-row">
                            <dt>Menu</dt>
                            <dd>{{ $record->navigation_label }}</dd>
                        </div>
                        <div class="site-content-meta-row">
                            <dt>Tipe</dt>
                            <dd>{{ $contentTypeLabels[$record->content_type] ?? $record->content_type }}</dd>
                        </div>
                        <div class="site-content-meta-row">
                            <dt>Update</dt>
                            <dd>{{ $record->updated_at?->format('d M Y, H:i') ?? '-' }}</dd>
                        </div>
                    </dl>
                </aside>
            </div>
        </section>

        <section class="site-content-preview-card">
            <div class="site-content-preview-header">
                <div>
                    <span class="site-content-kicker">Preview Frontend</span>
                    <h3 class="site-content-preview-heading">
                        {{ $record->title }}
                    </h3>
                </div>

                <span @class([
                    'site-content-status-badge',
                    'is-active' => $record->is_active,
                    'is-inactive' => ! $record->is_active,
                ])>
                    {{ $record->is_active ? 'Aktif' : 'Nonaktif' }}
                </span>
            </div>

            @if ($record->image_url)
                <div class="site-content-preview-image">
                    <img src="{{ $record->image_url }}" alt="{{ $record->title }}">
                </div>
            @endif

            <div class="site-content-preview-body">
                <div class="site-content-preview-surface">
                    <div class="site-content-preview fi-prose max-w-none dark:prose-invert">
                        @if (blank($record->rendered_content))
                            <p class="text-sm text-gray-500 dark:text-gray-400">
                                Belum ada isi konten.
                            </p>
                        @else
                            {!! $record->rendered_content !!}
                        @endif
                    </div>
                </div>
            </div>
        </section>
    </div>
</x-filament-panels::page>

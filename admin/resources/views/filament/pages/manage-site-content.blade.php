<x-filament-panels::page>
    @php
        $record = $this->getRecord();
        $structuredData = $record->structured_data ?: [];
        $partnerNotes = $structuredData['notes'] ?? [];
        $footerLogos = collect($structuredData['logos'] ?? [])
            ->filter(fn (mixed $logo): bool => is_array($logo) && filled($logo['image_url'] ?? null))
            ->values();
        $footerContacts = $structuredData['contacts'] ?? [];
        $headerLeftLogos = collect($structuredData['left_logos'] ?? [])
            ->filter(fn (mixed $logo): bool => is_array($logo) && filled($logo['image_url'] ?? null))
            ->values();
        $headerRightLogos = collect($structuredData['right_logos'] ?? [])
            ->filter(fn (mixed $logo): bool => is_array($logo) && filled($logo['image_url'] ?? null))
            ->values();
        $contentTypeLabels = [
            'header' => 'Header',
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

        .site-content-preview-title-group {
            display: grid;
            gap: 0.65rem;
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

        .header-banner-preview {
            display: grid;
            min-height: 10.5rem;
            grid-template-columns: minmax(8rem, 1fr) minmax(18rem, 2.5fr) minmax(8rem, 1fr);
            align-items: center;
            gap: 1.25rem;
            border-radius: 0.9rem;
            padding: 1.25rem 1.5rem;
        }

        .header-banner-logos {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
        }

        .header-banner-logos.is-right {
            justify-content: flex-end;
        }

        .header-banner-logo {
            width: 4.8rem;
            height: 4.8rem;
            object-fit: contain;
        }

        .header-banner-copy {
            text-align: center;
        }

        .header-banner-copy h4,
        .header-banner-copy p {
            margin: 0;
        }

        .header-banner-heading,
        .header-banner-edition {
            font-size: clamp(1.35rem, 2.5vw, 2rem);
            font-weight: 900;
            line-height: 1.12;
            text-transform: uppercase;
        }

        .header-banner-edition {
            letter-spacing: 0.16em;
        }

        .header-banner-region {
            margin-top: 0.65rem !important;
            font-size: 1rem;
            font-weight: 900;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .header-banner-detail {
            margin-top: 0.25rem !important;
            font-size: 0.78rem;
            font-weight: 700;
        }

        @media (max-width: 768px) {
            .header-banner-preview {
                grid-template-columns: 1fr;
            }

            .header-banner-logos,
            .header-banner-logos.is-right {
                justify-content: center;
            }
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

        .partner-notes-preview {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
        }

        @media (max-width: 768px) {
            .partner-notes-preview {
                grid-template-columns: 1fr;
            }
        }

        .partner-note-card {
            display: flex;
            min-height: 12rem;
            flex-direction: column;
            align-items: flex-start;
            border: 1px solid rgba(14, 165, 233, 0.22);
            border-radius: 0.9rem;
            background: linear-gradient(135deg, rgba(232, 247, 255, 0.94), rgba(217, 239, 252, 0.94));
            padding: 1.25rem;
        }

        .dark .partner-note-card {
            border-color: rgba(14, 165, 233, 0.22);
            background: linear-gradient(135deg, rgba(15, 23, 42, 0.86), rgba(30, 41, 59, 0.78));
        }

        .partner-note-title {
            margin: 0 0 0.55rem;
            color: rgb(15, 23, 42);
            font-size: 1.05rem;
            font-weight: 850;
            line-height: 1.25;
        }

        .dark .partner-note-title {
            color: rgb(248, 250, 252);
        }

        .partner-note-description {
            color: rgb(71, 85, 105);
            font-size: 0.92rem;
            line-height: 1.6;
        }

        .dark .partner-note-description {
            color: rgb(203, 213, 225);
        }

        .partner-note-description p {
            margin: 0 0 0.75rem;
        }

        .partner-note-link {
            margin-top: auto;
            display: inline-flex;
            align-items: center;
            border-radius: 0.55rem;
            background: rgb(58, 155, 208);
            padding: 0.55rem 0.85rem;
            color: white;
            font-size: 0.82rem;
            font-weight: 800;
            text-decoration: none;
            box-shadow: 0 8px 18px rgba(58, 155, 208, 0.2);
        }

        .footer-contact-preview {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            gap: 1rem;
            align-items: stretch;
        }

        @media (max-width: 768px) {
            .footer-contact-preview {
                grid-template-columns: 1fr;
            }
        }

        .footer-contact-logos {
            display: flex;
            max-width: 5rem;
            flex-direction: column;
            gap: 0.6rem;
            margin: 0 0.65rem;
        }

        @media (max-width: 768px) {
            .footer-contact-logos {
                max-width: none;
                flex-direction: row;
                flex-wrap: wrap;
                margin: 0;
            }
        }

        .footer-contact-logo {
            display: grid;
            height: 5.15rem;
            width: 5.15rem;
            place-items: center;
            border: 1px solid rgba(148, 163, 184, 0.28);
            border-radius: 0.45rem;
            background: white;
            padding: 0.35rem;
            box-shadow: 0 8px 22px rgba(15, 23, 42, 0.08);
        }

        .footer-contact-logo img {
            height: 100%;
            width: 100%;
            object-fit: contain;
        }

        .footer-contact-card {
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 0.5rem;
            background: rgb(22, 63, 108);
            color: rgb(230, 247, 255);
        }

        .footer-contact-card-title {
            border-bottom: 1px solid rgba(255, 255, 255, 0.16);
            padding: 0.9rem 1rem;
            font-size: 1.1rem;
            font-weight: 850;
        }

        .footer-contact-card dl {
            margin: 0;
        }

        .footer-contact-row {
            display: grid;
            grid-template-columns: 42% 58%;
            border-bottom: 1px solid rgba(255, 255, 255, 0.16);
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
            font-weight: 700;
            line-height: 1.55;
        }

        @media (max-width: 768px) {
            .footer-contact-row {
                grid-template-columns: 1fr;
                gap: 0.3rem;
            }
        }

        .footer-contact-row dt {
            font-weight: 850;
        }

        .footer-contact-row dd {
            margin: 0;
            font-weight: 700;
            line-height: 1.55;
        }

        .footer-contact-row:last-child {
            border-bottom: 0;
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
                <div class="site-content-preview-title-group">
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

            @if ($record->image_url && ! in_array($record->key, ['footer.contact', 'header.banner'], true))
                <div class="site-content-preview-image">
                    <img src="{{ $record->image_url }}" alt="{{ $record->title }}">
                </div>
            @endif

            <div class="site-content-preview-body">
                <div class="site-content-preview-surface">
                    @if ($record->key === 'header.banner')
                        <div
                            class="header-banner-preview"
                            style="background-color: {{ $structuredData['background_color'] ?? '#f5fbff' }}"
                        >
                            <div class="header-banner-logos">
                                @forelse ($headerLeftLogos as $logo)
                                    <img class="header-banner-logo" src="{{ $logo['image_url'] }}" alt="{{ $logo['name'] ?? 'Logo kiri' }}">
                                @empty
                                    <span class="text-sm text-gray-500">Belum ada logo kiri.</span>
                                @endforelse
                            </div>

                            <div class="header-banner-copy">
                                <h4 class="header-banner-heading" style="color: {{ $structuredData['primary_text_color'] ?? '#2b638f' }}">
                                    {{ $structuredData['heading'] ?? 'SCIENCE COMPETITION EXPO' }}
                                </h4>
                                <p class="header-banner-edition" style="color: {{ $structuredData['primary_text_color'] ?? '#2b638f' }}">
                                    {{ $structuredData['edition'] ?? 'SCE - 2026' }}
                                </p>
                                <p class="header-banner-region" style="color: {{ $structuredData['primary_text_color'] ?? '#2b638f' }}">
                                    {{ $structuredData['region_heading'] ?? 'SE SUMATERA BAGIAN UTARA' }}
                                </p>
                                <p class="header-banner-detail" style="color: {{ $structuredData['secondary_text_color'] ?? '#31536b' }}">
                                    {{ $structuredData['region_detail'] ?? '(Aceh, Sumatera Utara, Riau, Kepulauan Riau, dan Sumatera Barat)' }}
                                </p>
                            </div>

                            <div class="header-banner-logos is-right">
                                @forelse ($headerRightLogos as $logo)
                                    <img class="header-banner-logo" src="{{ $logo['image_url'] }}" alt="{{ $logo['name'] ?? 'Logo kanan' }}">
                                @empty
                                    <span class="text-sm text-gray-500">Belum ada logo kanan.</span>
                                @endforelse
                            </div>
                        </div>
                    @elseif ($record->key === 'home.partner-notes')
                        <div class="partner-notes-preview">
                            @forelse ($partnerNotes as $note)
                                <article class="partner-note-card">
                                    <h4 class="partner-note-title">{{ $note['title'] ?? 'Partner Note' }}</h4>
                                    <div class="partner-note-description fi-prose">
                                        {!! \App\Models\SiteContent::rewriteAssetUrls($note['description'] ?? '') !!}
                                    </div>
                                    @if (filled($note['url'] ?? null))
                                        <a class="partner-note-link" href="{{ $note['url'] }}" target="_blank" rel="noreferrer">View More</a>
                                    @endif
                                </article>
                            @empty
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                    Belum ada partner notes.
                                </p>
                            @endforelse
                        </div>
                    @elseif ($record->key === 'footer.contact')
                        <div class="footer-contact-preview">
                            <div class="footer-contact-logos">
                                @forelse ($footerLogos as $logo)
                                    <div class="footer-contact-logo">
                                        <img src="{{ $logo['image_url'] }}" alt="{{ $logo['name'] ?? 'Logo footer' }}">
                                    </div>
                                @empty
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Belum ada logo.</p>
                                @endforelse
                            </div>

                            <div class="footer-contact-card">
                                <div class="footer-contact-card-title">Science Competition Expo</div>
                                <dl>
                                    <div class="footer-contact-row">
                                        <dt>CP Panitia</dt>
                                        <dd>
                                            @forelse ($footerContacts as $contact)
                                                <div>
                                                    {{ $contact['phone'] ?? '-' }}
                                                    @if (filled($contact['label'] ?? null))
                                                        ({{ $contact['label'] }})
                                                    @endif
                                                </div>
                                            @empty
                                                Kontak belum tersedia.
                                            @endforelse
                                        </dd>
                                    </div>
                                    <div class="footer-contact-row">
                                        <dt>{{ $structuredData['secretariat_title'] ?? 'Sekretariat Pendaftaran' }}</dt>
                                        <dd>{{ $structuredData['secretariat_address'] ?? 'Sekretariat belum tersedia.' }}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    @else
                        <div class="site-content-preview fi-prose max-w-none dark:prose-invert">
                            @if (blank($record->rendered_content))
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                    Belum ada isi konten.
                                </p>
                            @else
                                {!! $record->rendered_content !!}
                            @endif
                        </div>
                    @endif
                </div>
            </div>
        </section>
    </div>
</x-filament-panels::page>

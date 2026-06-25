<?php

namespace App\Filament\Pages;

use App\Models\SiteContent;
use BackedEnum;
use Filament\Actions\Action;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Support\Icons\Heroicon;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use LogicException;

abstract class ManageSiteContentPage extends Page
{
    protected static string|BackedEnum|null $navigationIcon = null;

    protected string $view = 'filament.pages.manage-site-content';

    protected static ?string $contentKey = null;

    public ?SiteContent $record = null;

    public function mount(): void
    {
        $this->record = SiteContent::query()
            ->where('key', static::getContentKey())
            ->firstOrFail();
    }

    public static function getContentKey(): string
    {
        if (blank(static::$contentKey)) {
            throw new LogicException('Content key is not configured for [' . static::class . '].');
        }

        return static::$contentKey;
    }

    public function getRecord(): SiteContent
    {
        return $this->record ??= SiteContent::query()
            ->where('key', static::getContentKey())
            ->firstOrFail();
    }

    public function getTitle(): string|Htmlable
    {
        return $this->getRecord()->title;
    }

    public static function getNavigationIcon(): string|BackedEnum|Htmlable|null
    {
        return static::$navigationIcon ?? match (static::getContentKey()) {
            'home.hero' => Heroicon::OutlinedPhoto,
            'home.partner-notes' => Heroicon::OutlinedChatBubbleLeftRight,
            'home.activities' => Heroicon::OutlinedSquares2x2,
            'page.sambutan',
            'page.sambutan-direktur-iostpi',
            'page.sambutan-ketua-fokal-usu',
            'page.sambutan-ketua-panitia' => Heroicon::OutlinedUserGroup,
            'page.kompetisi-guru',
            'page.lkti-guru',
            'page.seminar-guru' => Heroicon::OutlinedPresentationChartBar,
            'page.olimpiade-guru' => Heroicon::OutlinedTrophy,
            'page.olimpiade-siswa',
            'page.olimpiade-siswa-sma-ma-smk',
            'page.olimpiade-siswa-smp-mts',
            'page.olimpiade-siswa-sd-mi' => Heroicon::OutlinedAcademicCap,
            'page.prosedur-pendaftaran' => Heroicon::OutlinedClipboardDocumentList,
            'page.kumpulan-soal' => Heroicon::OutlinedBookOpen,
            'page.lokasi-ujian' => Heroicon::OutlinedMapPin,
            'page.pengumuman' => Heroicon::OutlinedMegaphone,
            'page.hasil-lomba' => Heroicon::OutlinedFlag,
            'footer.contact' => Heroicon::OutlinedEnvelope,
            'footer.partners' => Heroicon::OutlinedGlobeAlt,
            default => Heroicon::OutlinedDocumentText,
        };
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('edit')
                ->label('Edit')
                ->icon(Heroicon::OutlinedPencilSquare)
                ->modalHeading(fn (): string => 'Edit ' . $this->getRecord()->title)
                ->modalSubmitActionLabel('Simpan')
                ->modalWidth('7xl')
                ->schema($this->getContentFormSchema())
                ->fillForm(fn (): array => [
                    'navigation_label' => $this->getRecord()->navigation_label,
                    'title' => $this->getRecord()->title,
                    'image_path' => $this->getRecord()->image_path,
                    'content' => $this->getRecord()->rendered_content,
                    'data' => $this->getStructuredDataForForm(),
                    'is_active' => $this->getRecord()->is_active,
                ])
                ->action(function (array $data): void {
                    $this->getRecord()->update($this->normalizeFormDataForSave($data));
                    $this->record = $this->getRecord()->refresh();

                    Notification::make()
                        ->title('Konten berhasil diperbarui')
                        ->success()
                        ->send();
                }),
        ];
    }

    protected function getContentFormSchema(): array
    {
        return [
            Section::make('Metadata')
                ->columns(2)
                ->schema([
                    TextInput::make('navigation_label')
                        ->label('Label Navigasi')
                        ->required()
                        ->maxLength(255),
                    TextInput::make('title')
                        ->label('Judul Halaman')
                        ->required()
                        ->maxLength(255),
                    Toggle::make('is_active')
                        ->label('Aktif')
                        ->default(true),
                ]),
            ...$this->getContentSpecificFormSchema(),
        ];
    }

    protected function getContentSpecificFormSchema(): array
    {
        return match (static::getContentKey()) {
            'home.hero' => [
                Section::make('Hero Carousel')
                    ->description('Setiap slide memiliki foto dan keterangan sendiri. Foto pertama otomatis dipakai sebagai thumbnail modul.')
                    ->schema([
                        Repeater::make('data.slides')
                            ->label('Slide')
                            ->addActionLabel('Tambah Slide')
                            ->itemLabel(fn (array $state): ?string => filled($state['caption'] ?? null) ? $state['caption'] : null)
                            ->reorderable()
                            ->cloneable()
                            ->collapsible()
                            ->defaultItems(1)
                            ->schema([
                                $this->imageUpload('image_path', 'Foto Slide', 'site-content/hero')
                                    ->required()
                                    ->columnSpanFull(),
                                TextInput::make('caption')
                                    ->label('Keterangan')
                                    ->placeholder('Contoh: Flyer Olimpiade Guru')
                                    ->maxLength(255)
                                    ->columnSpanFull(),
                            ])
                            ->columnSpanFull(),
                    ]),
            ],
            'home.partner-notes' => [
                Section::make('Partner Notes')
                    ->description('Catatan partner dipisah per blok agar heading, isi, dan link tidak tercampur.')
                    ->schema([
                        Repeater::make('data.notes')
                            ->label('Catatan')
                            ->addActionLabel('Tambah Catatan')
                            ->itemLabel(fn (array $state): ?string => filled($state['title'] ?? null) ? $state['title'] : null)
                            ->reorderable()
                            ->cloneable()
                            ->collapsible()
                            ->defaultItems(2)
                            ->schema([
                                TextInput::make('title')
                                    ->label('Judul')
                                    ->required()
                                    ->maxLength(255),
                                $this->contentEditor('description', 'Isi Catatan')
                                    ->required(),
                                TextInput::make('url')
                                    ->label('Link View More')
                                    ->placeholder('https://...')
                                    ->maxLength(255),
                            ])
                            ->columnSpanFull(),
                    ]),
            ],
            'footer.contact' => [
                Section::make('Logo Footer Kontak')
                    ->description('Logo pada footer diupload lewat field khusus, bukan dari text editor.')
                    ->schema([
                        Repeater::make('data.logos')
                            ->label('Logo')
                            ->addActionLabel('Tambah Logo')
                            ->itemLabel(fn (array $state): ?string => filled($state['name'] ?? null) ? $state['name'] : null)
                            ->reorderable()
                            ->cloneable()
                            ->collapsible()
                            ->defaultItems(2)
                            ->schema([
                                TextInput::make('name')
                                    ->label('Nama Logo')
                                    ->required()
                                    ->maxLength(255),
                                $this->imageUpload('image_path', 'File Logo', 'site-content/footer')
                                    ->required(),
                            ])
                            ->columns(2)
                            ->columnSpanFull(),
                    ]),
                Section::make('CP Panitia')
                    ->description('Nomor kontak dipisah agar admin tidak perlu mengedit list HTML manual.')
                    ->schema([
                        Repeater::make('data.contacts')
                            ->label('Kontak')
                            ->addActionLabel('Tambah CP')
                            ->itemLabel(fn (array $state): ?string => filled($state['label'] ?? null) ? $state['label'] : null)
                            ->reorderable()
                            ->cloneable()
                            ->defaultItems(3)
                            ->schema([
                                TextInput::make('label')
                                    ->label('Label')
                                    ->placeholder('Tingkat SMA')
                                    ->maxLength(255),
                                TextInput::make('phone')
                                    ->label('Nomor HP')
                                    ->required()
                                    ->tel()
                                    ->maxLength(255),
                            ])
                            ->columns(2)
                            ->columnSpanFull(),
                    ]),
                Section::make('Sekretariat Pendaftaran')
                    ->description('Field ini sengaja dipisah dari CP Panitia untuk mengurangi human error.')
                    ->schema([
                        TextInput::make('data.secretariat_title')
                            ->label('Judul')
                            ->required()
                            ->maxLength(255),
                        Textarea::make('data.secretariat_address')
                            ->label('Alamat')
                            ->required()
                            ->rows(4)
                            ->autosize()
                            ->columnSpanFull(),
                    ]),
            ],
            'footer.partners' => [
                Section::make('Partner Footer')
                    ->description('Heading dan logo partner dikelola lewat field khusus. Admin bisa menambah logo dengan tombol Tambah Logo.')
                    ->schema([
                        TextInput::make('data.heading')
                            ->label('Heading')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Repeater::make('data.logos')
                            ->label('Logo Partner')
                            ->addActionLabel('Tambah Logo')
                            ->itemLabel(fn (array $state): ?string => filled($state['name'] ?? null) ? $state['name'] : null)
                            ->reorderable()
                            ->cloneable()
                            ->collapsible()
                            ->defaultItems(4)
                            ->schema([
                                TextInput::make('name')
                                    ->label('Nama Partner')
                                    ->required()
                                    ->maxLength(255),
                                $this->imageUpload('image_path', 'File Logo', 'site-content/partners')
                                    ->required(),
                            ])
                            ->columns(2)
                            ->columnSpanFull(),
                    ]),
            ],
            default => [
                Section::make('Media & Isi')
                    ->schema([
                        $this->imageUpload('image_path', 'Gambar utama', 'site-content/covers')
                            ->helperText('Upload gambar cover halaman. Preview dibatasi agar modal tetap rapi. Untuk gambar di tengah artikel, gunakan tombol upload pada rich editor.'),
                        $this->contentEditor('content', 'Konten')
                            ->required()
                            ->columnSpanFull(),
                    ]),
            ],
        };
    }

    protected function imageUpload(string $name, string $label, string $directory): FileUpload
    {
        return FileUpload::make($name)
            ->label($label)
            ->image()
            ->imagePreviewHeight('180')
            ->imageEditor()
            ->imageEditorAspectRatios([
                '16:9',
                '4:3',
                '1:1',
            ])
            ->panelLayout('compact')
            ->maxSize(4096)
            ->disk('public')
            ->directory($directory)
            ->visibility('public')
            ->fetchFileInformation(false)
            ->getUploadedFileUsing(static function (string $file, string | array | null $storedFileNames): ?array {
                $url = SiteContent::resolveAssetUrl($file);

                if (blank($url)) {
                    return null;
                }

                return [
                    'name' => (is_array($storedFileNames) ? ($storedFileNames[$file] ?? null) : $storedFileNames) ?? basename($file),
                    'size' => 0,
                    'type' => null,
                    'url' => $url,
                ];
            })
            ->getOpenableFileUrlUsing(static fn (string $file): ?string => SiteContent::resolveAssetUrl($file))
            ->getDownloadableFileUrlUsing(static fn (string $file): ?string => SiteContent::resolveAssetUrl($file))
            ->openable()
            ->downloadable();
    }

    protected function contentEditor(string $name, string $label): RichEditor
    {
        return RichEditor::make($name)
            ->label($label)
            ->formatStateUsing(fn (?string $state): string => SiteContent::rewriteAssetUrls($state))
            ->toolbarButtons([
                ['bold', 'italic', 'underline', 'strike', 'link'],
                ['h1', 'h2', 'h3', 'h4', 'h5', 'paragraph'],
                ['alignStart', 'alignCenter', 'alignEnd'],
                ['blockquote', 'bulletList', 'orderedList'],
                ['table', 'attachFiles'],
                ['undo', 'redo'],
            ])
            ->fileAttachmentsDisk('public')
            ->fileAttachmentsDirectory('site-content/body')
            ->fileAttachmentsVisibility('public')
            ->resizableImages()
            ->columnSpanFull();
    }

    protected function getStructuredDataForForm(): array
    {
        return array_replace_recursive(
            $this->getDefaultStructuredData(),
            $this->getRecord()->structuredData(),
        );
    }

    protected function getDefaultStructuredData(): array
    {
        return match (static::getContentKey()) {
            'home.hero' => ['slides' => []],
            'home.partner-notes' => ['notes' => []],
            'footer.contact' => [
                'logos' => [],
                'contacts' => [],
                'secretariat_title' => 'Sekretariat Pendaftaran',
                'secretariat_address' => '',
            ],
            'footer.partners' => [
                'heading' => 'Dewan Juri LKTI & Seminar Guru Bekerjasama Dengan:',
                'logos' => [],
            ],
            default => [],
        };
    }

    protected function normalizeFormDataForSave(array $data): array
    {
        if (! $this->usesStructuredData()) {
            $data['data'] = null;

            return Arr::only($data, [
                'navigation_label',
                'title',
                'image_path',
                'content',
                'data',
                'is_active',
            ]);
        }

        $structuredData = $this->normalizeStructuredData(static::getContentKey(), $data['data'] ?? []);

        $data['data'] = $structuredData;
        $data['content'] = match (static::getContentKey()) {
            'home.hero' => SiteContent::heroContentHtml($structuredData),
            'home.partner-notes' => SiteContent::partnerNotesContentHtml($structuredData),
            'footer.contact' => SiteContent::footerContactContentHtml($structuredData),
            'footer.partners' => SiteContent::footerPartnersContentHtml($structuredData),
            default => $data['content'] ?? '',
        };
        $data['image_path'] = $this->primaryImagePath(static::getContentKey(), $structuredData);

        return Arr::only($data, [
            'navigation_label',
            'title',
            'image_path',
            'content',
            'data',
            'is_active',
        ]);
    }

    protected function usesStructuredData(): bool
    {
        return in_array(static::getContentKey(), [
            'home.hero',
            'home.partner-notes',
            'footer.contact',
            'footer.partners',
        ], true);
    }

    protected function normalizeStructuredData(string $key, mixed $data): array
    {
        $data = is_array($data) ? $data : [];

        return match ($key) {
            'home.hero' => [
                'slides' => $this->cleanRows($data['slides'] ?? [], fn (array $slide): array => [
                    'caption' => $this->cleanString($slide['caption'] ?? ''),
                    'image_path' => $this->cleanImagePath($slide['image_path'] ?? null),
                ]),
            ],
            'home.partner-notes' => [
                'notes' => $this->cleanRows($data['notes'] ?? [], fn (array $note): array => [
                    'title' => $this->cleanString($note['title'] ?? ''),
                    'description' => $this->cleanHtml($note['description'] ?? ''),
                    'url' => $this->cleanString($note['url'] ?? ''),
                ]),
            ],
            'footer.contact' => [
                'logos' => $this->cleanRows($data['logos'] ?? [], fn (array $logo): array => [
                    'name' => $this->cleanString($logo['name'] ?? ''),
                    'image_path' => $this->cleanImagePath($logo['image_path'] ?? null),
                ]),
                'contacts' => $this->cleanRows($data['contacts'] ?? [], fn (array $contact): array => [
                    'label' => $this->cleanString($contact['label'] ?? ''),
                    'phone' => $this->cleanString($contact['phone'] ?? ''),
                ]),
                'secretariat_title' => $this->cleanString($data['secretariat_title'] ?? 'Sekretariat Pendaftaran'),
                'secretariat_address' => $this->cleanString($data['secretariat_address'] ?? ''),
            ],
            'footer.partners' => [
                'heading' => $this->cleanString($data['heading'] ?? 'Dewan Juri LKTI & Seminar Guru Bekerjasama Dengan:'),
                'logos' => $this->cleanRows($data['logos'] ?? [], fn (array $logo): array => [
                    'name' => $this->cleanString($logo['name'] ?? ''),
                    'image_path' => $this->cleanImagePath($logo['image_path'] ?? null),
                ]),
            ],
            default => [],
        };
    }

    protected function cleanRows(mixed $items, callable $normalizer): array
    {
        if (! is_array($items)) {
            return [];
        }

        $rows = [];

        foreach ($items as $item) {
            if (! is_array($item)) {
                continue;
            }

            $row = $normalizer($item);

            if (collect($row)->filter(fn (mixed $value): bool => filled($value))->isEmpty()) {
                continue;
            }

            $rows[] = $row;
        }

        return array_values($rows);
    }

    protected function cleanString(mixed $value): string
    {
        return is_scalar($value) ? trim((string) $value) : '';
    }

    protected function cleanHtml(mixed $value): string
    {
        return is_string($value) ? trim(SiteContent::rewriteAssetUrls($value)) : '';
    }

    protected function cleanImagePath(mixed $value): ?string
    {
        if (is_array($value)) {
            $value = Arr::first($value, fn (mixed $item): bool => filled($item));
        }

        if (! is_string($value) || blank($value)) {
            return null;
        }

        $value = trim(html_entity_decode($value));

        if (Str::startsWith($value, ['http://', 'https://', '//'])) {
            $normalizedUrl = Str::startsWith($value, '//') ? 'http:' . $value : $value;
            $value = parse_url($normalizedUrl, PHP_URL_PATH) ?: $value;
        }

        $value = ltrim($value, '/');

        if (Str::startsWith($value, 'storage/')) {
            return Str::after($value, 'storage/');
        }

        return $value;
    }

    protected function primaryImagePath(string $key, array $data): ?string
    {
        return match ($key) {
            'home.hero' => $data['slides'][0]['image_path'] ?? null,
            'footer.contact' => $data['logos'][0]['image_path'] ?? null,
            'footer.partners' => $data['logos'][0]['image_path'] ?? null,
            default => null,
        };
    }
}

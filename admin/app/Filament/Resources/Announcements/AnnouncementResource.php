<?php

namespace App\Filament\Resources\Announcements;

use App\Filament\RichContentPlugins\InlineTextColorPlugin;
use App\Filament\RichContentPlugins\ResponsiveImageSizingPlugin;
use App\Filament\Resources\Announcements\Pages\ManageAnnouncements;
use App\Models\Announcement;
use App\Models\SiteContent;
use BackedEnum;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class AnnouncementResource extends Resource
{
    protected static ?string $model = Announcement::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedMegaphone;

    protected static ?string $navigationLabel = 'Pengumuman';

    protected static string|\UnitEnum|null $navigationGroup = 'Konten Website';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Pengumuman')
                    ->columns(2)
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul')
                            ->required()
                            ->columnSpanFull()
                            ->maxLength(255),
                        Textarea::make('excerpt')
                            ->label('Ringkasan')
                            ->rows(3)
                            ->maxLength(500)
                            ->columnSpanFull(),
                        DateTimePicker::make('published_at')
                            ->label('Tanggal Publish')
                            ->seconds(false)
                            ->default(now())
                            ->required(),
                        Toggle::make('is_published')
                            ->label('Aktif / Dipublish')
                            ->default(true),
                    ]),
                Section::make()->schema([
                    Section::make('Media Utama')
                        ->description('Gambar pengumuman diupload dari field ini, bukan dari editor isi.')
                        ->schema([
                            static::imageUpload(),
                        ]),
                    Section::make('Link Bagikan')
                        ->description('Jika kosong, frontend akan memakai link share otomatis menuju halaman detail pengumuman.')
                        ->columns(2)
                        ->schema([
                            TextInput::make('whatsapp_url')
                                ->label('Link WhatsApp')
                                ->placeholder('https://wa.me/...')
                                ->url()
                                ->maxLength(255),
                            TextInput::make('facebook_url')
                                ->label('Link Facebook')
                                ->placeholder('https://facebook.com/...')
                                ->url()
                                ->maxLength(255),
                        ]),
                ]),
                Section::make('Isi Pengumuman')
                    ->columnSpanFull()
                    ->schema([
                        RichEditor::make('content')
                            ->label('Konten')
                            ->required()
                            ->formatStateUsing(fn (?string $state): string => SiteContent::rewriteAssetUrls($state))
                            ->toolbarButtons([
                                ['bold', 'italic', 'underline', 'strike', 'link', 'inlineTextColor'],
                                ['h1', 'h2', 'h3', 'h4', 'h5', 'paragraph'],
                                ['alignStart', 'alignCenter', 'alignEnd'],
                                ['blockquote', 'bulletList', 'orderedList'],
                                ['table'],
                                ['undo', 'redo'],
                            ])
                            ->extraFieldWrapperAttributes(['class' => 'announcement-content-editor'])
                            ->customTextColors()
                            ->resizableImages()
                            ->plugins([
                                InlineTextColorPlugin::make(),
                                ResponsiveImageSizingPlugin::make(),
                            ])
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Preview Pengumuman')
                    ->schema([
                        ImageEntry::make('image_url')
                            ->label('Gambar')
                            ->visible(fn (?Announcement $record): bool => filled($record?->image_url))
                            ->imageHeight(240)
                            ->extraImgAttributes([
                                'class' => 'rounded-xl bg-gray-50 object-contain p-2 dark:bg-gray-900',
                            ])
                            ->columnSpanFull(),
                        TextEntry::make('title')
                            ->label('Judul'),
                        TextEntry::make('publisher_name')
                            ->label('Publisher'),
                        TextEntry::make('published_at')
                            ->label('Tanggal Publish')
                            ->dateTime('d M Y H:i'),
                        TextEntry::make('viewers')
                            ->label('Viewers')
                            ->badge(),
                        TextEntry::make('rendered_content')
                            ->label('Isi')
                            ->html()
                            ->prose()
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image_url')
                    ->label('Gambar')
                    ->imageHeight(48)
                    ->extraImgAttributes([
                        'class' => 'rounded-lg bg-gray-50 object-contain p-1 dark:bg-gray-900',
                    ]),
                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('user.name')
                    ->label('Publisher')
                    ->default('Administrator Website')
                    ->sortable(),
                TextColumn::make('published_at')
                    ->label('Tanggal Publish')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
                TextColumn::make('viewers')
                    ->label('Viewers')
                    ->badge()
                    ->sortable(),
                IconColumn::make('is_published')
                    ->label('Aktif')
                    ->boolean(),
            ])
            ->filters([
                TernaryFilter::make('is_published')
                    ->label('Status Publish'),
            ])
            ->defaultSort('published_at', 'desc')
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }

    public static function canDelete(Model $record): bool
    {
        return true;
    }

    protected static function imageUpload(): FileUpload
    {
        return FileUpload::make('image_path')
            ->label('Gambar Pengumuman')
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
            ->directory('announcements')
            ->visibility('public')
            ->fetchFileInformation(false)
            ->getUploadedFileUsing(static function (string $file, string|array|null $storedFileNames): ?array {
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
            ->downloadable()
            ->columnSpanFull();
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageAnnouncements::route('/'),
        ];
    }
}

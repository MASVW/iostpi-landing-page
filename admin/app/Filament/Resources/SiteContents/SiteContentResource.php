<?php

namespace App\Filament\Resources\SiteContents;

use App\Filament\Resources\SiteContents\Pages\ManageSiteContents;
use App\Models\SiteContent;
use BackedEnum;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class SiteContentResource extends Resource
{
    protected static ?string $model = SiteContent::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $navigationLabel = 'Semua Konten';

    protected static string|\UnitEnum|null $navigationGroup = 'Konten Website';

    protected static bool $shouldRegisterNavigation = false;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Metadata')
                    ->columns(2)
                    ->schema([
                        TextInput::make('key')
                            ->label('Key')
                            ->disabled()
                            ->dehydrated(false),
                        Select::make('content_type')
                            ->label('Tipe Konten')
                            ->options([
                                'home' => 'Beranda',
                                'page' => 'Halaman',
                                'footer' => 'Footer',
                            ])
                            ->required(),
                        TextInput::make('navigation_group')
                            ->label('Group Navigasi')
                            ->required(),
                        TextInput::make('navigation_label')
                            ->label('Label Navigasi')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('title')
                            ->label('Judul Halaman')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('sort_order')
                            ->label('Urutan')
                            ->numeric()
                            ->required(),
                    ]),
                Section::make('Media & Isi')
                    ->schema([
                        FileUpload::make('image_path')
                            ->label('Gambar utama')
                            ->helperText('Upload gambar cover halaman. Preview dibatasi agar form tetap nyaman dibaca.')
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
                            ->directory('site-content/covers')
                            ->visibility('public')
                            ->openable()
                            ->downloadable(),
                        RichEditor::make('content')
                            ->label('Konten')
                            ->required()
                            ->formatStateUsing(fn (?string $state): string => SiteContent::rewriteAssetUrls($state))
                            ->toolbarButtons([
                                ['bold', 'italic', 'underline', 'strike', 'link'],
                                ['h1', 'h2', 'h3', 'h4', 'h5', 'paragraph'],
                                ['alignStart', 'alignCenter', 'alignEnd'],
                                ['blockquote', 'bulletList', 'orderedList'],
                                ['table', 'attachFiles'],
                                ['undo', 'redo'],
                            ])
                            ->extraFieldWrapperAttributes(['class' => 'announcement-content-editor'])
                            ->fileAttachmentsDisk('public')
                            ->fileAttachmentsDirectory('site-content/body')
                            ->fileAttachmentsVisibility('public')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Preview Konten')
                    ->schema([
                        TextEntry::make('navigation_group')
                            ->label('Group'),
                        TextEntry::make('title')
                            ->label('Judul'),
                        ImageEntry::make('image_url')
                            ->label('Gambar utama')
                            ->visible(fn (?SiteContent $record): bool => filled($record?->image_url))
                            ->imageHeight(220)
                            ->extraImgAttributes([
                                'class' => 'rounded-xl bg-gray-50 object-contain p-2 dark:bg-gray-900',
                            ])
                            ->columnSpanFull(),
                        TextEntry::make('rendered_content')
                            ->label('Isi')
                            ->formatStateUsing(fn (?string $state): string => static::formatPreviewHtml($state))
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
                TextColumn::make('navigation_group')
                    ->label('Group')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('navigation_label')
                    ->label('Menu')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable(),
                TextColumn::make('content_type')
                    ->label('Tipe')
                    ->badge(),
                IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
            ])
            ->filters([
                SelectFilter::make('navigation_group')
                    ->label('Group')
                    ->options(fn (): array => SiteContent::query()
                        ->whereNotNull('navigation_group')
                        ->distinct()
                        ->orderBy('navigation_group')
                        ->pluck('navigation_group', 'navigation_group')
                        ->all()),
            ])
            ->defaultSort('sort_order')
            ->recordActions([
                ViewAction::make(),
                EditAction::make()
                    ->visible(fn (SiteContent $record): bool => ! in_array($record->key, [
                        'home.hero',
                        'home.partner-notes',
                        'footer.contact',
                        'footer.partners',
                    ], true)),
            ]);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canDelete(Model $record): bool
    {
        return false;
    }

    public static function canDeleteAny(): bool
    {
        return false;
    }

    protected static function formatPreviewHtml(?string $html): string
    {
        if (blank($html)) {
            return '';
        }

        $html = SiteContent::rewriteAssetUrls($html);
        $previewImageStyle = 'display:block;max-height:18rem;width:auto;max-width:100%;object-fit:contain;border-radius:0.75rem;margin:1rem auto;box-shadow:0 10px 30px rgba(15,23,42,0.12);';

        return preg_replace_callback('/<img\b([^>]*)>/i', function (array $matches) use ($previewImageStyle): string {
            $attributes = $matches[1];

            if (preg_match('/\sstyle=(["\'])(.*?)\1/i', $attributes)) {
                $attributes = preg_replace(
                    '/\sstyle=(["\'])(.*?)\1/i',
                    ' style="$2 ' . $previewImageStyle . '"',
                    $attributes,
                    1,
                );

                return '<img' . $attributes . '>';
            }

            return '<img style="' . $previewImageStyle . '"' . $attributes . '>';
        }, $html) ?? $html;
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageSiteContents::route('/'),
        ];
    }
}

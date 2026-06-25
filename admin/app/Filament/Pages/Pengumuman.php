<?php

namespace App\Filament\Pages;

class Pengumuman extends ManageSiteContentPage
{
    protected static ?string $slug = 'informasi/pengumuman';
    protected static ?int $navigationSort = 430;
    protected static ?string $contentKey = 'page.pengumuman';
    protected static string|\UnitEnum|null $navigationGroup = 'Informasi';

    public static function getNavigationLabel(): string
    {
        return 'Pengumuman';
    }
}

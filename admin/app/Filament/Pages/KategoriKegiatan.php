<?php

namespace App\Filament\Pages;

class KategoriKegiatan extends ManageSiteContentPage
{
    protected static ?string $slug = 'beranda/kategori-kegiatan';
    protected static ?int $navigationSort = 30;
    protected static ?string $contentKey = 'home.activities';
    protected static string|\UnitEnum|null $navigationGroup = 'Beranda';

    public static function getNavigationLabel(): string
    {
        return 'Kategori Kegiatan';
    }
}

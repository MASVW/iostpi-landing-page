<?php

namespace App\Filament\Pages;

class OlimpiadeSiswa extends ManageSiteContentPage
{
    protected static ?string $slug = 'olimpiade-siswa';
    protected static ?int $navigationSort = 300;
    protected static ?string $contentKey = 'page.olimpiade-siswa';
    protected static string|\UnitEnum|null $navigationGroup = 'Olimpiade Siswa';

    public static function getNavigationLabel(): string
    {
        return 'Olimpiade Siswa';
    }
}

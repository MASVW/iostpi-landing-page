<?php

namespace App\Filament\Pages;

class OlimpiadeSiswaSma extends ManageSiteContentPage
{
    protected static ?string $slug = 'olimpiade-siswa/sma-ma-smk';
    protected static ?int $navigationSort = 310;
    protected static ?string $contentKey = 'page.olimpiade-siswa-sma-ma-smk';
    protected static string|\UnitEnum|null $navigationGroup = 'Olimpiade Siswa';

    public static function getNavigationLabel(): string
    {
        return 'SMA/MA/SMK';
    }
}

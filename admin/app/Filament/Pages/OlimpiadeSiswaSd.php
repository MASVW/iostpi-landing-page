<?php

namespace App\Filament\Pages;

class OlimpiadeSiswaSd extends ManageSiteContentPage
{
    protected static ?string $slug = 'olimpiade-siswa/sd-mi';
    protected static ?int $navigationSort = 330;
    protected static ?string $contentKey = 'page.olimpiade-siswa-sd-mi';
    protected static string|\UnitEnum|null $navigationGroup = 'Olimpiade Siswa';

    public static function getNavigationLabel(): string
    {
        return 'SD/MI';
    }
}

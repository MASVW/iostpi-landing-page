<?php

namespace App\Filament\Pages;

class OlimpiadeSiswaSmp extends ManageSiteContentPage
{
    protected static ?string $slug = 'olimpiade-siswa/smp-mts';
    protected static ?int $navigationSort = 320;
    protected static ?string $contentKey = 'page.olimpiade-siswa-smp-mts';
    protected static string|\UnitEnum|null $navigationGroup = 'Olimpiade Siswa';

    public static function getNavigationLabel(): string
    {
        return 'SMP/MTs';
    }
}

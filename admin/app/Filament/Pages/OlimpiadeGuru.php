<?php

namespace App\Filament\Pages;

class OlimpiadeGuru extends ManageSiteContentPage
{
    protected static ?string $slug = 'kompetisi-guru/olimpiade-guru';

    protected static ?int $navigationSort = 230;

    protected static ?string $contentKey = 'page.olimpiade-guru';

    protected static string|\UnitEnum|null $navigationGroup = 'Kompetisi Guru';

    public static function getNavigationLabel(): string
    {
        return 'Olimpiade Guru';
    }
}

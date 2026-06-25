<?php

namespace App\Filament\Pages;

class KompetisiGuru extends ManageSiteContentPage
{
    protected static ?string $slug = 'kompetisi-guru';
    protected static ?int $navigationSort = 200;
    protected static ?string $contentKey = 'page.kompetisi-guru';
    protected static string|\UnitEnum|null $navigationGroup = 'Kompetisi Guru';

    public static function getNavigationLabel(): string
    {
        return 'Kompetisi Guru';
    }
}

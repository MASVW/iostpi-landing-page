<?php

namespace App\Filament\Pages;

class LktiGuru extends ManageSiteContentPage
{
    protected static ?string $slug = 'kompetisi-guru/lkti-guru';
    protected static ?int $navigationSort = 210;
    protected static ?string $contentKey = 'page.lkti-guru';
    protected static string|\UnitEnum|null $navigationGroup = 'Kompetisi Guru';

    public static function getNavigationLabel(): string
    {
        return 'LKTI Guru';
    }
}

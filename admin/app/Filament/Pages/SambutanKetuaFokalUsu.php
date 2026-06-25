<?php

namespace App\Filament\Pages;

class SambutanKetuaFokalUsu extends ManageSiteContentPage
{
    protected static ?string $slug = 'sambutan/ketua-fokal-usu';
    protected static ?int $navigationSort = 120;
    protected static ?string $contentKey = 'page.sambutan-ketua-fokal-usu';
    protected static string|\UnitEnum|null $navigationGroup = 'Sambutan';

    public static function getNavigationLabel(): string
    {
        return 'Ketua FOKAL USU';
    }
}

<?php

namespace App\Filament\Pages;

class SambutanKetuaPanitia extends ManageSiteContentPage
{
    protected static ?string $slug = 'sambutan/ketua-panitia';
    protected static ?int $navigationSort = 130;
    protected static ?string $contentKey = 'page.sambutan-ketua-panitia';
    protected static string|\UnitEnum|null $navigationGroup = 'Sambutan';

    public static function getNavigationLabel(): string
    {
        return 'Ketua Panitia';
    }
}

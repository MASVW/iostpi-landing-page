<?php

namespace App\Filament\Pages;

class FooterKontak extends ManageSiteContentPage
{
    protected static ?string $slug = 'footer/kontak';
    protected static ?int $navigationSort = 500;
    protected static ?string $contentKey = 'footer.contact';
    protected static string|\UnitEnum|null $navigationGroup = 'Footer';

    public static function getNavigationLabel(): string
    {
        return 'Kontak Footer';
    }
}

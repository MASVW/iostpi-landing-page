<?php

namespace App\Filament\Pages;

class FooterPartner extends ManageSiteContentPage
{
    protected static ?string $slug = 'footer/partner';
    protected static ?int $navigationSort = 510;
    protected static ?string $contentKey = 'footer.partners';
    protected static string|\UnitEnum|null $navigationGroup = 'Footer';

    public static function getNavigationLabel(): string
    {
        return 'Partner Footer';
    }
}

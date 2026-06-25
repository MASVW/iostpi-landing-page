<?php

namespace App\Filament\Pages;

class PartnerNotes extends ManageSiteContentPage
{
    protected static ?string $slug = 'beranda/partner-notes';
    protected static ?int $navigationSort = 20;
    protected static ?string $contentKey = 'home.partner-notes';
    protected static string|\UnitEnum|null $navigationGroup = 'Beranda';

    public static function getNavigationLabel(): string
    {
        return 'Partner Notes';
    }
}

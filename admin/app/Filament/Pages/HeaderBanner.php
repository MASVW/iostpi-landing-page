<?php

namespace App\Filament\Pages;

class HeaderBanner extends ManageSiteContentPage
{
    protected static ?string $slug = 'beranda/banner-sce';
    protected static ?int $navigationSort = 5;
    protected static ?string $contentKey = 'header.banner';
    protected static string|\UnitEnum|null $navigationGroup = 'Beranda';

    public static function getNavigationLabel(): string
    {
        return 'Banner SCE';
    }
}

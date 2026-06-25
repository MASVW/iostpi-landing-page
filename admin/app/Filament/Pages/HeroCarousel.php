<?php

namespace App\Filament\Pages;

class HeroCarousel extends ManageSiteContentPage
{
    protected static ?string $slug = 'beranda/hero-carousel';
    protected static ?int $navigationSort = 10;
    protected static ?string $contentKey = 'home.hero';
    protected static string|\UnitEnum|null $navigationGroup = 'Beranda';

    public static function getNavigationLabel(): string
    {
        return 'Hero Carousel';
    }
}

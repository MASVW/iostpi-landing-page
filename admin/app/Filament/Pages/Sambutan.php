<?php

namespace App\Filament\Pages;

class Sambutan extends ManageSiteContentPage
{
    protected static ?string $slug = 'sambutan';
    protected static ?int $navigationSort = 100;
    protected static ?string $contentKey = 'page.sambutan';
    protected static string|\UnitEnum|null $navigationGroup = 'Sambutan';

    public static function getNavigationLabel(): string
    {
        return 'Sambutan';
    }
}

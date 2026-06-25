<?php

namespace App\Filament\Pages;

class SambutanDirekturIostpi extends ManageSiteContentPage
{
    protected static ?string $slug = 'sambutan/direktur-iostpi';
    protected static ?int $navigationSort = 110;
    protected static ?string $contentKey = 'page.sambutan-direktur-iostpi';
    protected static string|\UnitEnum|null $navigationGroup = 'Sambutan';

    public static function getNavigationLabel(): string
    {
        return 'Direktur IOSTPI';
    }
}

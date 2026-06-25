<?php

namespace App\Filament\Pages;

class HasilLomba extends ManageSiteContentPage
{
    protected static ?string $slug = 'informasi/hasil-lomba';
    protected static ?int $navigationSort = 440;
    protected static ?string $contentKey = 'page.hasil-lomba';
    protected static string|\UnitEnum|null $navigationGroup = 'Informasi';

    public static function getNavigationLabel(): string
    {
        return 'Hasil Lomba';
    }
}

<?php

namespace App\Filament\Pages;

class LokasiUjian extends ManageSiteContentPage
{
    protected static ?string $slug = 'informasi/lokasi-ujian-rundown';
    protected static ?int $navigationSort = 420;
    protected static ?string $contentKey = 'page.lokasi-ujian';
    protected static string|\UnitEnum|null $navigationGroup = 'Informasi';

    public static function getNavigationLabel(): string
    {
        return 'Lokasi Ujian & Rundown';
    }
}

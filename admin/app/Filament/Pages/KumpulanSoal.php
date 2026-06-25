<?php

namespace App\Filament\Pages;

class KumpulanSoal extends ManageSiteContentPage
{
    protected static ?string $slug = 'informasi/kumpulan-soal';
    protected static ?int $navigationSort = 410;
    protected static ?string $contentKey = 'page.kumpulan-soal';
    protected static string|\UnitEnum|null $navigationGroup = 'Informasi';

    public static function getNavigationLabel(): string
    {
        return 'Kumpulan Soal SCE';
    }
}

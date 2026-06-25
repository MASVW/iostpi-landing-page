<?php

namespace App\Filament\Pages;

class SeminarGuru extends ManageSiteContentPage
{
    protected static ?string $slug = 'kompetisi-guru/seminar-guru';
    protected static ?int $navigationSort = 220;
    protected static ?string $contentKey = 'page.seminar-guru';
    protected static string|\UnitEnum|null $navigationGroup = 'Kompetisi Guru';

    public static function getNavigationLabel(): string
    {
        return 'Seminar Guru';
    }
}

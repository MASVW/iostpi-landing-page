<?php

namespace App\Filament\Pages;

class ProsedurPendaftaran extends ManageSiteContentPage
{
    protected static ?string $slug = 'informasi/prosedur-pendaftaran';
    protected static ?int $navigationSort = 400;
    protected static ?string $contentKey = 'page.prosedur-pendaftaran';
    protected static string|\UnitEnum|null $navigationGroup = 'Informasi';

    public static function getNavigationLabel(): string
    {
        return 'Prosedur Pendaftaran';
    }
}

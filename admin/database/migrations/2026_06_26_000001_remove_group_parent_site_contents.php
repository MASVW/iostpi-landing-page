<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('site_contents')
            ->whereIn('key', [
                'page.sambutan',
                'page.olimpiade-siswa',
            ])
            ->delete();
    }

    public function down(): void
    {
        $now = now();

        DB::table('site_contents')->updateOrInsert(
            ['key' => 'page.sambutan'],
            [
                'content_type' => 'page',
                'navigation_group' => 'Sambutan',
                'navigation_label' => 'Sambutan',
                'title' => 'Sambutan',
                'image_path' => null,
                'content' => '<p>Sambutan</p>',
                'sort_order' => 100,
                'is_active' => true,
                'updated_at' => $now,
                'created_at' => $now,
            ],
        );

        DB::table('site_contents')->updateOrInsert(
            ['key' => 'page.olimpiade-siswa'],
            [
                'content_type' => 'page',
                'navigation_group' => 'Olimpiade Siswa',
                'navigation_label' => 'Olimpiade Siswa',
                'title' => 'Olimpiade Siswa',
                'image_path' => null,
                'content' => '<p>Olimpiade Siswa</p>',
                'sort_order' => 300,
                'is_active' => true,
                'updated_at' => $now,
                'created_at' => $now,
            ],
        );
    }
};

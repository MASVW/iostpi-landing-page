<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('site_contents')) {
            return;
        }

        DB::table('site_contents')
            ->where('key', 'page.hasil-lomba')
            ->delete();
    }

    public function down(): void
    {
        if (! Schema::hasTable('site_contents')) {
            return;
        }

        $record = [
            'content_type' => 'page',
            'navigation_group' => 'Informasi',
            'navigation_label' => 'Hasil Lomba',
            'title' => 'Hasil Lomba',
            'image_path' => null,
            'content' => '<p>Hasil Lomba</p>',
            'sort_order' => 440,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        if (Schema::hasColumn('site_contents', 'data')) {
            $record['data'] = null;
        }

        DB::table('site_contents')->updateOrInsert(
            ['key' => 'page.hasil-lomba'],
            $record,
        );
    }
};

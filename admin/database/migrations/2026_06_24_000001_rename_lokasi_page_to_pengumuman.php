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

        $record = DB::table('site_contents')->where('key', 'page.lokasi')->first();

        if (! $record) {
            return;
        }

        $updates = [
            'key' => 'page.pengumuman',
            'navigation_label' => 'Pengumuman',
            'title' => 'Pengumuman',
            'updated_at' => now(),
        ];

        if ($record->content === '<p>Lokasi</p>') {
            $updates['content'] = '<p>Pengumuman</p>';
        }

        DB::table('site_contents')
            ->where('id', $record->id)
            ->update($updates);
    }

    public function down(): void
    {
        if (! Schema::hasTable('site_contents')) {
            return;
        }

        $record = DB::table('site_contents')->where('key', 'page.pengumuman')->first();

        if (! $record) {
            return;
        }

        $updates = [
            'key' => 'page.lokasi',
            'navigation_label' => 'Lokasi',
            'title' => 'Lokasi',
            'updated_at' => now(),
        ];

        if ($record->content === '<p>Pengumuman</p>') {
            $updates['content'] = '<p>Lokasi</p>';
        }

        DB::table('site_contents')
            ->where('id', $record->id)
            ->update($updates);
    }
};

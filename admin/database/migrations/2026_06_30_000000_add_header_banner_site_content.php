<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('site_contents') || ! Schema::hasColumn('site_contents', 'data')) {
            return;
        }

        if (DB::table('site_contents')->where('key', 'header.banner')->exists()) {
            return;
        }

        $data = [
            'heading' => 'SCIENCE COMPETITION EXPO',
            'edition' => 'SCE - 2026',
            'region_heading' => 'SE SUMATERA BAGIAN UTARA',
            'region_detail' => '(Aceh, Sumatera Utara, Riau, Kepulauan Riau, dan Sumatera Barat)',
            'background_color' => '#f5fbff',
            'primary_text_color' => '#2b638f',
            'secondary_text_color' => '#31536b',
            'left_logos' => [
                [
                    'name' => 'IOSTPI',
                    'image_path' => 'seeded-assets/iostpi-logo.png',
                ],
                [
                    'name' => 'Forum Komunikasi Antar Alumni USU',
                    'image_path' => 'seeded-assets/logo-fokal-usu.avif',
                ],
            ],
            'right_logos' => [
                [
                    'name' => 'Pemerintah Provinsi Sumatera Utara',
                    'image_path' => 'seeded-assets/pemprovsu-logo.png',
                ],
                [
                    'name' => 'Pemerintah Kota Medan',
                    'image_path' => 'seeded-assets/pemko-medan-logo.png',
                ],
            ],
        ];

        DB::table('site_contents')->insert([
            'key' => 'header.banner',
            'content_type' => 'header',
            'navigation_group' => 'Beranda',
            'navigation_label' => 'Banner SCE',
            'title' => 'Banner SCE',
            'image_path' => 'seeded-assets/iostpi-logo.png',
            'content' => '<h1>SCIENCE COMPETITION EXPO</h1><h2>SCE - 2026</h2><h3>SE SUMATERA BAGIAN UTARA</h3><p>(Aceh, Sumatera Utara, Riau, Kepulauan Riau, dan Sumatera Barat)</p>',
            'data' => json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
            'sort_order' => 5,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        if (! Schema::hasTable('site_contents')) {
            return;
        }

        DB::table('site_contents')->where('key', 'header.banner')->delete();
    }
};

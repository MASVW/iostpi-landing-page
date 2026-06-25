<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('announcements', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->string('image_path')->nullable();
            $table->longText('content');
            $table->string('whatsapp_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->dateTime('published_at')->nullable();
            $table->unsignedBigInteger('viewers')->default(0);
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        $now = now();
        $publishedAt = '2026-06-03 22:36:00';

        $records = [
            [
                'title' => 'Pengumuman Pertama',
                'excerpt' => 'Informasi resmi Science Competition Expo yang dapat dilihat oleh peserta dan pendamping.',
                'content' => $this->announcementContent('Pengumuman Pertama'),
                'sort_order' => 10,
                'viewers' => 24,
            ],
            [
                'title' => 'Pengumuman Kedua',
                'excerpt' => 'Update informasi kegiatan, jadwal, dan ketentuan pelaksanaan Science Competition Expo.',
                'content' => $this->announcementContent('Pengumuman Kedua'),
                'sort_order' => 20,
                'viewers' => 25,
            ],
            [
                'title' => 'Pengumuman Ketiga',
                'excerpt' => 'Pengumuman terbaru dari panitia untuk seluruh peserta Science Competition Expo.',
                'content' => $this->announcementContent('Pengumuman Ketiga'),
                'sort_order' => 30,
                'viewers' => 26,
            ],
        ];

        DB::table('announcements')->insert(array_map(
            fn (array $record): array => [
                ...$record,
                'slug' => Str::slug($record['title']),
                'image_path' => 'seeded-assets/announcement-placeholder.svg',
                'published_at' => $publishedAt,
                'is_published' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            $records,
        ));
    }

    public function down(): void
    {
        Schema::dropIfExists('announcements');
    }

    protected function announcementContent(string $title): string
    {
        return <<<HTML
<h2>{$title}</h2>
<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley took a Cicero translation and prepared sample text for publication.</p>
<h2>Why do we use it?</h2>
<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Pengumuman ini dapat diperbarui melalui admin dengan isi, gambar, dan tautan sosial yang sesuai.</p>
HTML;
    }
};

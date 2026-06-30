<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->replaceDescription(
            'Informasi seminar guru PIOS.',
            'Informasi seminar guru.',
        );
    }

    public function down(): void
    {
        $this->replaceDescription(
            'Informasi seminar guru.',
            'Informasi seminar guru PIOS.',
        );
    }

    protected function replaceDescription(string $search, string $replacement): void
    {
        if (! Schema::hasTable('site_contents')) {
            return;
        }

        $content = DB::table('site_contents')
            ->where('key', 'home.activities')
            ->value('content');

        if (! is_string($content) || ! str_contains($content, $search)) {
            return;
        }

        DB::table('site_contents')
            ->where('key', 'home.activities')
            ->update([
                'content' => str_replace($search, $replacement, $content),
                'updated_at' => now(),
            ]);
    }
};

<?php

namespace App\Support;

use Closure;
use Illuminate\Support\Facades\Cache;

/**
 * Cache untuk respons API publik.
 *
 * Semua key diberi "versi". Saat admin menyimpan/menghapus SiteContent atau
 * Announcement, versi diganti (flush), sehingga semua cache API lama otomatis
 * tidak terpakai lagi dan konten baru langsung tampil.
 */
class ApiCache
{
    protected const VERSION_KEY = 'api-cache:version';

    public static function remember(string $key, int $seconds, Closure $callback): mixed
    {
        $version = Cache::get(self::VERSION_KEY, '0');

        return Cache::remember("api-cache:{$version}:{$key}", $seconds, $callback);
    }

    public static function flush(): void
    {
        Cache::forever(self::VERSION_KEY, (string) microtime(true));
    }
}

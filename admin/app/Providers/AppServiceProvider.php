<?php

namespace App\Providers;

use App\Models\Announcement;
use App\Models\SiteContent;
use App\Support\ApiCache;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        SiteContent::saved(fn () => ApiCache::flush());
        SiteContent::deleted(fn () => ApiCache::flush());
        Announcement::saved(fn () => ApiCache::flush());
        Announcement::deleted(fn () => ApiCache::flush());
    }
}

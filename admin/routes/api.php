<?php

use App\Http\Controllers\Api\PublicAnnouncementController;
use App\Http\Controllers\Api\PublicSiteContentController;
use Illuminate\Support\Facades\Route;

Route::get('/site-content/frontend', [PublicSiteContentController::class, 'frontend'])
    ->middleware('cache.headers:public;max_age=300;etag');
Route::get('/site-content/pages/{slug}', [PublicSiteContentController::class, 'page']);
Route::get('/announcements', [PublicAnnouncementController::class, 'index'])
    ->middleware('cache.headers:public;max_age=60;etag');
Route::get('/announcements/{announcement:slug}', [PublicAnnouncementController::class, 'show'])
    ->middleware('cache.headers:public;max_age=60;etag');
Route::post('/announcements/{announcement:slug}/view', [PublicAnnouncementController::class, 'trackView']);

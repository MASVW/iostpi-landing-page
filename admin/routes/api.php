<?php

use App\Http\Controllers\Api\PublicAnnouncementController;
use App\Http\Controllers\Api\PublicSiteContentController;
use Illuminate\Support\Facades\Route;

Route::get('/site-content/frontend', [PublicSiteContentController::class, 'frontend']);
Route::get('/site-content/pages/{slug}', [PublicSiteContentController::class, 'page']);
Route::get('/announcements', [PublicAnnouncementController::class, 'index']);
Route::get('/announcements/{announcement:slug}', [PublicAnnouncementController::class, 'show']);
Route::post('/announcements/{announcement:slug}/view', [PublicAnnouncementController::class, 'trackView']);

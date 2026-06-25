<?php

use App\Http\Controllers\Api\PublicSiteContentController;
use Illuminate\Support\Facades\Route;

Route::get('/site-content/frontend', [PublicSiteContentController::class, 'frontend']);
Route::get('/site-content/pages/{slug}', [PublicSiteContentController::class, 'page']);

<?php

use App\Http\Controllers\ModulesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/modules/{slug}', [ModulesController::class, 'show'])
    ->where('slug', '.*')
    ->name('modules.show');

Route::post('/upload', [\App\Http\Controllers\Astrify\UploadController::class, 'index'])->name('upload.store');

Route::get('/table', [\App\Http\Controllers\Astrify\TableController::class, 'index'])->name('table.index');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

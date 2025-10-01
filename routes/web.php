<?php

use App\Http\Controllers\DocsController;
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

// docs redirect to introduction
Route::redirect('/docs', '/docs/introduction')->name('docs');

Route::get('/docs/{slug}', [DocsController::class, 'show'])
    ->where('slug', '.*')
    ->name('docs.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';


/*
|--------------------------------------------------------------------------
| Upload Examples
|--------------------------------------------------------------------------
|
|
*/

use App\Http\Controllers\Astrify\SignedUrlController;
use App\Http\Controllers\Astrify\UploadController;

Route::middleware([])->group(function () {
    Route::get('/upload', [UploadController::class, 'index'])->name('upload.index');
    Route::post('/upload', [UploadController::class, 'store'])->name('upload.store');
    Route::post('/upload/signed-url', SignedUrlController::class)->name('upload.signed-url');
});


/*
|--------------------------------------------------------------------------
| Table Examples
|--------------------------------------------------------------------------
|
|
*/

Route::get('examples/user-table-inertia', function () {
    $users = \App\Models\User::select('id', 'name', 'email', 'created_at')
        ->orderBy('id', 'desc')
        ->paginate(10)
        ->onEachSide(1);

    return Inertia::render('astrify-examples/user-table-inertia', [
        'users' => $users,
    ]);
})->name('table.index');

Route::get('examples/user-table-json-data', function () {
    $users = \App\Models\User::select('id', 'name', 'email', 'created_at')
        ->orderBy('id', 'desc')
        ->paginate(10)
        ->onEachSide(1);

    return response()->json($users);
})->name('json-table.index');

Route::get('examples/user-table-json', function () {
    return Inertia::render('astrify-examples/user-table-json');
});

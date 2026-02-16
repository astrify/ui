<?php

use App\Http\Controllers\DocsController;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Http\Middleware\SetCacheHeaders;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Route;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Marketing Routes (stateless, cacheable by Cloudflare)
|--------------------------------------------------------------------------
*/

Route::withoutMiddleware([
    EncryptCookies::class,
    AddQueuedCookiesToResponse::class,
    StartSession::class,
    ShareErrorsFromSession::class,
    VerifyCsrfToken::class,
])->middleware([
    SetCacheHeaders::using('s_maxage=1200;etag'),
])->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');

    Route::redirect('/docs', '/docs/introduction')->name('docs');

    Route::get('/docs/{slug}', [DocsController::class, 'show'])
        ->where('slug', '.*')
        ->name('docs.show');

    Route::get('examples/user-table-inertia', function () {
        $users = \App\Models\User::select('id', 'name', 'email', 'created_at')
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('astrify-examples/user-table-inertia', [
            'users' => $users,
        ]);
    })->name('table.index');

    Route::get('/json-table-data-example', function () {
        $users = \App\Models\User::select('id', 'name', 'email', 'created_at')
            ->orderBy('id', 'desc')
            ->paginate(10);

        return response()->json($users);
    })->name('json-table.index');

    Route::get('json-table-example', function () {
        return Inertia::render('astrify-examples/json-table-example');
    });
});

/*
|--------------------------------------------------------------------------
| App Routes (session-based, with CSRF protection)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/upload', function () {
    return Inertia::render('astrify-examples/inertia-upload-example');
})->name('upload.index');

Route::post('/upload', function (\Illuminate\Http\Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'uploadedFiles' => 'required|array|min:1',
        'uploadedFiles.*.id' => 'required|string',
        'uploadedFiles.*.name' => 'required|string',
        'uploadedFiles.*.sha256' => 'required|string',
        'uploadedFiles.*.size' => 'required|integer|min:0',
        'uploadedFiles.*.type' => 'required|string',
    ]);

    \Illuminate\Support\Facades\Log::info('Document creation request received', [
        'name' => $validated['name'],
        'uploaded_files' => $validated['uploadedFiles'],
    ]);

    return back()->with('success', 'Files uploaded successfully');
})->name('upload.store');

Route::post('/upload/signed-url', \App\Http\Controllers\Astrify\SignedUrlController::class)->name('upload.signed-url');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

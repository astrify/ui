<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class DocsController extends Controller
{
    protected function manifest(): array
    {
        $path = base_path('bootstrap/cache/mdx.json');
        if (!File::exists($path)) return [];
        return json_decode(File::get($path), true) ?? [];
    }

    public function show(string $slug)
    {
        // Slugs in manifest are kebab-case
        $manifest = $this->manifest();
        $entry = collect($manifest)->firstWhere('slug', $slug);

        if (!$entry) abort(404);

        // Render the generated page file
        return Inertia::render('docs/posts/'.$slug, [
            'slug' => $slug,
            'meta' => $entry['meta'] ?? [],
            'toc' => $entry['toc'] ?? null,
        ]);
    }
}

<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Http\Request;

function inertiaAssetVersion(): string
{
    return (string) app(HandleInertiaRequests::class)->version(Request::create('/'));
}

it('strips the inertia cache variant query parameter from inertia page urls', function () {
    $response = $this->withHeaders([
        'X-Inertia' => 'true',
        'X-Inertia-Version' => inertiaAssetVersion(),
        'X-Requested-With' => 'XMLHttpRequest',
    ])->get('/?'.HandleInertiaRequests::CACHE_VARIANT_QUERY_PARAMETER.'=1');

    $response->assertOk();
    $response->assertHeader('X-Inertia', 'true');
    $response->assertJsonPath('url', '/');
});

it('keeps full marketing inertia responses cacheable', function () {
    $response = $this->withHeaders([
        'X-Inertia' => 'true',
        'X-Inertia-Version' => inertiaAssetVersion(),
        'X-Requested-With' => 'XMLHttpRequest',
    ])->get('/');

    $response->assertOk();
    expect((string) $response->headers->get('Cache-Control'))->toContain('s-maxage=1200');
});

it('shares cacheable route patterns derived from middleware', function () {
    $response = $this->withHeaders([
        'X-Inertia' => 'true',
        'X-Inertia-Version' => inertiaAssetVersion(),
        'X-Requested-With' => 'XMLHttpRequest',
    ])->get('/');

    $response->assertOk();
    $response->assertJsonPath('props.inertiaCache.queryParameter', HandleInertiaRequests::CACHE_VARIANT_QUERY_PARAMETER);

    $patterns = $response->json('props.inertiaCache.routePatterns');

    expect($patterns)->toBeArray()->not->toBeEmpty();
    expect($patterns)->toContain('^/$');
    expect(collect($patterns)->contains(fn (string $pattern): bool => str_starts_with($pattern, '^/docs')))->toBeTrue();
});

it('marks partial inertia responses as no-store to avoid cache poisoning', function () {
    $response = $this->withHeaders([
        'X-Inertia' => 'true',
        'X-Inertia-Version' => inertiaAssetVersion(),
        'X-Requested-With' => 'XMLHttpRequest',
        'X-Inertia-Partial-Component' => 'welcome',
        'X-Inertia-Partial-Data' => 'name',
    ])->get('/');

    $response->assertOk();
    $response->assertHeader('CDN-Cache-Control', 'no-store');
    $response->assertHeader('Cloudflare-CDN-Cache-Control', 'no-store');
    expect((string) $response->headers->get('Cache-Control'))->toContain('no-store');
});

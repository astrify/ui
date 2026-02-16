<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Routing\Route as LaravelRoute;
use Illuminate\Support\Facades\Route;
use Inertia\Middleware;
use Symfony\Component\HttpFoundation\Response;

class HandleInertiaRequests extends Middleware
{
    public const CACHE_VARIANT_QUERY_PARAMETER = '__icv';

    /**
     * @var array<int, string>|null
     */
    protected static ?array $cacheableRoutePatterns = null;

    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    public function handle(Request $request, Closure $next): Response
    {
        $request->query->remove(self::CACHE_VARIANT_QUERY_PARAMETER);

        /** @var Response $response */
        $response = parent::handle($request, $next);

        if ($request->headers->has('X-Inertia-Partial-Component')) {
            $response->headers->set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
            $response->headers->set('CDN-Cache-Control', 'no-store');
            $response->headers->set('Cloudflare-CDN-Cache-Control', 'no-store');
        }

        return $response;
    }

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Ensure internal cache-key query params are not reflected in page.url.
     */
    public function urlResolver(): ?Closure
    {
        return static function (Request $request): string {
            $query = $request->query();

            unset($query[self::CACHE_VARIANT_QUERY_PARAMETER]);

            $path = $request->getPathInfo();

            if ($query === []) {
                return $path;
            }

            return $path.'?'.http_build_query($query);
        };
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'inertiaCache' => [
                'currentRouteCacheable' => (bool) $request->attributes->get(MarkInertiaCacheable::REQUEST_ATTRIBUTE, false),
                'queryParameter' => self::CACHE_VARIANT_QUERY_PARAMETER,
                'routePatterns' => $this->cacheableInertiaRoutePatterns(),
            ],
            'sidebarOpen' => true,
        ];
    }

    /**
     * @return array<int, string>
     */
    protected function cacheableInertiaRoutePatterns(): array
    {
        if (self::$cacheableRoutePatterns !== null) {
            return self::$cacheableRoutePatterns;
        }

        self::$cacheableRoutePatterns = collect(Route::getRoutes()->getRoutes())
            ->filter(function (LaravelRoute $route): bool {
                if (! in_array('GET', $route->methods(), true)) {
                    return false;
                }

                return in_array(MarkInertiaCacheable::class, $route->gatherMiddleware(), true);
            })
            ->map(fn (LaravelRoute $route): string => $this->routeToClientPattern($route))
            ->filter()
            ->unique()
            ->values()
            ->all();

        return self::$cacheableRoutePatterns;
    }

    protected function routeToClientPattern(LaravelRoute $route): string
    {
        $path = '/'.ltrim($route->uri(), '/');

        if ($path === '/') {
            return '^/$';
        }

        $segments = array_values(array_filter(explode('/', trim($path, '/')), static fn (string $segment): bool => $segment !== ''));
        $pattern = '^';

        foreach ($segments as $segment) {
            if (preg_match('/^\{(.+)\}$/', $segment, $matches) !== 1) {
                $pattern .= '/'.preg_quote($segment, '/');

                continue;
            }

            $parameter = $matches[1];
            $isOptional = str_ends_with($parameter, '?');
            $parameterName = $isOptional ? substr($parameter, 0, -1) : $parameter;
            $constraint = $route->wheres[$parameterName] ?? null;
            $segmentPattern = $this->parameterSegmentPattern($constraint);

            if ($isOptional) {
                $pattern .= '(?:/'.$segmentPattern.')?';

                continue;
            }

            $pattern .= '/'.$segmentPattern;
        }

        return $pattern.'$';
    }

    protected function parameterSegmentPattern(?string $constraint): string
    {
        if ($constraint === null || $constraint === '') {
            return '[^/]+';
        }

        if ($constraint === '.*' || $constraint === '.+') {
            return $constraint;
        }

        return '(?:'.$constraint.')';
    }
}

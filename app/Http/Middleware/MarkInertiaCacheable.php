<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MarkInertiaCacheable
{
    public const REQUEST_ATTRIBUTE = 'inertia_cacheable';

    public function handle(Request $request, Closure $next): Response
    {
        $request->attributes->set(self::REQUEST_ATTRIBUTE, true);

        return $next($request);
    }
}

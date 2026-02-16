import type { GlobalEvent } from '@inertiajs/core';
import { router } from '@inertiajs/react';

const DEFAULT_INERTIA_CACHE_VARIANT_QUERY_PARAMETER = '__icv';
const INERTIA_CACHE_VARIANT_QUERY_VALUE = '1';

type InertiaCacheSettings = {
    queryParameter?: string;
    routePatterns?: string[];
};

const inertiaCacheState: {
    queryParameter: string;
    routeMatchers: RegExp[];
} = {
    queryParameter: DEFAULT_INERTIA_CACHE_VARIANT_QUERY_PARAMETER,
    routeMatchers: [],
};

let listenersRegistered = false;

const isPartialInertiaVisit = (visit: GlobalEvent<'before'>['detail']['visit']): boolean => {
    return visit.only.length > 0 || visit.except.length > 0;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null;
};

const toRegExp = (pattern: string): RegExp | null => {
    try {
        return new RegExp(pattern);
    } catch {
        return null;
    }
};

const updateInertiaCacheState = (pageProps: unknown): void => {
    if (!isRecord(pageProps)) {
        return;
    }

    const rawSettings = pageProps.inertiaCache;

    if (!isRecord(rawSettings)) {
        return;
    }

    const settings = rawSettings as InertiaCacheSettings;
    const queryParameter =
        typeof settings.queryParameter === 'string' && settings.queryParameter.length > 0
            ? settings.queryParameter
            : DEFAULT_INERTIA_CACHE_VARIANT_QUERY_PARAMETER;
    const routeMatchers = Array.isArray(settings.routePatterns)
        ? settings.routePatterns
              .filter((pattern): pattern is string => typeof pattern === 'string' && pattern.length > 0)
              .map(toRegExp)
              .filter((pattern): pattern is RegExp => pattern instanceof RegExp)
        : [];

    inertiaCacheState.queryParameter = queryParameter;
    inertiaCacheState.routeMatchers = routeMatchers;
};

const isCacheableMarketingPath = (pathname: string): boolean => {
    return inertiaCacheState.routeMatchers.some((matcher) => matcher.test(pathname));
};

const registerListeners = (): void => {
    if (listenersRegistered) {
        return;
    }

    listenersRegistered = true;

    router.on('navigate', (event) => {
        updateInertiaCacheState(event.detail.page.props);
    });

    router.on('before', (event) => {
        const visit = event.detail.visit;

        if (visit.method !== 'get' || isPartialInertiaVisit(visit)) {
            return;
        }

        if (visit.url.origin !== window.location.origin || !isCacheableMarketingPath(visit.url.pathname)) {
            return;
        }

        if (!visit.url.searchParams.has(inertiaCacheState.queryParameter)) {
            visit.url.searchParams.set(inertiaCacheState.queryParameter, INERTIA_CACHE_VARIANT_QUERY_VALUE);
        }
    });
};

export const setupInertiaCacheVariant = (initialPageProps: unknown): void => {
    updateInertiaCacheState(initialPageProps);
    registerListeners();
};

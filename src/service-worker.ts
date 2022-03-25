/**
 * A copy from 
 * https://github.com/NicholasPeretti/service-worker-ts-example/blob/master/src/index.ts
 * with with timestamp instead of version 
 */

 import { timestamp, build } from '$service-worker';


declare var self: ServiceWorkerGlobalScope;
export { };

const CACHE_NAME = `cache-${timestamp}`;

const filesToCache = ["/"];

/**
 * Cache files on install
 */
self.addEventListener("install", event => {
    event.waitUntil(
        (async function () {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(filesToCache);
        })()
    );
});

/**
 * Delete outdated caches when activated
 */
self.addEventListener("activate", event => {
    self.clients.claim();

    event.waitUntil(
        (async function () {
            // Remove old caches.
            const promises = (await caches.keys()).map(cacheName => {
                if (CACHE_NAME !== cacheName) {
                    return caches.delete(cacheName);
                }
            });

            await Promise.all<any>(promises);
        })()
    );
});

/**
 * Reply with cached data when possible
 */
self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") {
        return;
    }
    event.respondWith(
        (async function () {
            const cachedResponse = await caches.match(event.request, {
                ignoreSearch: true
            });
            return cachedResponse || fetch(event.request);
        })()
    );
});
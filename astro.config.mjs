import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
//
// Astro 7 removed the `hybrid` output mode. Default `static` now behaves
// the same way: pages are prerendered by default, opt-in to on-demand
// rendering per page with `export const prerender = false`.
//
// The adapter is still required so opt-in pages can run in Cloudflare's
// V8 isolate runtime (Workers).
export default defineConfig({
  adapter: cloudflare({
    // Cloudflare's edge runtime — same V8 isolates that power Workers.
    // Image service 'cloudflare' uses Cloudflare Images for on-the-fly transforms.
    imageService: 'cloudflare',
    // PlatformProxy lets `astro dev` emulate Cloudflare bindings (KV, D1, R2, env).
    platformProxy: { enabled: true },
  }),
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
    // Alias `react`/`react-dom` → preact/compat so React-typed deps (e.g. lenis peer)
    // resolve to Preact at build time without bundling a second runtime.
    resolve: {
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react/jsx-runtime': 'preact/jsx-runtime',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  prefetch: {
    prefetchAll: false,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});

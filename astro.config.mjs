import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Hybrid: pages are static by default; opt-in to SSR with `export const prerender = false`.
  // Lets us ship 100% CDN-cached for the marketing/landing surface while enabling
  // server-side logic (cart, auth, API endpoints) where needed.
  output: 'hybrid',
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

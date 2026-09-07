import { defineConfig } from 'vitest/config';

// The suite targets only the pure `examples/lib` helpers (no DOM, no Three.js),
// so it runs in the default Node environment with no extra setup. One test
// asserts the non-browser (SSR) fallback where `window` is undefined, so do NOT
// switch this to jsdom.
export default defineConfig({
  test: {
    include: ['examples/**/*.test.ts'],
    environment: 'node',
  },
});

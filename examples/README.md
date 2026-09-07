# AETumi Agency Starter — examples

An expert-grade **Next.js 14 + React 18 + three 0.160.0** agency landing: a
semantic, accessible, luxury-styled page with a client-only 3D hero backdrop that
detects WebGL, adapts its resolution, and degrades gracefully.

Hub: <https://aetumi.app/aetumi-agency-starter>

## What's in here

| File | Role |
| --- | --- |
| [`app/page.tsx`](./app/page.tsx) | **Server Component** landing: hero, benchmarks band, services grid, selected work and a contact CTA. Semantic landmarks (`header`/`main`/`footer`/`nav`), real premium copy, keyboard-reachable links, single-source palette tokens. |
| [`components/Hero3D.tsx`](./components/Hero3D.tsx) | **Client Component** hero backdrop — an instanced particle field on Three.js r160. Capability fallback, adaptive resolution, `prefers-reduced-motion`, off-screen/hidden-tab pausing, full cleanup. Typed props. |
| [`lib/prefersReducedMotion.ts`](./lib/prefersReducedMotion.ts) | **Pure, SSR-safe** reader for the OS reduce-motion setting, with an injectable matcher for testing. |
| [`lib/prefersReducedMotion.test.ts`](./lib/prefersReducedMotion.test.ts) | **Vitest** unit tests — 7 cases, runnable headless. |

## Why it's built this way

- **The 3D is a backdrop, not the message.** Every word a visitor (or a crawler)
  needs is server-rendered HTML. `Hero3D` loads with
  `next/dynamic({ ssr: false })`, sits behind the copy with `aria-hidden`, and
  its own CSS gradient is the fallback — so `page.tsx` stays a pure Server
  Component with no client callback to wire up.
- **Accessible by default.** Reduced-motion users get a still frame and the
  gradient — never a spinning canvas. Links are real `<a>` elements; every
  section is a landmark with `aria-labelledby`.
- **Cheap and adaptive on the GPU.** `InstancedMesh` draws ~900 particles in a
  single call; a rolling FPS measurement steps the device-pixel ratio down on
  weak hardware (and back up with headroom), with a dead-zone + cooldown so it
  never flip-flops. Everything is disposed on unmount, StrictMode-safe.
- **Correct WebGL setup.** `SRGBColorSpace` output, `webgl2 → webgl` capability
  detection, `setAnimationLoop` for pause/resume, and a `webglcontextlost`
  handler.

## Run it

```bash
npx create-next-app@14 my-agency --ts --app --eslint
cd my-agency
npm install three@0.160.0
npm install -D @types/three@0.160.0 vitest@2
# copy app/, components/, lib/ and .github/ into the new project
```

Add scripts to `package.json`:

```jsonc
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "typecheck": "tsc --noEmit",
    "test": "vitest"
  }
}
```

```bash
npm run dev        # http://localhost:3000
npm run typecheck
npm run test       # the pure lib; no browser needed
```

## Pinned dependencies

| Package | Version |
| --- | --- |
| `next` | `14.x` |
| `react` / `react-dom` | `18.x` |
| `three` | `0.160.0` |
| `@types/three` | `0.160.0` (dev) |
| `vitest` | `2.x` (dev) |

## Rebrand checklist

1. **Name & domain** — replace every `Northlight` and `hello@northlight.studio`
   in `app/page.tsx`.
2. **Palette** — edit the `ACCENT` / `INK` / `PAPER` / `LINE` / `MUTED` tokens at
   the top of `app/page.tsx`, and pass a matching `color` to `<Hero3D>` (plus the
   `DEFAULT_BACKGROUND` gradient in `components/Hero3D.tsx`).
3. **Services & work** — edit the `services`, `work` and `stats` arrays in
   `app/page.tsx`. Keep services to four so the grid stays tidy; keep the work
   results specific and honest.
4. **Metadata** — update the `metadata` export (title, description, OpenGraph,
   Twitter); this is what shows in search and link previews.
5. **Hero density** — tune `particleCount` on `<Hero3D>` (lower it for very dense
   text or weaker target devices).
6. **OG image** — add `public/og.jpg` and reference it from
   `metadata.openGraph.images` for rich link previews.

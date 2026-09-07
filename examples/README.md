# AETumi Agency Starter — examples

A small, correct **Next.js 14 + React 18 + three 0.160.0** agency landing
scaffold: a semantic, accessible page with a client-only 3D hero backdrop that
degrades gracefully.

Hub: <https://aetumi.app/aetumi-agency-starter>

## What's in here

| File | Role |
| --- | --- |
| [`app/page.tsx`](./app/page.tsx) | **Server Component** agency landing: hero, services grid and a contact CTA. Semantic landmarks (`header`/`main`/`footer`/`nav`), real copy, keyboard-reachable links. |
| [`components/Hero3D.tsx`](./components/Hero3D.tsx) | **Client Component** hero backdrop — an instanced particle field on Three.js r160. Respects `prefers-reduced-motion`, caps pixel ratio, one draw call, full cleanup. |

## Why it's built this way

- **The 3D is a backdrop, not the message.** Every word a visitor (or a crawler)
  needs is in server-rendered HTML. `Hero3D` is loaded with
  `next/dynamic({ ssr: false })` and sits behind the copy with `aria-hidden`.
- **Accessible by default.** Reduced-motion users get a still frame and a CSS
  gradient — never a spinning canvas. Links are real `<a>` elements; sections
  use `aria-labelledby`.
- **Cheap on the GPU.** `InstancedMesh` draws ~900 particles in a single call,
  the pixel ratio is capped at 2, and everything is disposed on unmount.

## Run it

```bash
npx create-next-app@14 my-agency --ts --app --eslint
cd my-agency
npm install three@0.160.0
npm install -D @types/three@0.160.0
# copy app/page.tsx and components/Hero3D.tsx into the new project
npm run dev
```

## Rebrand checklist

1. **Name & domain** — replace every `Northlight` and `hello@northlight.studio`
   in `app/page.tsx`.
2. **Services** — edit the `services` array in `app/page.tsx` (title + one honest
   sentence each). Keep it to four so the grid stays tidy.
3. **Palette** — the accent is `#7c9cff` and the dark ground is `#0a0e1a`. Change
   them in `page.tsx` and in the gradient + particle colour inside `Hero3D.tsx`.
4. **Metadata** — update the `metadata` export (title, description, OpenGraph) in
   `page.tsx`; this is what shows in search results and link previews.
5. **Hero density** — tune `PARTICLE_COUNT` in `Hero3D.tsx` (lower it for very
   dense text or weaker target devices).
6. **Poster / OG image** — add a `public/og.jpg` and reference it from
   `metadata.openGraph.images` for rich link previews.

---

## Example backlog / roadmap

# AETumi Agency Starter Example Backlog

## Planned templates and examples

### Discovery brief

A short client brief covering audience, business goal, conversion path, content ownership, 3D role and technical constraints.

### Experience architecture

Map semantic content, navigation, 3D layers, analytics and maintenance responsibilities before implementation.

### Prototype checklist

Define what needs to be proven before production: interaction, asset weight, mobile behavior and fallback quality.

### Launch QA checklist

Review metadata, semantic HTML, reduced motion, touch behavior, loading, frame cost, analytics and deployment.

### Handoff template

Document editable content, asset replacement, deployment, known limitations and ongoing maintenance.

### AI coding implementation brief

A structured prompt for Claude Code, Cursor or Codex that includes architecture boundaries and acceptance criteria instead of vague “make it cinematic” instructions.

## AETumi links

- https://aetumi.app/for-agencies/
- https://aetumi.app/3d-websites/
- https://aetumi.app/docs/
- https://aetumi.app/mcp/

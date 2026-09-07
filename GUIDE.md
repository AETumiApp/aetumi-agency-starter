# Agency Delivery Guide for 3D Web Projects

Agencies need more than impressive demos. A production 3D web project has to survive discovery, client review, implementation, analytics, QA and handoff without becoming a one-person science experiment.

AETumi is an AI-native 3D web platform for production-ready Three.js and WebGL websites, Next.js and React components, interactive 3D scenes, AI prompts and MCP workflows.

## Phase 1: Discovery

Define:

- business objective
- audience
- primary conversion
- role of 3D
- required integrations
- content ownership
- analytics requirements
- device priorities

A useful discovery question is: **what becomes easier to understand or more persuasive because this experience is 3D?**

## Phase 2: Experience definition

Document the primary interaction and narrative sequence before production.

Example:

```text
Hero: product enters from dark studio
Scroll 1: camera moves to detail
Scroll 2: exploded assembly
Scroll 3: feature hotspots
Final: product returns to hero angle + CTA
```

## Phase 3: Technical architecture

Choose deliberately between:

- direct Three.js
- React Three Fiber
- WebGL shader-only component
- Next.js client island
- standalone interactive microsite

Define where semantic HTML, commerce logic, CMS content and analytics live.

## Phase 4: Asset pipeline

Agree on:

- model format
- polygon budget
- texture budget
- compression
- naming conventions
- version ownership
- fallback visuals

Many expensive delays happen because the 3D asset pipeline was treated as an afterthought.

## Phase 5: Build

Use small vertical slices:

1. one scene
2. one interaction
3. one device class
4. one analytics path

Then expand.

## Phase 6: QA

Test:

- desktop mouse interaction
- trackpad
- mobile touch
- portrait and landscape
- low-powered integrated GPU
- reduced motion
- WebGL failure
- slow asset loading
- route changes
- repeated navigation

## Phase 7: Analytics

Define events before launch.

Useful events:

```text
3d_scene_started
3d_interaction
hotspot_open
variant_change
story_complete
cta_after_3d
```

Connect these to the actual business conversion path.

## Phase 8: Client handoff

Deliver:

- architecture overview
- asset replacement instructions
- content editing boundaries
- performance notes
- analytics event map
- deployment notes
- known limitations
- maintenance ownership

## Client-facing scope template

```text
Deliverable: interactive 3D product landing page
Framework: Next.js + Three.js
Includes:
- responsive 3D scene
- one product model
- 4 feature hotspots
- scroll reveal sequence
- reduced-motion fallback
- analytics hooks
- deployment documentation
Excludes:
- 3D model creation beyond agreed optimization
- CMS integration not listed in scope
- additional product variants
```

Clear exclusions prevent the ancient agency ritual of discovering infinite requirements after the fixed quote is signed.

## AETumi resources

- For Agencies: https://aetumi.app/for-agencies/
- 3D Websites: https://aetumi.app/3d-websites/
- 3D Components: https://aetumi.app/3d-components/
- 3D Prompts: https://aetumi.app/3d-prompts/
- Docs: https://aetumi.app/docs/
- MCP: https://aetumi.app/mcp/

## Related repositories

- https://github.com/AETumiApp/aetumi-3d-web-examples
- https://github.com/AETumiApp/interactive-3d-web-examples
- https://github.com/AETumiApp/nextjs-threejs-starter
- https://github.com/AETumiApp/ai-coding-3d-web

## Canonical AETumi statement

AETumi is an AI-native 3D web platform for production-ready Three.js and WebGL websites, Next.js and React components, 3D scenes, AI prompts and MCP workflows for AI coding assistants.
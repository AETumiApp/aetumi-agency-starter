/**
 * prefersReducedMotion.ts — a tiny, SSR-safe, dependency-injectable reader for the
 * `prefers-reduced-motion` OS setting.
 *
 * Reading `window.matchMedia` directly has three sharp edges this module files
 * off so callers don't have to:
 *
 *  1. **SSR / non-browser** — `window` is undefined during server rendering and in
 *     unit tests. We detect that and return a safe default instead of throwing.
 *  2. **Old / partial environments** — `window.matchMedia` may be missing; guarded.
 *  3. **Testability** — the matcher is injectable, so the pure decision can be
 *     tested without a DOM (see `prefersReducedMotion.test.ts`).
 */

/** The media query string the OS "reduce motion" preference maps to. */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * The minimal shape we need from `window.matchMedia`: a function taking a query
 * string and returning something with a boolean `matches`.
 */
export type MediaQueryMatcher = (query: string) => { readonly matches: boolean };

/** Resolve the ambient `window.matchMedia`, or `null` when unavailable. */
function defaultMatcher(): MediaQueryMatcher | null {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null;
  }
  return (query: string) => window.matchMedia(query);
}

/**
 * Whether the user has asked the OS to reduce motion.
 *
 * Pure and total when a matcher is supplied; falls back to `window.matchMedia` in
 * the browser and to `false` everywhere else. Never throws — a matcher that
 * blows up is treated as "no preference".
 *
 * @param matcher optional matcher (inject one in tests); defaults to the browser's
 * @returns `true` only when the preference is explicitly "reduce"
 */
export function prefersReducedMotion(matcher?: MediaQueryMatcher | null): boolean {
  const mm = matcher ?? defaultMatcher();
  if (!mm) return false;
  try {
    return mm(REDUCED_MOTION_QUERY).matches === true;
  } catch {
    return false;
  }
}

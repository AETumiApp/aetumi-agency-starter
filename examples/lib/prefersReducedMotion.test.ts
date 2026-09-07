import { describe, it, expect, vi } from 'vitest';
import {
  REDUCED_MOTION_QUERY,
  prefersReducedMotion,
  type MediaQueryMatcher,
} from './prefersReducedMotion';

const matcherReturning = (matches: boolean): MediaQueryMatcher => () => ({ matches });

describe('prefersReducedMotion', () => {
  it('returns true when the injected matcher reports a match', () => {
    expect(prefersReducedMotion(matcherReturning(true))).toBe(true);
  });

  it('returns false when the injected matcher reports no match', () => {
    expect(prefersReducedMotion(matcherReturning(false))).toBe(false);
  });

  it('queries the correct media feature string', () => {
    const spy = vi.fn<MediaQueryMatcher>(() => ({ matches: true }));
    prefersReducedMotion(spy);
    expect(spy).toHaveBeenCalledWith(REDUCED_MOTION_QUERY);
  });

  it('coerces a non-boolean `matches` to a strict boolean', () => {
    // A misbehaving matcher returning a truthy non-boolean must not leak it.
    const weird: MediaQueryMatcher = () => ({ matches: 1 as unknown as boolean });
    expect(prefersReducedMotion(weird)).toBe(false);
  });

  it('treats a throwing matcher as "no preference" (never throws)', () => {
    const throwing: MediaQueryMatcher = () => {
      throw new Error('matchMedia exploded');
    };
    expect(prefersReducedMotion(throwing)).toBe(false);
  });

  it('falls back to false in a non-browser (SSR) environment', () => {
    // No matcher supplied and (in the Node test runtime) no `window`.
    const hadWindow = typeof (globalThis as { window?: unknown }).window !== 'undefined';
    expect(prefersReducedMotion(null)).toBe(false);
    // Sanity: this assertion documents the environment we relied on.
    expect(hadWindow).toBe(false);
  });

  it('falls back to false when matchMedia is missing on window', () => {
    const g = globalThis as { window?: unknown };
    const original = g.window;
    g.window = {} as unknown; // window exists but no matchMedia
    try {
      expect(prefersReducedMotion()).toBe(false);
    } finally {
      if (original === undefined) delete g.window;
      else g.window = original;
    }
  });
});

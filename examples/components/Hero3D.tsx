'use client';

/**
 * Hero3D.tsx — an agency hero backdrop on Three.js r160.
 *
 * A slowly drifting field of instanced points that reads as "signal" behind the
 * headline. It is deliberately subtle: a backdrop, never the subject.
 *
 * Production concerns handled here:
 *  - **Capability fallback.** Probes WebGL2 → WebGL; if neither is present it
 *    calls `onUnsupported` and leaves the CSS gradient (its own background) as the
 *    visible layer.
 *  - **Adaptive resolution.** A rolling FPS measurement steps the device-pixel
 *    ratio down on weak hardware and back up when there is headroom, with a
 *    dead-zone + cooldown so it never flip-flops.
 *  - **Reduced motion.** Uses the shared `prefersReducedMotion` helper: one static
 *    frame, no loop.
 *  - **Never renders unseen.** Pauses off-screen (IntersectionObserver) and on a
 *    hidden tab (visibilitychange) via `setAnimationLoop`.
 *  - **Strict, StrictMode-safe cleanup.** A `disposed` flag guards the async
 *    import; geometry, material, InstancedMesh and renderer are all disposed.
 *
 * Mount behind the hero copy with `next/dynamic(() => import('...'), { ssr:false })`.
 */

import { useEffect, useRef, type CSSProperties } from 'react';
import type * as THREE from 'three';
import { prefersReducedMotion } from '../lib/prefersReducedMotion';

export interface Hero3DProps {
  /** Number of instanced particles. Lower it for very dense copy or weak targets. */
  particleCount?: number;
  /** Accent colour of the particles (any CSS/Three colour string). */
  color?: string;
  /** Class applied to the container. */
  className?: string;
  /** Inline styles merged over the default fill + gradient. */
  style?: CSSProperties;
  /** Called once if WebGL is unavailable or the context is lost. */
  onUnsupported?: () => void;
}

/** Device-pixel-ratio caps for the three internal quality tiers. */
const TIER_DPR = [1, 1.5, 2] as const;
const DOWNGRADE_FPS = 45;
const UPGRADE_FPS = 57;
const COOLDOWN_FRAMES = 90;
const FRAME_WINDOW = 40;

const DEFAULT_BACKGROUND =
  'radial-gradient(120% 120% at 75% 15%, #16213e 0%, #0a0e1a 55%, #070a14 100%)';

function detectRenderMode(): 'webgl2' | 'webgl' | null {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  try {
    if (canvas.getContext('webgl2')) return 'webgl2';
    if (canvas.getContext('webgl') || canvas.getContext('experimental-webgl' as 'webgl')) {
      return 'webgl';
    }
    return null;
  } catch {
    return null;
  }
}

export default function Hero3D({
  particleCount = 900,
  color = '#7c9cff',
  className,
  style,
  onUnsupported,
}: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onUnsupportedRef = useRef(onUnsupported);
  onUnsupportedRef.current = onUnsupported;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (detectRenderMode() === null) {
      onUnsupportedRef.current?.();
      return; // CSS gradient stays as the backdrop
    }

    const reduceMotion = prefersReducedMotion();

    let disposed = false;
    let renderer: THREE.WebGLRenderer | undefined;
    let cleanupInner: (() => void) | undefined;

    container.replaceChildren(); // guard against a stray canvas from a prior mount

    void import('three')
      .then((THREE_NS) => {
        if (disposed || !container) return;

        let tierIndex = TIER_DPR.length - 1; // start high, adapt down if needed

        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;

        const scene = new THREE_NS.Scene();
        const camera = new THREE_NS.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.z = 14;

        renderer = new THREE_NS.WebGLRenderer({ antialias: true, alpha: true });
        renderer.outputColorSpace = THREE_NS.SRGBColorSpace;

        const applyPixelRatio = () => {
          renderer!.setPixelRatio(Math.min(window.devicePixelRatio || 1, TIER_DPR[tierIndex]));
        };
        applyPixelRatio();
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        const geometry = new THREE_NS.SphereGeometry(0.05, 8, 8);
        const material = new THREE_NS.MeshBasicMaterial({ color: new THREE_NS.Color(color) });
        const mesh = new THREE_NS.InstancedMesh(geometry, material, particleCount);
        mesh.instanceMatrix.setUsage(THREE_NS.DynamicDrawUsage);

        // Seed each instance with a stable position and phase.
        const dummy = new THREE_NS.Object3D();
        const seeds = new Float32Array(particleCount * 4);
        for (let i = 0; i < particleCount; i++) {
          const x = (Math.random() - 0.5) * 24;
          const y = (Math.random() - 0.5) * 14;
          const z = (Math.random() - 0.5) * 10;
          const phase = Math.random() * Math.PI * 2;
          seeds.set([x, y, z, phase], i * 4);
          dummy.position.set(x, y, z);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
        scene.add(mesh);

        const clock = new THREE_NS.Clock();

        const renderFrame = () => {
          const t = clock.getElapsedTime();
          for (let i = 0; i < particleCount; i++) {
            const base = i * 4;
            dummy.position.set(
              seeds[base] + Math.sin(t * 0.2 + seeds[base + 3]) * 0.4,
              seeds[base + 1] + Math.cos(t * 0.18 + seeds[base + 3]) * 0.4,
              seeds[base + 2],
            );
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
          }
          mesh.instanceMatrix.needsUpdate = true;
          mesh.rotation.y = t * 0.03;
          renderer!.render(scene, camera);
        };

        // ----- adaptive-quality sampling -------------------------------------
        const durations: number[] = [];
        let cooldown = 0;
        let lastTs = (typeof performance !== 'undefined' ? performance : Date).now();

        const sampleAndAdapt = () => {
          const now = (typeof performance !== 'undefined' ? performance : Date).now();
          durations.push(now - lastTs);
          lastTs = now;
          if (cooldown > 0) cooldown--;
          if (durations.length < FRAME_WINDOW) return;

          const meanMs = durations.reduce((a, b) => a + b, 0) / durations.length;
          durations.length = 0;
          const fps = meanMs > 0 ? 1000 / meanMs : 0;
          if (cooldown > 0 || fps <= 0) return;

          if (fps <= DOWNGRADE_FPS && tierIndex > 0) {
            tierIndex--;
            applyPixelRatio();
            cooldown = COOLDOWN_FRAMES;
          } else if (fps >= UPGRADE_FPS && tierIndex < TIER_DPR.length - 1) {
            tierIndex++;
            applyPixelRatio();
            cooldown = COOLDOWN_FRAMES;
          }
        };

        const loop = () => {
          sampleAndAdapt();
          renderFrame();
        };

        // ----- run / pause plumbing ------------------------------------------
        let running = false;
        let onScreen = true;
        let pageVisible = typeof document === 'undefined' ? true : !document.hidden;

        const start = () => {
          // Reduced motion is a hard gate: the loop must never start, no matter
          // what scroll (IntersectionObserver) or tab visibility (visibilitychange)
          // reports. Those handlers funnel through syncRunState() → start(), so
          // gating here keeps reduced motion a single static frame.
          if (running || !renderer || reduceMotion) return;
          running = true;
          lastTs = (typeof performance !== 'undefined' ? performance : Date).now();
          renderer.setAnimationLoop(loop);
        };
        const stop = () => {
          if (!running || !renderer) return;
          running = false;
          renderer.setAnimationLoop(null);
        };
        const syncRunState = () => {
          if (onScreen && pageVisible) start();
          else stop();
        };

        const onResize = () => {
          if (!renderer || !container) return;
          const w = container.clientWidth || window.innerWidth;
          const h = container.clientHeight || window.innerHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
          renderFrame();
        };
        window.addEventListener('resize', onResize);

        const onVisibility = () => {
          pageVisible = !document.hidden;
          syncRunState();
        };
        document.addEventListener('visibilitychange', onVisibility);

        const observer = new IntersectionObserver(
          (entries) => {
            onScreen = entries.some((e) => e.isIntersecting);
            syncRunState();
          },
          { threshold: 0 },
        );
        observer.observe(container);

        const onContextLost = (event: Event) => {
          event.preventDefault();
          stop();
          onUnsupportedRef.current?.();
        };
        renderer.domElement.addEventListener('webglcontextlost', onContextLost);

        if (reduceMotion) {
          renderFrame(); // one static frame, no loop
        } else {
          syncRunState();
        }

        cleanupInner = () => {
          stop();
          observer.disconnect();
          window.removeEventListener('resize', onResize);
          document.removeEventListener('visibilitychange', onVisibility);
          renderer?.domElement.removeEventListener('webglcontextlost', onContextLost);
          geometry.dispose();
          material.dispose();
          mesh.dispose();
        };
      })
      .catch((err: unknown) => {
        console.error('Hero3D failed to initialise:', err);
        onUnsupportedRef.current?.();
      });

    return () => {
      disposed = true;
      cleanupInner?.();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
        renderer = undefined;
      }
    };
    // Runs once per mount; props are captured above and the callback is read via
    // a ref so changing it never forces a WebGL re-init.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        // CSS fallback that is also the reduced-motion / no-WebGL backdrop.
        background: DEFAULT_BACKGROUND,
        ...style,
      }}
    />
  );
}

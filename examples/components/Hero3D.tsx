'use client';

/**
 * Hero3D.tsx — an agency hero backdrop built on Three.js r160.
 *
 * A slowly drifting field of instanced particles that reads as "signal" behind
 * the headline. It is deliberately subtle: this is a backdrop, not the subject.
 *
 * Accessibility & performance:
 *  - Honours `prefers-reduced-motion`: when set, it renders a single static
 *    frame and never starts the animation loop.
 *  - Caps the device pixel ratio, uses InstancedMesh (one draw call), and
 *    disposes every GPU resource on unmount.
 *  - The canvas is aria-hidden; all meaning lives in the sibling HTML.
 *
 * Intended usage: mount behind the hero copy with `next/dynamic(..., { ssr:false })`.
 */

import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 900;

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let renderer: import('three').WebGLRenderer | undefined;
    let animationId = 0;
    let disposed = false;
    let onResize: (() => void) | undefined;
    let cleanupInner: (() => void) | undefined;

    import('three')
      .then((THREE) => {
        if (disposed || !container) return;

        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.z = 14;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        container.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(0.05, 8, 8);
        const material = new THREE.MeshBasicMaterial({ color: '#7c9cff' });
        const mesh = new THREE.InstancedMesh(geometry, material, PARTICLE_COUNT);
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

        // Seed each instance with a stable random position and phase.
        const dummy = new THREE.Object3D();
        const seeds = new Float32Array(PARTICLE_COUNT * 4);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
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

        const clock = new THREE.Clock();

        const renderFrame = () => {
          const t = clock.getElapsedTime();
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const base = i * 4;
            const x = seeds[base];
            const y = seeds[base + 1];
            const z = seeds[base + 2];
            const phase = seeds[base + 3];
            dummy.position.set(
              x + Math.sin(t * 0.2 + phase) * 0.4,
              y + Math.cos(t * 0.18 + phase) * 0.4,
              z
            );
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
          }
          mesh.instanceMatrix.needsUpdate = true;
          mesh.rotation.y = t * 0.03;
          renderer!.render(scene, camera);
        };

        const animate = () => {
          animationId = requestAnimationFrame(animate);
          renderFrame();
        };

        onResize = () => {
          if (!container || !renderer) return;
          const w = container.clientWidth || window.innerWidth;
          const h = container.clientHeight || window.innerHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
          renderFrame();
        };
        window.addEventListener('resize', onResize);

        if (prefersReducedMotion) {
          renderFrame(); // one static frame, no loop
        } else {
          animate();
        }

        cleanupInner = () => {
          if (animationId) cancelAnimationFrame(animationId);
          if (onResize) window.removeEventListener('resize', onResize);
          geometry.dispose();
          material.dispose();
          mesh.dispose();
        };
      })
      .catch((err) => {
        // No WebGL → the CSS gradient behind this component stays visible.
        console.error('Hero3D failed to initialise:', err);
      });

    return () => {
      disposed = true;
      cleanupInner?.();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        // CSS fallback that is also the reduced-motion / no-WebGL backdrop.
        background:
          'radial-gradient(120% 120% at 75% 15%, #16213e 0%, #0a0e1a 55%, #070a14 100%)',
      }}
    />
  );
}

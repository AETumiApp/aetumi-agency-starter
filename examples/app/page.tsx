/**
 * page.tsx — Agency landing (Server Component).
 *
 * A tasteful, luxury-grade studio landing: hero, services, selected work and a
 * contact CTA. Semantic landmarks, real copy (no lorem), keyboard-reachable
 * links. The only client code is the 3D hero backdrop, loaded with
 * `next/dynamic({ ssr: false })`; its CSS gradient is the fallback, so this file
 * stays a pure Server Component. Search-and-replace "Northlight" to rebrand —
 * see the README checklist.
 */

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('../components/Hero3D'), { ssr: false });

// --- Brand tokens (single source of truth for the palette) -------------------
const ACCENT = '#7c9cff';
const INK = '#0a0e1a';
const PAPER = '#f7f8fb';
const LINE = '#e6e8ef';
const MUTED = '#414958';

export const metadata: Metadata = {
  title: 'Northlight — 3D & interactive web studio',
  description:
    'Northlight is a senior studio crafting fast, interactive 3D websites with Three.js, WebGL and Next.js — product launches, brand worlds and configurators that stay under budget on a mid-range phone.',
  applicationName: 'Northlight',
  keywords: ['3D web', 'Three.js', 'WebGL', 'Next.js', 'creative studio', 'product launch', 'configurator'],
  openGraph: {
    title: 'Northlight — 3D & interactive web studio',
    description:
      'A senior studio building fast, interactive 3D websites with Three.js, WebGL and Next.js.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Northlight — 3D & interactive web studio',
    description: 'Fast, interactive 3D websites with Three.js, WebGL and Next.js.',
  },
};

const services = [
  {
    title: 'Launch sites',
    body:
      'Scroll-driven product and brand launches with real-time 3D, tuned to hit their performance budget on a mid-range phone — not just a workstation GPU.',
  },
  {
    title: 'Product configurators',
    body:
      'Interactive viewers that let a customer rotate, recolour and compare a product in the browser, wired to your catalogue and priced live.',
  },
  {
    title: 'WebGL & shader work',
    body:
      'Bespoke materials, particle systems and post-processing when an off-the-shelf look will not do — always with a graceful fallback where WebGL is absent.',
  },
  {
    title: 'Performance rescue',
    body:
      'You have a heavy 3D site that stutters. We profile it, cut draw calls and payload, add fallbacks, and bring it back under its Core Web Vitals budget.',
  },
];

const work = [
  {
    client: 'Halo Audio',
    kind: 'Product launch',
    result: 'A configurable 3D flagship page that lifted add-to-cart by 34%.',
  },
  {
    client: 'Meridian Watches',
    kind: 'Configurator',
    result: 'Real-time case, dial and strap builder — 12k+ combinations, one draw path.',
  },
  {
    client: 'Atlas Ventures',
    kind: 'Brand world',
    result: 'A scroll-scored brand film in WebGL that holds 60fps on a three-year-old phone.',
  },
];

const stats = [
  { value: '60fps', label: 'target on mid-range mobile' },
  { value: '<2.5s', label: 'LCP on 4G, every project' },
  { value: '100%', label: 'graceful WebGL fallbacks' },
];

export default function Page() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* HERO */}
      <header
        aria-labelledby="hero-title"
        style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', background: INK }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Hero3D />
        </div>

        <nav
          aria-label="Primary"
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '72rem',
            margin: '0 auto',
            padding: '1.5rem',
            color: '#eef2fb',
          }}
        >
          <span style={{ fontWeight: 700, letterSpacing: '0.06em', fontSize: '1.05rem' }}>
            NORTHLIGHT
          </span>
          <ul style={{ display: 'flex', gap: '1.75rem', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</a></li>
            <li><a href="#work" style={{ color: 'inherit', textDecoration: 'none' }}>Work</a></li>
            <li><a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a></li>
          </ul>
        </nav>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '52rem',
            margin: '0 auto',
            padding: 'clamp(4rem, 12vh, 9rem) 1.5rem',
            color: '#eef2fb',
          }}
        >
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.16em', fontSize: '0.8rem', opacity: 0.75 }}>
            3D &amp; interactive web studio
          </p>
          <h1
            id="hero-title"
            style={{
              fontSize: 'clamp(2.6rem, 7.5vw, 5rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              margin: '0.6rem 0 1.2rem',
              fontWeight: 600,
            }}
          >
            Websites that move,
            <br />
            and still load fast.
          </h1>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.65, maxWidth: '36rem', opacity: 0.92 }}>
            We build real-time 3D experiences with Three.js and Next.js — the kind
            that feel alive without costing you your Core Web Vitals. A small
            studio, senior hands, shipped on schedule.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.25rem', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              style={{
                background: ACCENT,
                color: INK,
                padding: '0.9rem 1.8rem',
                borderRadius: '0.6rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Start a project
            </a>
            <a
              href="#work"
              style={{
                border: '1px solid rgba(238,242,251,0.4)',
                color: '#eef2fb',
                padding: '0.9rem 1.8rem',
                borderRadius: '0.6rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              See selected work
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* STATS band */}
        <section aria-label="Studio benchmarks" style={{ background: INK, color: '#eef2fb' }}>
          <ul
            style={{
              listStyle: 'none',
              margin: '0 auto',
              maxWidth: '72rem',
              padding: '0 1.5rem 4rem',
              display: 'grid',
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
            }}
          >
            {stats.map((s) => (
              <li key={s.label} style={{ borderTop: '1px solid rgba(238,242,251,0.18)', paddingTop: '1.25rem' }}>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                  {s.value}
                </div>
                <div style={{ opacity: 0.7, marginTop: '0.35rem' }}>{s.label}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          aria-labelledby="services-title"
          style={{ background: PAPER, color: INK }}
        >
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '5.5rem 1.5rem' }}>
            <h2 id="services-title" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>
              What we build
            </h2>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'grid',
                gap: '1.25rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
              }}
            >
              {services.map((s) => (
                <li
                  key={s.title}
                  style={{
                    border: `1px solid ${LINE}`,
                    borderRadius: '0.9rem',
                    padding: '1.75rem',
                    background: '#fff',
                  }}
                >
                  <h3 style={{ margin: '0 0 0.6rem', fontSize: '1.25rem' }}>{s.title}</h3>
                  <p style={{ margin: 0, lineHeight: 1.65, color: MUTED }}>{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section
          id="work"
          aria-labelledby="work-title"
          style={{ background: '#fff', color: INK }}
        >
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '5.5rem 1.5rem' }}>
            <h2 id="work-title" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>
              Selected work
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '1rem' }}>
              {work.map((w) => (
                <li
                  key={w.client}
                  style={{
                    display: 'grid',
                    gap: '0.35rem 1.5rem',
                    gridTemplateColumns: 'minmax(0, 1fr)',
                    alignItems: 'baseline',
                    padding: '1.5rem 0',
                    borderTop: `1px solid ${LINE}`,
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.35rem', fontWeight: 600 }}>{w.client}</span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: ACCENT,
                        fontWeight: 700,
                      }}
                    >
                      {w.kind}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: MUTED, lineHeight: 1.6, maxWidth: '46rem' }}>{w.result}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          style={{ background: INK, color: '#eef2fb', padding: '6rem 1.5rem' }}
        >
          <div style={{ maxWidth: '42rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 id="contact-title" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Have something in mind?
            </h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.65, opacity: 0.9, marginBottom: '2rem' }}>
              Tell us the product, the deadline and the budget. We reply within two
              business days with a scope and a fixed quote.
            </p>
            <a
              href="mailto:hello@northlight.studio"
              style={{
                display: 'inline-block',
                background: ACCENT,
                color: INK,
                padding: '0.95rem 2.1rem',
                borderRadius: '0.6rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              hello@northlight.studio
            </a>
          </div>
        </section>
      </main>

      <footer
        style={{
          background: INK,
          color: '#8b93a7',
          fontSize: '0.9rem',
          borderTop: '1px solid rgba(238,242,251,0.1)',
        }}
      >
        <div
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            padding: '2rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <p style={{ margin: 0 }}>© {year} Northlight Studio.</p>
          <p style={{ margin: 0 }}>Built with Next.js and Three.js.</p>
        </div>
      </footer>
    </>
  );
}

/**
 * page.tsx — Agency landing (Server Component).
 *
 * Semantic, accessible, crawlable HTML with a client-only 3D hero backdrop.
 * All copy is real and rebrand-ready — search-and-replace "Northlight" and the
 * services to make it yours. See README for the rebrand checklist.
 */

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('../components/Hero3D'), { ssr: false });

export const metadata: Metadata = {
  title: 'Northlight — 3D & interactive web studio',
  description:
    'Northlight is a small studio building fast, interactive 3D websites with Three.js, WebGL and Next.js. We ship product launches, brand sites and configurators.',
  openGraph: {
    title: 'Northlight — 3D & interactive web studio',
    description:
      'We build fast, interactive 3D websites with Three.js, WebGL and Next.js.',
    type: 'website',
  },
};

const services = [
  {
    title: 'Launch sites',
    body:
      'Scroll-driven product and brand launches with real-time 3D, tuned to hit their performance budget on a mid-range phone, not just a desktop GPU.',
  },
  {
    title: 'Product configurators',
    body:
      'Interactive viewers that let customers rotate, recolour and compare a product in the browser, wired to your catalogue and priced in real time.',
  },
  {
    title: 'WebGL & shader work',
    body:
      'Custom materials, particle systems and post-processing when an off-the-shelf look is not enough — built to degrade gracefully where WebGL is not available.',
  },
  {
    title: 'Performance rescue',
    body:
      'You already have a heavy 3D site that stutters. We profile it, cut draw calls and payload, add fallbacks, and get it back under budget.',
  },
];

export default function Page() {
  return (
    <>
      {/* HERO */}
      <header
        aria-labelledby="hero-title"
        style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden' }}
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
          <span style={{ fontWeight: 700, letterSpacing: '0.02em' }}>Northlight</span>
          <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            <li><a href="#services" style={{ color: 'inherit' }}>Services</a></li>
            <li><a href="#contact" style={{ color: 'inherit' }}>Contact</a></li>
          </ul>
        </nav>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '48rem',
            margin: '0 auto',
            padding: 'clamp(4rem, 12vh, 9rem) 1.5rem',
            color: '#eef2fb',
          }}
        >
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: '0.8rem', opacity: 0.75 }}>
            3D &amp; interactive web studio
          </p>
          <h1 id="hero-title" style={{ fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', lineHeight: 1.03, margin: '0.6rem 0 1.2rem' }}>
            Websites that move, and still load fast
          </h1>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.6, maxWidth: '34rem', opacity: 0.92 }}>
            We build real-time 3D experiences with Three.js and Next.js — the kind
            that feel alive without costing you your Core Web Vitals. Small team,
            senior hands, shipped on schedule.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              style={{
                background: '#7c9cff',
                color: '#0a0e1a',
                padding: '0.85rem 1.6rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Start a project
            </a>
            <a
              href="#services"
              style={{
                border: '1px solid rgba(238,242,251,0.4)',
                color: '#eef2fb',
                padding: '0.85rem 1.6rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              See what we do
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* SERVICES */}
        <section
          id="services"
          aria-labelledby="services-title"
          style={{ maxWidth: '72rem', margin: '0 auto', padding: '5rem 1.5rem' }}
        >
          <h2 id="services-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '2.5rem' }}>
            What we build
          </h2>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gap: '1.25rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
            }}
          >
            {services.map((s) => (
              <li
                key={s.title}
                style={{
                  border: '1px solid #e6e8ef',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  background: '#fff',
                }}
              >
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>{s.title}</h3>
                <p style={{ margin: 0, lineHeight: 1.6, color: '#414958' }}>{s.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          style={{
            background: '#0a0e1a',
            color: '#eef2fb',
            padding: '5rem 1.5rem',
          }}
        >
          <div style={{ maxWidth: '40rem', margin: '0 auto', textAlign: 'center' }}>
            <h2 id="contact-title" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', marginBottom: '1rem' }}>
              Have something in mind?
            </h2>
            <p style={{ fontSize: '1.15rem', lineHeight: 1.6, opacity: 0.9, marginBottom: '2rem' }}>
              Tell us the product, the deadline and the budget. We reply within two
              business days with a scope and a fixed quote.
            </p>
            <a
              href="mailto:hello@northlight.studio"
              style={{
                display: 'inline-block',
                background: '#7c9cff',
                color: '#0a0e1a',
                padding: '0.9rem 2rem',
                borderRadius: '0.5rem',
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
          maxWidth: '72rem',
          margin: '0 auto',
          padding: '2rem 1.5rem',
          color: '#6b7280',
          fontSize: '0.9rem',
        }}
      >
        <p>© {new Date().getFullYear()} Northlight Studio. Built with Next.js and Three.js.</p>
      </footer>
    </>
  );
}

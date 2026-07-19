'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import ContactForm from './form/contactform';

/* ─── Intersection Observer hook for scroll-driven reveals ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ─── Reveal wrapper component ─── */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      {children}
    </div>
  );
}

/* ─── Main Contact Component ─── */
export default function Contact() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFormHovered, setIsFormHovered] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const updateRect = useCallback(() => {
    if (formRef.current) {
      rectRef.current = formRef.current.getBoundingClientRect();
    }
  }, []);

  useEffect(() => {
    if (isFormHovered) {
      updateRect();
      window.addEventListener('resize', updateRect);
      window.addEventListener('scroll', updateRect, true);
    }
    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [isFormHovered, updateRect]);

  const handleFormMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;
    setMousePos({
      x: e.clientX - rectRef.current.left,
      y: e.clientY - rectRef.current.top,
    });
  };

  return (
    <section
      id="contacts"
      className="relative z-10 w-full min-h-screen text-white font-sans overflow-hidden"
    >
      {/* ── Ambient corner glows ── */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #00C9A7 0%, transparent 70%)',
        }}
      />

      {/* ── Subtle grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #6C63FF 1px, transparent 1px), linear-gradient(to bottom, #6C63FF 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem',
        }}
      />

      {/* ── Content ── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* ── Header ── */}
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00C9A7]/70">
              Get In Touch
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
              Let&apos;s Connect
            </h2>
            <p className="mt-4 text-base text-white/40 max-w-lg mx-auto leading-relaxed">
              Have a project in mind or just want to say hello? Feel free to
              reach out.
            </p>
          </div>
        </Reveal>

        {/* ── Center Layout for Form ── */}
        <div className="flex justify-center">
          <Reveal delay={200} className="w-full max-w-2xl">
            <div
              ref={formRef}
              className="contact-form-card"
              onMouseMove={handleFormMouseMove}
              onMouseEnter={() => {
                updateRect();
                setIsFormHovered(true);
              }}
              onMouseLeave={() => setIsFormHovered(false)}
            >
              {/* Spotlight glow */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
                style={{
                  opacity: isFormHovered ? 1 : 0,
                  background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, rgba(108, 99, 255, 0.06), transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Scoped Styles ── */}
      <style jsx>{`
        /* ── Form card ── */
        .contact-form-card {
          position: relative;
          background: rgba(13, 13, 13, 0.6);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 1.5rem;
          padding: 2rem;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .contact-form-card {
            padding: 2.5rem;
          }
        }

        .contact-form-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(108, 99, 255, 0.1),
            transparent 50%,
            rgba(0, 201, 167, 0.1)
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* ── Input styles ── */
        :global(.contact-input) {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 18px 16px 8px;
          font-size: 14px;
          color: #ffffff;
          outline: none;
          transition: all 300ms ease;
          font-family: inherit;
        }

        :global(.contact-input:focus) {
          border-color: #00c9a7;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: none;
        }

        :global(.contact-textarea) {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 18px 16px 8px;
          font-size: 14px;
          color: #ffffff;
          outline: none;
          transition: all 300ms ease;
          resize: none;
          font-family: inherit;
        }

        :global(.contact-textarea:focus) {
          border-color: #00c9a7;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: none;
        }

        /* ── Floating label ── */
        :global(.contact-label) {
          position: absolute;
          top: 50%;
          left: 16px;
          transform: translateY(-50%);
          font-size: 14px;
          color: rgba(255, 255, 255, 0.3);
          pointer-events: none;
          transition: all 250ms ease;
        }

        :global(.contact-textarea ~ .contact-label) {
          top: 18px;
          transform: none;
        }

        :global(.contact-label-active),
        :global(.contact-input:focus ~ .contact-label),
        :global(.contact-input:not(:placeholder-shown) ~ .contact-label),
        :global(.contact-textarea:focus ~ .contact-label),
        :global(.contact-textarea:not(:placeholder-shown) ~ .contact-label) {
          top: 6px;
          transform: none;
          font-size: 10px;
          color: #00c9a7;
          font-weight: 600;
        }

        /* ── Send button (semi-transparent black) ── */
        :global(.contact-send-btn) {
          position: relative;
          width: 100%;
          padding: 16px 32px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.04);
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #ffffff;
          background: rgba(0, 0, 0, 0.55);
          cursor: pointer;
          overflow: hidden;
          transition: all 200ms ease;
        }

        :global(.contact-send-btn::before) {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.02);
          opacity: 0;
          transition: opacity 200ms ease;
        }

        :global(.contact-send-btn:hover::before) {
          opacity: 0.06;
        }

        :global(.contact-send-btn:hover) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(2, 6, 23, 0.28);
        }

        :global(.contact-send-btn:active) {
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}

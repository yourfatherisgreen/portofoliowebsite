'use client';

import { useRef, useState, useEffect } from 'react';
import {
  GraduationCap,
  Code2,
  Palette,
  Workflow,
} from 'lucide-react';
import ContactForm from './form/contactform';
import {
  GitHubActivityBentoContent,
  type GitHubSnapshotClient,
} from './GitHubActivityBento';

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

/* ─── BentoItem ─── */
function BentoItem({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`bento-item ${className}`}>
      {children}
    </div>
  );
}

/* ─── Services Data ─── */
const SERVICES = [
  {
    icon: GraduationCap,
    title: 'Assignment Helper',
    description:
      'Academic guidance and assignment assistance to help you excel in your studies.',
  },
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'Modern, responsive websites built with cutting-edge technologies and frameworks.',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Beautiful, intuitive interfaces crafted with attention to detail and user experience.',
  },
  {
    icon: Workflow,
    title: 'Business Automation',
    description:
      'Streamline your operations with smart automation solutions that save time.',
  },
] as const;

/* ─── Main Contact Bento Grid ─── */
export default function Contact({
  githubSnapshot,
}: {
  githubSnapshot: GitHubSnapshotClient;
}) {

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
          <div className="text-center mb-12">
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

        {/* ═══ BENTO GRID ═══ */}
        <div className="bento-wrapper rounded-[28px] border border-white/[0.085] bg-[#0a0b0b]/80 shadow-[0_32px_100px_rgba(0,0,0,0.35)] p-3 sm:p-4 lg:p-5">
          <div className="flex flex-col gap-3 sm:gap-4">
          {/* ── TOP ROW: Services ── */}
          <Reveal delay={100}>
            <BentoItem className="!p-6 sm:!p-8">
              <div className="relative z-10">
                 <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  Services
                </h3>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00C9A7]/60 mb-4">
                  I can help with
                </p>
               

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {SERVICES.map((service) => (
                    <div
                      key={service.title}
                      className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 transition-all duration-300 hover:bg-white/[0.05] hover:border-[#00C9A7]/20"
                    >
                      <div className="flex size-10 items-center justify-center rounded-xl border border-[#00c9a7]/15 bg-[#00c9a7]/[0.07] text-[#00c9a7] mb-3 transition-all duration-300 group-hover:bg-[#00c9a7]/[0.12] group-hover:border-[#00c9a7]/25">
                        <service.icon size={20} />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5">
                        {service.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs leading-relaxed text-white/35">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </BentoItem>
          </Reveal>

          {/* ── BOTTOM ROW: GitHub (left) + Contact (right) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* ── GitHub Activity ── */}
            <Reveal delay={200}>
              <BentoItem className="h-full">
                <div className="relative z-10 h-full">
                  <GitHubActivityBentoContent snapshot={githubSnapshot} />
                </div>
              </BentoItem>
            </Reveal>

            {/* ── Contact Form ── */}
            <Reveal delay={300}>
              <BentoItem className="h-full">
                <div className="relative z-10 h-full">
                  <ContactForm />
                </div>
              </BentoItem>
            </Reveal>
          </div>
        </div>
        </div>
      </div>

      {/* ── Scoped Styles ── */}
      <style jsx>{`
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

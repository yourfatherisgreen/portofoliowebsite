'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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
function Reveal({
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

/* ─── Timeline Item ─── */
function TimelineItem({
  title,
  subtitle,
  period,
  description,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  period: string;
  description?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="relative pl-8 pb-8 border-l border-white/10 last:pb-0 group">
        {/* Timeline dot */}
        <div className="absolute left-0 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-[#00C9A7] ring-4 ring-[#6C63FF]/20 group-hover:ring-[#6C63FF]/40 transition-all duration-300" />

        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00C9A7]/80">
          {period}
        </span>
        <h3 className="mt-1 text-lg font-bold text-white tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-white/50 font-medium mt-0.5">{subtitle}</p>
        )}
        {description && (
          <p className="mt-2 text-sm text-white/60 leading-relaxed font-light">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}

/* ─── Badge component ─── */
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
      {children}
    </span>
  );
}

/* ─── Tech badge ─── */
function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#00C9A7] hover:bg-[#6C63FF]/20 hover:border-[#6C63FF]/30 transition-all duration-300 cursor-default">
      {name}
    </span>
  );
}

/* ─── Stat card ─── */
function StatCard({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="relative group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-500 overflow-hidden">
        {/* Glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <p className="text-3xl font-black text-white tracking-tighter">
            {value}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            {label}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Main About Me Component ─── */
export default function AboutMe() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSidebarVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="about-section"
      className="relative z-10 w-full min-h-screen text-white font-sans"
    >
      {/* ── Subtle grid pattern overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #6C63FF 1px, transparent 1px), linear-gradient(to bottom, #6C63FF 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem',
        }}
      />

      {/* ── Container ── */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-0">
        {/* Mobile-only header */}
        <div className="block text-center mb-10 md:hidden">
          <span className="text-xs  font-semibold uppercase tracking-[0.3em] text-[#00C9A7]/70">
            About Me
          </span>
          <h1 className="mt-2  text-4xl font-black text-white tracking-tighter">
            Who I Am
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          <aside
            className={`w-full md:w-[33%] lg:w-[30%] flex-shrink-0 md:sticky md:top-0 md:h-screen transition-all duration-700 ease-out ${
              sidebarVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative h-full flex flex-col items-center md:items-start md:justify-start gap-5 p-6 md:pt-24 md:pb-16 md:px-0">
              {/* Glassmorphism card on mobile */}
              <div className="absolute inset-0 md:hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]" />

              {/* Profile Photo */}
              <div className="relative group z-10 w-44 sm:w-52 md:w-56 lg:w-60 mx-auto md:mx-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#6C63FF]/30 to-[#6C63FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative w-full aspect-square rounded-full overflow-hidden border-2 border-white/10 bg-white/5">
                  <Image
                    src="/fotoabout.jpg"
                    alt="Muhammad Azmi Rahman Nasution"
                    width={600}
                    height={800}
                    className="object-cover w-full h-full"
                    priority
                    loading = "eager"
                  />
                </div>
              </div>

              {/* Name & Location */}
              <div className="relative z-10 text-center md:text-left">
                <h1 className="text-xl lg:text-2xl font-black text-white tracking-tighter leading-tight">
                  Muhammad Azmi
                  <br />
                  <span>Rahman Nasution</span>
                </h1>

                <div className="mt-2 flex items-center justify-center md:justify-start gap-2 text-white/50">
                  {/* Location pin icon */}
                  <svg
                    className="w-3.5 h-3.5 text-[#00C9A7]/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Medan, Indonesia</span>
                </div>
              </div>

              {/* Divider */}

              {/* Quick status */}
              <div className="relative z-10 flex items-center gap-2 text-sm text-white/40">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-medium">Available for opportunities</span>
              </div>
              <a
                href="https://drive.google.com/file/d/1yobhkDUUjBUdFdPerqGI7o6dDr1-I_4W/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-xl bg-white/10 backdrop-blur-3xl rounded-2xl text-white font-semibold inline-flex items-center justify-center p-1 px-5 hover:bg-white/20 transition-all duration-300 ease-in-out border border-white/30"
              >
                View CV
              </a>
            </div>
          </aside>

          {/* ═══════════════ RIGHT COLUMN — SCROLLABLE CONTENT ═══════════════ */}
          <div className="flex-1 md:py-20 space-y-16 lg:space-y-20">
            {/* ── INTRODUCTION ── */}
            <div>
              <Reveal>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00C9A7]">
                  Introduction
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[1.1]">
                  Building digital
                  <br />
                  experiences that{' '}
                  <span className="text-[#00C9A7]">matter</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed font-light max-w-2xl">
                  HI, My name is{' '}
                  <strong className="text-white/90 font-semibold">
                    Muhammad Azmi Rahman Nasution
                  </strong>{' '}
                  Management Informatics student currently focusing on{' '}
                  <span className="text-white/90 font-medium">
                    Web Development
                  </span>
                  . My mission is to build efficient software that functions
                  well and delivers a pleasing{' '}
                  <span className="text-white/90 font-medium">UI/UX</span>{' '}
                  experience. I work with modern tech stacks to bring ideas to
                  life.
                </p>
              </Reveal>
            </div>

            {/* ── STATS ROW ── */}
            <div className="grid grid-cols-2 sm:grid-rows-3 gap-4">
              <StatCard value="3.80" label="Current GPA" delay={0} />
              <StatCard
                value="2nd"
                label="Web Design Competition"
                delay={100}
              />
              <StatCard value="1+" label="Years Coding" delay={200} />
            </div>

            {/* ── EDUCATION ── */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#00C9A7]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00C9A7]/70">
                      Education
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Academic Journey
                    </h2>
                  </div>
                </div>
              </Reveal>

              <div className="ml-5">
                <TimelineItem
                  period="2022 – 2025"
                  title="SMA Negeri 2 Medan"
                  subtitle="Senior High School"
                  delay={100}
                />
                <TimelineItem
                  period="Since 2025"
                  title="Politeknik Negeri Medan"
                  subtitle="Management Informatics"
                  description="Currently pursuing a diploma in Management Informatics with a focus on web development and software engineering."
                  delay={200}
                />
              </div>
            </div>

            {/* ── CAREER & ACHIEVEMENTS ── */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[#00C9A7]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00C9A7]/70">
                      Career & Achievements
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Experience
                    </h2>
                  </div>
                </div>
              </Reveal>

              <div className="ml-5">
                <TimelineItem
                  period="Since July 2025"
                  title="English Tutor"
                  subtitle="Sainsin"
                  description="Teaching and tutoring English language skills, helping students build confidence in communication."
                  delay={100}
                />
                <TimelineItem
                  period="Achievement"
                  title="2nd Place — Web Design Competition"
                  subtitle="Management Informatics Student Competition"
                  description="Recognized for excellence in web design among Management Informatics students."
                  delay={200}
                />
              </div>
            </div>

            {/* ── Bottom spacer for scroll feel ── */}
            <div className="h-8 md:h-16" />
          </div>
        </div>
      </div>
    </section>
  );
}

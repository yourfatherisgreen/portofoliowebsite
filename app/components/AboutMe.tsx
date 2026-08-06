'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaLocationDot, FaGraduationCap, FaAward } from 'react-icons/fa6';

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
          <p className="text-sm text-white/80 font-medium mt-0.5">{subtitle}</p>
        )}
        {description && (
          <p className="mt-2 text-sm text-white/80 leading-relaxed font-light">
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
            Introduction
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
                <div className="relative w-full aspect-square rounded-full overflow-hidden border-2 border-white/10 bg-white/5 ">
                  <Image
                    src="/fotoabout.webp"
                    alt="Muhammad Azmi Rahman Nasution"
                    width={600}
                    height={800}
                    className="object-cover object-[65%_center] w-full h-full"
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
                  <FaLocationDot className="w-3.5 h-3.5 text-[#00C9A7]/60" />
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
                 Integrating technology 
                  <br />
                  To create {' '}
                  <span className="text-[#00C9A7]">Impact</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 text-base sm:text-lg text-white/90 leading-relaxed font-light max-w-2xl">
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
                  experience. I work with modern tech stacks to bring ideas 
                  life.
                </p>
                <p className="mt-6 text-base sm:text-lg text-white/90 leading-relaxed font-light max-w-2xl">
                  I am open to collaboration opportunities, freelance projects, and internships. I am interested in contributing to meaningful products that solve real-world problems and create value for users and my clients. If you have a project, idea, or opportunity in mind, feel free to contact me,I would be happy to discuss how we can work together and create impactful solutions.
                </p>
              </Reveal>
            </div>

            {/* ── STATS ROW ── */}
            

            {/* ── EDUCATION ── */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 flex items-center justify-center">
                    <FaGraduationCap className="w-5 h-5 text-[#00C9A7]" />
                  </div>
                  <div>
                    
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Education
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
                  period="2025 - 2026"
                  title="Politeknik Negeri Medan"
                  subtitle="Informatics Management Diploma"
                  description="Completing a year of a diploma in Informatics Management with a focus on web development and software engineering."
                  delay={200}
                />
                <TimelineItem
                  period="2026 – now"
                  title="Universitas Sumatera Utara"
                  subtitle = "Information Technology Bachelor's Degree"
                  description= "Starting over for a bigger opportunity to pursue a Bachelor's degree in Information Technology, focusing on advanced web development and software engineering."
                  delay={300}
                />
                
              </div>
            </div>

            {/* ── CAREER & ACHIEVEMENTS ── */}
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 flex items-center justify-center">
                    <FaAward className="w-5 h-5 text-[#00C9A7]" />
                  </div>
                  <div>
                    
                    <h2 className="text-xl font-bold text-white tracking-tight">
                      Carreer & Achievements
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

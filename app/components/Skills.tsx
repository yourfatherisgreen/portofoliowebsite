'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  SiCss,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiLaravel,
  SiPhp,
  SiFirebase,
  SiMysql,
  SiSupabase,
  SiDocker,
  SiPython,
  SiCplusplus,
  SiFigma,
  SiCanva,
  SiCoreldraw,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiRedux,
  SiSass,
  SiBootstrap,
  SiGit,
  SiVercel,
  SiLinux,
  SiPostman,
  SiNpm,
  SiFlutter,
  SiDart,
  SiKotlin,
  SiGo,
} from 'react-icons/si';
import { RiJavaLine } from 'react-icons/ri';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { flushSync } from 'react-dom';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

/* ───────────────────────── Types ───────────────────────── */

interface Skill {
  name: string;
  icon: React.ReactNode;
  brandColor: string; // hex color for tinting & icon
  categories: string[]; // which filter tabs include this skill
}

/* ───────────────────────── Data ───────────────────────── */

const ICON_SIZE = 28;

const ALL_SKILLS: Skill[] = [
  // ── Main / Programming Languages ──
  {
    name: 'HTML',
    icon: <SiHtml5 size={ICON_SIZE} />,
    brandColor: '#E34F26',
    categories: ['Main', 'Frontend'],
  },
  {
    name: 'CSS',
    icon: <SiCss size={ICON_SIZE} />,
    brandColor: '#1572B6',
    categories: ['Main', 'Frontend'],
  },
  {
    name: 'JavaScript',
    icon: <SiJavascript size={ICON_SIZE} />,
    brandColor: '#F7DF1E',
    categories: ['Main', 'Frontend'],
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript size={ICON_SIZE} />,
    brandColor: '#3178C6',
    categories: ['Main', 'Frontend'],
  },
  {
    name: 'Python',
    icon: <SiPython size={ICON_SIZE} />,
    brandColor: '#3776AB',
    categories: ['Main'],
  },
  {
    name: 'PHP',
    icon: <SiPhp size={ICON_SIZE} />,
    brandColor: '#777BB4',
    categories: ['Main', 'Backend'],
  },
  {
    name: 'Java',
    icon: <RiJavaLine size={ICON_SIZE} />,
    brandColor: '#ED8B00',
    categories: ['Main'],
  },
  {
    name: 'C++',
    icon: <SiCplusplus size={ICON_SIZE} />,
    brandColor: '#00599C',
    categories: ['Main'],
  },

  // ── Frontend Frameworks ──
  {
    name: 'React',
    icon: <SiReact size={ICON_SIZE} />,
    brandColor: '#61DAFB',
    categories: ['Frontend'],
  },
  {
    name: 'Next.js',
    icon: <SiNextdotjs size={ICON_SIZE} />,
    brandColor: '#FFFFFF',
    categories: ['Frontend'],
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss size={ICON_SIZE} />,
    brandColor: '#06B6D4',
    categories: ['Frontend'],
  },
  {
    name: 'Vite',
    icon: <SiVite size={ICON_SIZE} />,
    brandColor: '#646CFF',
    categories: ['Frontend'],
  },
  {
    name: 'Bootstrap',
    icon: <SiBootstrap size={ICON_SIZE} />,
    brandColor: '#7952B3',
    categories: ['Frontend'],
  },

  // ── Backend ──

  {
    name: 'Laravel',
    icon: <SiLaravel size={ICON_SIZE} />,
    brandColor: '#FF2D20',
    categories: ['Backend'],
  },

  // ── Database ──
  {
    name: 'MySQL',
    icon: <SiMysql size={ICON_SIZE} />,
    brandColor: '#4479A1',
    categories: ['Database'],
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql size={ICON_SIZE} />,
    brandColor: '#4169E1',
    categories: ['Database'],
  },
  {
    name: 'Firebase',
    icon: <SiFirebase size={ICON_SIZE} />,
    brandColor: '#FFCA28',
    categories: ['Database'],
  },
  {
    name: 'Supabase',
    icon: <SiSupabase size={ICON_SIZE} />,
    brandColor: '#3ECF8E',
    categories: ['Database'],
  },

  // ── Tools ──
  {
    name: 'Git',
    icon: <SiGit size={ICON_SIZE} />,
    brandColor: '#F05032',
    categories: ['Tools'],
  },
  {
    name: 'GitHub',
    icon: <SiGithub size={ICON_SIZE} />,
    brandColor: '#FFFFFF',
    categories: ['Tools'],
  },
  {
    name: 'Docker',
    icon: <SiDocker size={ICON_SIZE} />,
    brandColor: '#2496ED',
    categories: ['Tools'],
  },
  {
    name: 'Vercel',
    icon: <SiVercel size={ICON_SIZE} />,
    brandColor: '#FFFFFF',
    categories: ['Tools'],
  },
  {
    name: 'Linux',
    icon: <SiLinux size={ICON_SIZE} />,
    brandColor: '#FCC624',
    categories: ['Tools'],
  },
  {
    name: 'npm',
    icon: <SiNpm size={ICON_SIZE} />,
    brandColor: '#CB3837',
    categories: ['Tools'],
  },
  {
    name: 'Figma',
    icon: <SiFigma size={ICON_SIZE} />,
    brandColor: '#F24E1E',
    categories: ['Tools'],
  },
  {
    name: 'Canva',
    icon: <SiCanva size={ICON_SIZE} />,
    brandColor: '#00C4CC',
    categories: ['Tools'],
  },
  {
    name: 'CorelDRAW',
    icon: <SiCoreldraw size={ICON_SIZE} />,
    brandColor: '#72BF44',
    categories: ['Tools'],
  },
];

const FILTER_TABS = [
  'All',
  'Main',
  'Frontend',
  'Backend',
  'Database',
  'Tools',
] as const;

/* ───────────────────────── Hooks ───────────────────────── */

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ───────────────────────── Skill Capsule ───────────────────────── */

function SkillCapsule({ skill }: { skill: Skill }) {
  const capsuleRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!capsuleRef.current) return;
    const rect = capsuleRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={capsuleRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-default w-full rounded-full overflow-hidden flex items-center bg-white/[0.02] border border-white/[0.05] transition-all duration-300"
    >
      {/* ── Brand-color tint ── */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${skill.brandColor}${isHovered ? '20' : '05'}, transparent 80%)`,
        }}
      />

      {/* ── Spotlight glow following mouse ── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(150px circle at ${mousePos.x}px ${mousePos.y}px, ${skill.brandColor}15, transparent 50%)`,
        }}
      />

      {/* ── Hover border glow ── */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500 pointer-events-none"
        style={{
          boxShadow: isHovered
            ? `inset 0 0 0 1px ${skill.brandColor}30, 0 0 15px ${skill.brandColor}10`
            : 'inset 0 0 0 1px rgba(255,255,255,0.02)',
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative z-10 flex flex-row items-center justify-start w-full px-4 py-2 sm:px-5 sm:py-2.5 transition-transform duration-500 ease-out"
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <div
          className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3 sm:mr-4 transition-all duration-500 flex-shrink-0"
          style={{
            color: skill.brandColor,
            background: `${skill.brandColor}10`,
            boxShadow: isHovered ? `0 0 20px ${skill.brandColor}20` : 'none',
          }}
        >
          {React.cloneElement(
            skill.icon as React.ReactElement,
            { size: 20 } as any,
          )}
        </div>
        <span className="text-[11px] sm:text-sm font-semibold text-white/70 group-hover:text-white transition-colors duration-300 truncate">
          {skill.name}
        </span>
      </div>
    </div>
  );
}

/* ───────────────────────── Main Skills Component ───────────────────────── */

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;

    if (containerRef.current) {
      const state = Flip.getState('.skill-capsule');

      flushSync(() => {
        setActiveTab(tab);
      });

      Flip.from(state, {
        duration: 0.5,
        ease: 'power3.out',
        absolute: true,
        scale: true,
        stagger: 0.02,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0.5, duration: 0.3 }),
      });
    } else {
      setActiveTab(tab);
    }
  };

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { All: ALL_SKILLS.length };
    FILTER_TABS.forEach((tab) => {
      if (tab !== 'All') {
        counts[tab] = ALL_SKILLS.filter((s) =>
          s.categories.includes(tab),
        ).length;
      }
    });
    return counts;
  }, []);

  return (
    <section className="relative z-10 w-full min-h-screen text-white font-sans overflow-hidden">
      {/* ── Ambient corner glows ── */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #6C63FF 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #00C9A7 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #F7DF1E 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-[350px] h-[350px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #61DAFB 0%, transparent 70%)',
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
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* ── Header ── */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00C9A7]/70">
            What I Work With
          </span>
          <h2 className="mt-3 text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Skills
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/40 font-light">
            My professional skills.
          </p>
        </div>

        {/* ── Filter Pills ── */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-black border border-white/[0.06] backdrop-blur-md z-20 relative">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`
                  px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide
                  transition-all duration-300 ease-out whitespace-nowrap
                  ${
                    activeTab === tab
                      ? 'bg-[#00C9A7] text-black shadow-[0_0_20px_rgba(0,201,167,0.3)]'
                      : 'text-white/50 hover:text-black hover:bg-white'
                  }
                `}
              >
                {tab}
                <span
                  className={`ml-1.5 text-[10px] sm:text-xs ${activeTab === tab ? 'text-black' : 'text-white/30'}`}
                >
                  {tabCounts[tab]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Skills Grid ── */}
        <div
          ref={containerRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5"
        >
          {ALL_SKILLS.map((skill, i) => {
            const isVisible =
              activeTab === 'All' || skill.categories.includes(activeTab);
            return (
              <div
                key={skill.name}
                className={`skill-capsule ${isVisible ? 'block' : 'hidden'}`}
              >
                <SkillCapsule skill={skill} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CSS for floating animation ── */}
      <style jsx>{`
        @keyframes skillFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .skill-card-float {
          animation: skillFloat 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

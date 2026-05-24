'use client';
import {
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiLaravel,
  SiMysql,
  SiVercel,
  SiCss,
} from 'react-icons/si';
import { FaExternalLinkAlt } from 'react-icons/fa';
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { flushSync } from 'react-dom';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

export interface ProjectCardProps {
  name: string;
  description: string;
  tools: { icon: React.ReactNode; label: string }[];
  releaseDate: string;
  thumbnail: string;
}

const BRAND_COLORS: Record<string, string> = {
  Laravel: '#FF2D20',
  HTML5: '#E34F26',
  TailwindCSS: '#06B6D4',
  MySQL: '#4479A1',
  JavaScript: '#F7DF1E',
  Vite: '#646CFF',
  React: '#61DAFB',
  'Next.js': '#FFFFFF',
  Vercel: '#FFFFFF',
  TypeScript: '#3178C6',
  CSS: '#1572B6',
};

const FILTER_TABS = ['All', 'Website', 'UI/UX', 'Graphic Design'] as const;

export function ProjectCard({
  name,
  description,
  tools,
  releaseDate,
  thumbnail,
}: ProjectCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const zone2Ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zone2Ref.current) return;
    const rect = zone2Ref.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Zone 1 — Thumbnail Section (top ~55% of card height) */}
      <div className="zone1-thumbnail">
        <img src={thumbnail} alt={name} className="thumbnail-image" />
        <div className="image-overlay" />

        {/* Decorative Chrome Overlay with Dots & Live Demo Button */}
        <div className="card-chrome">
          <div className="live-demo-button">
            <span>Live Demo</span>
            <FaExternalLinkAlt size={8} className="external-icon" />
          </div>
        </div>
      </div>

      {/* Zone 2 — Info Section (bottom ~45% of card height) */}
      <div ref={zone2Ref} className="zone2-info" onMouseMove={handleMouseMove}>
        <div
          className="spotlight-overlay"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 180px at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.07), transparent 70%)`,
          }}
        />

        <div className="info-content">
          <h3 className="project-name">{name}</h3>
          <p className="project-description">{description}</p>
          <div className="info-spacer" />
          <div className="bottom-row">
            <div className="tools-row">
              {tools.slice(0, 4).map((tool, idx) => {
                const color = BRAND_COLORS[tool.label] || '#cccccc';
                return (
                  <div
                    key={idx}
                    className="tool-chip"
                    title={tool.label}
                    style={{
                      color: color,
                      borderColor: `${color}25`,
                      backgroundColor: `${color}0c`,
                    }}
                  >
                    {tool.icon}
                  </div>
                );
              })}
            </div>
            <span className="release-date">{releaseDate}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .project-card {
          width: 380px;
          height: 285px; /* 4:3 Aspect Ratio */
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          background: #0d0d0d;
          transition: transform 300ms ease;
          cursor: pointer;
          position: relative;
          user-select: none;
        }

        .project-card:hover {
          transform: translateY(-4px);
        }

        .zone1-thumbnail {
          flex: 0 0 55%;
          height: 55%;
          position: relative;
          overflow: hidden;
        }

        .thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, #0d0d0d 100%);
          pointer-events: none;
        }

        .card-chrome {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 5;
          pointer-events: none;
        }

        .chrome-dots {
          position: absolute;
          top: 12px;
          left: 12px;
          display: flex;
          gap: 5px;
        }

        .chrome-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .live-demo-button {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 200ms ease;
        }

        .project-card:hover .live-demo-button {
          background: #00c9a7;
          border-color: #00c9a7;
          color: #000000;
          box-shadow: 0 0 12px rgba(0, 201, 167, 0.4);
        }

        :global(.external-icon) {
          margin-bottom: 1px;
        }

        .zone2-info {
          flex: 0 0 45%;
          height: 45%;
          position: relative;
          overflow: hidden;
          background-color: #0d0d0d;
          padding: 16px 20px 14px;
          display: flex;
          flex-direction: column;
        }

        .spotlight-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          transition: opacity 300ms ease;
        }

        .info-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .project-name {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-description {
          font-size: 12px;
          color: #888888;
          line-height: 1.45;
          margin: 4px 0 0 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .info-spacer {
          flex-grow: 1;
          min-height: 8px;
        }

        .bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tools-row {
          display: flex;
          gap: 6px;
          overflow: hidden;
        }

        .tool-chip {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          border: 1px solid transparent;
          flex-shrink: 0;
          font-size: 14px;
          transition: transform 200ms ease;
        }

        .tool-chip:hover {
          transform: scale(1.1);
        }

        .release-date {
          font-size: 11px;
          color: #888888;
          margin: 0;
        }

        @media (max-width: 440px) {
          .project-card {
            width: 100%;
            height: auto;
            aspect-ratio: 4 / 3;
          }
        }
      `}</style>
    </div>
  );
}

const PROJECT_LIST = [
  {
    name: 'MI Techno Design',
    description:
      'Website I made for Informatics Management student association profile',
    tools: [
      { icon: <SiLaravel />, label: 'Laravel' },
      { icon: <SiHtml5 />, label: 'HTML5' },
      { icon: <SiTailwindcss />, label: 'TailwindCSS' },
      { icon: <SiMysql />, label: 'MySQL' },
    ],
    releaseDate: 'November 2025',
    thumbnail: '/mi-techno.png',
    link: 'https://github.com/yourfatherisgreen/backup-new-mi-techno',
    category: 'Website',
  },
  {
    name: 'Nefflix Clone',
    description:
      'A simple website I made for my girlfriend to keep our memories in a diffrent way',
    tools: [
      { icon: <SiHtml5 />, label: 'HTML5' },
      { icon: <SiTailwindcss />, label: 'TailwindCSS' },
      { icon: <SiJavascript />, label: 'JavaScript' },
    ],
    releaseDate: 'February 2025',
    thumbnail: '/netflix-clone.png',
    link: 'https://epictosmomentos.vercel.app/',
    category: 'Website',
  },
  {
    name: 'INHALE STORE',
    description: 'Marketplace project i made to learn about react js ',
    tools: [
      { icon: <SiVite />, label: 'Vite' },
      { icon: <SiReact />, label: 'React' },
      { icon: <SiNextdotjs />, label: 'Next.js' },
      { icon: <SiJavascript />, label: 'JavaScript' },
      { icon: <SiTailwindcss />, label: 'TailwindCSS' },
      { icon: <SiVercel />, label: 'Vercel' },
    ],
    releaseDate: 'March 2026',
    thumbnail: '/inhale-store.png',
    link: 'https://inhalestore.vercel.app/',
    category: 'Website',
  },
  {
    name: 'Portofolio website',
    description:
      'This portofolio website that i made to experess my creativity and showcase my works',
    tools: [
      { icon: <SiNextdotjs />, label: 'Next.js' },
      { icon: <SiReact />, label: 'React' },
      { icon: <SiTypescript />, label: 'TypeScript' },
      { icon: <SiVercel />, label: 'Vercel' },
      { icon: <SiTailwindcss />, label: 'TailwindCSS' },
    ],
    releaseDate: 'May 2026',
    thumbnail: '/portofolio.png',
    link: 'https://muhammadazmi.my.id',
    category: 'Website',
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;

    if (containerRef.current) {
      const state = Flip.getState('.project-card-wrapper');

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
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)' },
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.3 }),
      });
    } else {
      setActiveTab(tab);
    }
  };

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROJECT_LIST.length };
    FILTER_TABS.forEach((tab) => {
      if (tab !== 'All') {
        counts[tab] = PROJECT_LIST.filter((p) => p.category === tab).length;
      }
    });
    return counts;
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="section-title-wrap">
        <span className="section-subtitle">MY PROJECTS</span>
        <h2 className="section-title">Showcase of My Works</h2>
      </div>

      {/* ── Filter Pills (Exact replica of Skills.tsx styling) ── */}
      <div className="flex justify-center mb-14 z-20 relative">
        <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-black border border-white/[0.06] backdrop-blur-md">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`
                px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide
                transition-all duration-300 ease-out whitespace-nowrap cursor-pointer
                ${
                  activeTab === tab
                    ? 'bg-[#00C9A7] text-black shadow-[0_0_20px_rgba(0,201,167,0.3)]'
                    : 'text-white/50 hover:text-black hover:bg-white'
                }
              `}
            >
              {tab}
              <span
                className={`ml-1.5 text-[10px] sm:text-xs ${
                  activeTab === tab ? 'text-black font-bold' : 'text-white/30'
                }`}
              >
                {tabCounts[tab]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="projects-container">
        {PROJECT_LIST.map((project, index) => {
          const isVisible =
            activeTab === 'All' || project.category === activeTab;
          return (
            <div
              key={index}
              className={`project-card-wrapper ${isVisible ? 'block' : 'hidden'}`}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
              >
                <ProjectCard
                  name={project.name}
                  description={project.description}
                  tools={project.tools}
                  releaseDate={project.releaseDate}
                  thumbnail={project.thumbnail}
                />
              </a>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .projects-section {
          position: relative;
          z-index: 10;
          width: 100%;
          min-height: 100vh;
          background-color: transparent;
          padding: 100px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family:
            var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
        }

        .section-title-wrap {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-subtitle {
          font-size: 12px;
          color: #00c9a7;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-weight: 700;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 800;
          color: #ffffff;
          margin-top: 12px;
          letter-spacing: -0.03em;
        }

        .projects-container {
          max-width: 1200px;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 30px;
          justify-items: center;
        }

        .project-card-wrapper {
          display: block;
        }

        .project-card-wrapper.hidden {
          display: none;
        }

        .project-card-link {
          text-decoration: none;
          display: block;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
          .projects-container {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}

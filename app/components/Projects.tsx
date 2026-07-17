'use client';

import { Flip } from 'gsap/Flip';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import ProjectCard from './projects/ProjectCard';
import ProjectDetailsModal from './projects/ProjectDetailsModal';
import { PROJECT_LIST } from './projects/projectData';
import type { ProjectCardProps } from './projects/types';

export { ProjectCard };
export type { ProjectCardProps };

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

const FILTER_TABS = ['All', 'Web Development', 'UI/UX'] as const;
type FilterTab = (typeof FILTER_TABS)[number];

const TAB_COUNTS = FILTER_TABS.reduce<Record<FilterTab, number>>(
  (counts, tab) => {
    counts[tab] =
      tab === 'All'
        ? PROJECT_LIST.length
        : PROJECT_LIST.filter((project) => project.category === tab).length;
    return counts;
  },
  { All: 0, 'Web Development': 0, 'UI/UX': 0 },
);

function updateProjectUrl(projectId: string | null) {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  if (projectId) {
    url.searchParams.set('project', projectId);
    url.hash = 'projects';
  } else {
    url.searchParams.delete('project');
  }

  window.history.replaceState(
    window.history.state,
    '',
    `${url.pathname}${url.search}${url.hash}`,
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [selectedProject, setSelectedProject] =
    useState<ProjectCardProps | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectProjectFromUrl = () => {
      const projectId = new URL(window.location.href).searchParams.get(
        'project',
      );
      setSelectedProject(
        PROJECT_LIST.find((project) => project.id === projectId) ?? null,
      );
    };

    selectProjectFromUrl();
    window.addEventListener('popstate', selectProjectFromUrl);
    return () => window.removeEventListener('popstate', selectProjectFromUrl);
  }, []);

  const handleTabChange = (tab: FilterTab) => {
    if (tab === activeTab) return;

    if (!containerRef.current) {
      setActiveTab(tab);
      return;
    }

    const cards = containerRef.current.querySelectorAll(
      '.project-card-wrapper',
    );
    const state = Flip.getState(cards);

    flushSync(() => {
      setActiveTab(tab);
    });

    Flip.from(state, {
      duration: 0.5,
      ease: 'power3.out',
      absolute: true,
      scale: true,
      stagger: 0.025,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.15)' },
        ),
      onLeave: (elements) =>
        gsap.to(elements, { opacity: 0, scale: 0.92, duration: 0.25 }),
    });
  };

  const openProject = (project: ProjectCardProps) => {
    setSelectedProject(project);
    updateProjectUrl(project.id);
  };

  const closeProject = () => {
    setSelectedProject(null);
    updateProjectUrl(null);
  };

  const selectedProjectIndex = selectedProject
    ? PROJECT_LIST.findIndex((project) => project.id === selectedProject.id)
    : -1;

  const showNextProject = () => {
    const nextIndex = (selectedProjectIndex + 1) % PROJECT_LIST.length;
    const nextProject = PROJECT_LIST[nextIndex];
    setSelectedProject(nextProject);
    updateProjectUrl(nextProject.id);
  };

  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col items-center px-5 py-24 font-sans sm:px-6 lg:py-28">
      <div className="mb-11 max-w-3xl text-center sm:mb-14">
        <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#00c9a7] sm:text-base">
          My projects
        </span>
        <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-5xl">
          Selected work, built with intent.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
          A closer look at the products, experiments, and interfaces I have
          designed and developed.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Filter projects"
        className="relative z-20 mb-10 inline-flex max-w-full flex-wrap justify-center gap-1.5 rounded-2xl border border-white/[0.07] bg-black/55 p-1.5 shadow-[0_16px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:mb-14"
      >
        {FILTER_TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTabChange(tab)}
              className={`cursor-pointer whitespace-nowrap rounded-xl px-3.5 py-2.5 text-[11px] font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7] sm:px-5 sm:text-sm ${
                isActive
                  ? 'bg-[#00c9a7] text-[#04100e] shadow-[0_0_24px_rgba(0,201,167,0.24)]'
                  : 'text-white/45 hover:bg-white/[0.07] hover:text-white'
              }`}
            >
              {tab}
              <span
                className={`ml-2 text-[9px] tabular-nums sm:text-[10px] ${
                  isActive ? 'text-black/55' : 'text-white/25'
                }`}
              >
                {TAB_COUNTS[tab]}
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={containerRef}
        className="grid w-full max-w-[1200px] grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
      >
        {PROJECT_LIST.map((project) => {
          const isVisible =
            activeTab === 'All' || project.category === activeTab;
          return (
            <div
              key={project.id}
              className={`project-card-wrapper min-w-0 w-full ${
                isVisible ? 'block' : 'hidden'
              }`}
              aria-hidden={!isVisible}
            >
              <ProjectCard
                {...project}
                onOpen={() => openProject(project)}
              />
            </div>
          );
        })}
      </div>

      <ProjectDetailsModal
        key={selectedProject?.id ?? 'closed-project-modal'}
        project={selectedProject}
        projectIndex={Math.max(selectedProjectIndex, 0)}
        projectCount={PROJECT_LIST.length}
        onClose={closeProject}
        onNext={showNextProject}
      />
    </div>
  );
}

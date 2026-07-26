'use client';

import Image from 'next/image';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  FaBehance,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import {
  CiShare1,
}from 'react-icons/ci';

import type { ProjectCardProps } from './types';

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/azmi_nst_?igsh=a3V2N3RyaWtqNTNy',
    icon: <FaInstagram />,
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/',
    icon: <FaBehance />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/yourfatherisgreen',
    icon: <FaGithub />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhammad-azmi-rahman-nasution-0b2b72364',
    icon: <FaLinkedinIn />,
  },
];

interface ProjectDetailsModalProps {
  project: ProjectCardProps | null;
  projectIndex: number;
  projectCount: number;
  onClose: () => void;
  onNext: () => void;
}

export default function ProjectDetailsModal({
  project,
  projectIndex,
  projectCount,
  onClose,
  onNext,
}: ProjectDetailsModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose, project]);

  if (!project || typeof document === 'undefined') return null;

  const images = project.images.length ? project.images : [project.thumbnail];
  const showCarouselControls = images.length > 1;

  const showPreviousImage = () => {
    setActiveImage((current) => (current - 1 + images.length) % images.length);
  };

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % images.length);
  };

  return createPortal(
    <>
      <div
        className="project-modal-backdrop fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-0 backdrop-blur-xl sm:p-3 lg:p-5"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <section
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`project-title-${project.id}`}
          className="project-modal-panel relative h-full w-full max-w-[1500px] overflow-y-auto overscroll-contain rounded-none border-white/10 bg-[#0b0c0c] text-white shadow-[0_40px_140px_rgba(0,0,0,0.75)] sm:rounded-[28px] sm:border"
        >
          <header className="sticky top-0 z-50 flex h-[72px] items-center justify-between border-b border-white/[0.08] bg-[#0b0c0c]/90 px-4 backdrop-blur-2xl sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00c9a7]">
                Case study
              </span>
              <span className="h-4 w-px bg-white/15" />
              <span className="text-[11px] font-medium tabular-nums text-white/55">
                {String(projectIndex + 1).padStart(2, '0')} /{' '}
                {String(projectCount).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onNext}
                className="group flex h-10 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 text-xs font-semibold text-white/85 transition-all hover:border-white/20 hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7]"
              >
                <span className="hidden sm:inline">Next project</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/85 transition-all hover:rotate-3 hover:border-white/25 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7]"
                aria-label="Close project details"
              >
                <X size={17} />
              </button>
            </div>
          </header>

          <div className="grid min-h-[calc(100%_-_72px)] lg:grid-cols-[minmax(0,1.65fr)_minmax(330px,0.75fr)]">
            <div className="min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10">
              <div className="overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#060707] shadow-[0_30px_90px_rgba(0,0,0,0.42)] sm:rounded-[24px]">
                <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]">
                  <div
                    key={`${project.id}-${activeImage}`}
                    className="project-gallery-image absolute inset-0"
                  >
                    <Image
                      src={images[activeImage]}
                      alt={`${project.name} gallery image ${activeImage + 1}`}
                      fill
                      sizes="(max-width: 1023px) 100vw, 68vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />

                  <button
                    type="button"
                    onClick={showPreviousImage}
                    disabled={!showCarouselControls}
                    className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 shadow-xl backdrop-blur-lg transition-all hover:scale-105 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7] disabled:cursor-default disabled:opacity-30 sm:left-5 sm:size-11"
                    aria-label="Show previous project image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    disabled={!showCarouselControls}
                    className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 shadow-xl backdrop-blur-lg transition-all hover:scale-105 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7] disabled:cursor-default disabled:opacity-30 sm:right-5 sm:size-11"
                    aria-label="Show next project image"
                  >
                    <ChevronRight size={18} />
                  </button>

                  <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-black/65 px-3 py-1.5 text-[11px] font-semibold tabular-nums text-white/70 backdrop-blur-lg sm:bottom-5 sm:right-5">
                    {activeImage + 1} / {images.length}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex gap-3 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.15)_transparent] sm:mt-4">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-[16/10] w-[92px] shrink-0 cursor-pointer overflow-hidden rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7] sm:w-[116px] ${
                      activeImage === index
                        ? 'border-[#00c9a7] opacity-100 shadow-[0_0_0_2px_rgba(0,201,167,0.12)]'
                        : 'border-white/10 opacity-45 hover:border-white/30 hover:opacity-80'
                    }`}
                    aria-label={`Show gallery image ${index + 1}`}
                    aria-current={activeImage === index}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="116px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="mx-auto max-w-4xl pb-8 pt-10 sm:pt-14 lg:pb-12">
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#00c9a7]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#00c9a7]">
                    About the project
                  </span>
                </div>
                <div className="space-y-5">
                  {project.fullDescription.split('\n\n').map((paragraph) => (
                    <p
                      key={paragraph}
                    className="text-[15px] leading-7 text-white/75 sm:text-base sm:leading-8"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <aside className="flex min-h-full flex-col border-t border-white/[0.08] bg-[#0e1010] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-9 xl:p-11">
              <div className="lg:sticky lg:top-[116px]">
                <span className="mb-6 inline-flex rounded-full border border-[#00c9a7]/20 bg-[#00c9a7]/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#41ddc2]">
                  {project.category}
                </span>

                <div className="flex items-start justify-between gap-4">
                  <h2
                    id={`project-title-${project.id}`}
                    className="max-w-[85%] font-display text-3xl font-bold leading-[1.08] tracking-[-0.045em] text-white sm:text-4xl lg:text-[2.65rem]"
                  >
                    {project.name}
                  </h2>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#00c9a7] text-[#04100e] transition-all hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1010]"
                    aria-label={`Open ${project.name} live project in a new tab`}
                  >
                    <CiShare1 size={19} strokeWidth={1} />
                  </a>
                </div>

                <p className="mt-5 text-sm leading-6 text-white/70 sm:text-[15px]">
                  {project.description}
                </p>

                <div className="mt-9 divide-y divide-white/[0.07] border-y border-white/[0.07]">
                  <div className="flex items-center gap-4 py-4">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-white/[0.045] text-white/40">
                      <CalendarDays size={16} />
                    </span>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                        Released
                      </p>
                      <p className="mt-1 text-sm font-medium text-white/85">
                        {project.releaseDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 py-4">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-white/[0.045] text-white/40">
                      <FolderOpen size={16} />
                    </span>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                        Discipline
                      </p>
                      <p className="mt-1 text-sm font-medium text-white/85">
                        {project.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                    Project tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.08] bg-black/25 px-3 py-2 text-[11px] font-semibold text-white/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                    Built with
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool.label}
                        className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[11px] font-medium text-white/75 [&>svg]:size-3.5"
                      >
                        {tool.icon}
                        {tool.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-12 border-t border-white/[0.07] pt-7 lg:mt-16">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                    Connect with me
                  </p>
                  <div className="mt-4 flex gap-2.5">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.label}
                        className="flex size-10 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.035] text-sm text-white/70 transition-all hover:-translate-y-1 hover:border-[#00c9a7]/40 hover:bg-[#00c9a7] hover:text-[#04100e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7]"
                        aria-label={`Connect on ${social.label}`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @keyframes project-modal-backdrop-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes project-modal-panel-in {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes project-gallery-image-in {
          from {
            opacity: 0;
            transform: scale(1.015);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .project-modal-backdrop {
          animation: project-modal-backdrop-in 220ms ease-out both;
        }

        .project-modal-panel {
          animation: project-modal-panel-in 420ms cubic-bezier(0.16, 1, 0.3, 1)
            both;
        }

        .project-gallery-image {
          animation: project-gallery-image-in 300ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .project-modal-backdrop,
          .project-modal-panel,
          .project-gallery-image {
            animation: none;
          }
        }
      `}</style>
    </>,
    document.body,
  );
}

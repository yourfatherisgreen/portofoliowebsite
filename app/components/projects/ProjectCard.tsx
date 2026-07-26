'use client';

import Image from 'next/image';
import { ArrowUpRight, Check, Copy, Share2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import type { ProjectCardProps } from './types';

const BRAND_COLORS: Record<string, string> = {
  Firebase: '#FFCA28',
  Figma: '#F24E1E',
  HTML5: '#E34F26',
  JavaScript: '#F7DF1E',
  Laravel: '#FF2D20',
  MySQL: '#4479A1',
  'Next.js': '#FFFFFF',
  React: '#61DAFB',
  'Tailwind CSS': '#06B6D4',
  TypeScript: '#3178C6',
  Vercel: '#FFFFFF',
  Vite: '#646CFF',
};

type CopyStatus = 'idle' | 'copied' | 'error';

type ProjectCardComponentProps = ProjectCardProps & {
  onOpen: () => void;
};

function getProjectUrl(id: string) {
  if (typeof window === 'undefined') {
    return `/?project=${encodeURIComponent(id)}#projects`;
  }

  const url = new URL(window.location.href);
  url.searchParams.set('project', id);
  url.hash = 'projects';
  return url.toString();
}

export default function ProjectCard({
  id,
  name,
  description,
  tools,
  releaseDate,
  thumbnail,
  category,
  tags,
  onOpen,
}: ProjectCardComponentProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const shareRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (!isShareOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        shareRef.current &&
        !shareRef.current.contains(event.target as Node)
      ) {
        setIsShareOpen(false);
        setCopyStatus('idle');
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsShareOpen(false);
        setCopyStatus('idle');
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isShareOpen]);

  useEffect(
    () => () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    },
    [],
  );

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getProjectUrl(id));
      setCopyStatus('copied');
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => {
        setCopyStatus('idle');
        setIsShareOpen(false);
      }, 1600);
    } catch {
      setCopyStatus('error');
    }
  };

  return (
    <article className="h-full flex flex-col  relative w-full overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#0a0b0b] shadow-[0_24px_70px_rgba(0,0,0,0.35)] transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:border-[#00c9a7]/35 hover:shadow-[0_32px_90px_rgba(0,0,0,0.55)]">
      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 z-10 cursor-pointer rounded-[28px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7] focus-visible:ring-inset"
        aria-label={`View details for ${name}`}
      />

      <div className="relative aspect-[16/10] overflow-hidden bg-[#101212]">
        <Image
          src={thumbnail}
          alt={`${name} project preview`}
          fill
          sizes="(max-width: 1023px) calc(100vw - 48px), 580px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_35%,rgba(8,9,9,0.7)_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-inset ring-[#00c9a7]/25 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-black/60 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur-xl sm:left-5 sm:top-5 sm:text-[11px]">
          {category}
        </span>

        <span className="pointer-events-none absolute bottom-5 right-5 z-20 translate-y-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-white/80">
          View case study
        </span>
      </div>

      <div className="relative min-h-[250px] p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="pointer-events-none min-w-0 flex-1 font-display text-[1.35rem] font-bold leading-tight tracking-[-0.03em] text-white sm:text-[1.55rem]">
            {name}
          </h3>

          <div
            className="pointer-events-none relative z-30 flex shrink-0 items-center gap-2"
            ref={shareRef}
          >
            <button
              type="button"
              onClick={() => {
                setIsShareOpen((isOpen) => !isOpen);
                setCopyStatus('idle');
              }}
              className="pointer-events-auto flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-white/75 transition-all duration-200 hover:scale-105 hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7]"
              aria-label={`Share ${name}`}
              aria-expanded={isShareOpen}
              aria-controls={`share-${id}`}
            >
              <Share2 size={16} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={onOpen}
              className="pointer-events-auto relative z-20 flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-white/75 transition-all duration-200 hover:scale-105 hover:border-[#00c9a7]/50 hover:bg-[#00c9a7] hover:text-[#06110f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7]"
              aria-label={`View details for ${name}`}
            >
              <ArrowUpRight size={17} strokeWidth={1.9} />
            </button>

            {isShareOpen && (
              <div
                id={`share-${id}`}
                role="dialog"
                aria-label={`Share ${name}`}
                className="pointer-events-auto absolute right-0 top-12 z-50 w-[230px] origin-top-right animate-in rounded-2xl border border-white/10 bg-[#151717]/95 p-2.5 shadow-[0_24px_60px_rgba(0,0,0,0.65)] backdrop-blur-2xl duration-150 fade-in zoom-in-95"
              >
                <p className="px-2 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">
                  Share This Project
                </p>
                <button
                  type="button"
                  onClick={handleCopyLink}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-left text-sm font-semibold text-white/95 transition-colors hover:border-white/10 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7]"
                >
                  <span
                    className={`flex size-8 items-center justify-center rounded-lg ${
                      copyStatus === 'copied'
                        ? 'bg-[#00c9a7] text-[#06110f]'
                        : 'bg-white/[0.07] text-white/65'
                    }`}
                  >
                    {copyStatus === 'copied' ? (
                      <Check size={15} />
                    ) : (
                      <Copy size={14} />
                    )}
                  </span>
                  <span aria-live="polite">
                    {copyStatus === 'copied'
                      ? 'Link copied'
                      : copyStatus === 'error'
                        ? 'Unable to copy'
                        : 'Copy link'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="pointer-events-none mt-3 line-clamp-2 max-w-[92%] text-sm leading-6 text-white/70">
          {description}
        </p>

        <div className="pointer-events-none mt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[10px] font-semibold tracking-[0.04em] text-white/75 sm:text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pointer-events-none mt-6 flex items-end justify-between gap-4 border-t border-white/[0.07] pt-5">
          <div className="flex min-w-0 flex-wrap gap-2">
            {tools.map((tool) => {
              const color = BRAND_COLORS[tool.label] ?? '#D7DEDC';
              return (
                <span
                  key={tool.label}
                  title={tool.label}
                  className="flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[11px] font-medium [&>svg]:size-3.5"
                  style={{
                    color,
                    borderColor: `${color}24`,
                    backgroundColor: `${color}0d`,
                  }}
                >
                  {tool.icon}
                  <span className="hidden sm:inline webkit-clamp-1">{tool.label}</span>
                </span>
              );
            })}
          </div>
          <span className="shrink-0 pb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/50">
            {releaseDate}
          </span>
        </div>
      </div>
    </article>
  );
}

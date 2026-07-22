'use client';

import type { ReactNode } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Flame,
  Star,
  Users,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

/* ─── Types (duplicated to avoid importing server-only module) ─── */
export interface ContributionDay {
  count: number;
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubSnapshotClient {
  contributions: {
    activeDays: number;
    days: ContributionDay[];
    longestStreak: number;
    total: number;
  } | null;
  profile: {
    followers: number;
    name: string;
    publicRepos: number;
    url: string;
    username: string;
  } | null;
  repositoryStats: {
    forks: number;
    languages: string[];
    stars: number;
  } | null;
}

/* ─── Constants ─── */
const CONTRIBUTION_COLORS = [
  'border-white/[0.055] bg-white/[0.045]',
  'border-[#00c9a7]/15 bg-[#00483e]',
  'border-[#00c9a7]/20 bg-[#007966]',
  'border-[#00c9a7]/25 bg-[#00a98e]',
  'border-[#40f0d0]/35 bg-[#20d9b9]',
] as const;

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
});

/* ─── Helpers ─── */
function buildContributionWeeks(days: ContributionDay[]) {
  if (!days.length) return [];

  const daysByDate = new Map(days.map((day) => [day.date, day]));
  const firstDate = new Date(`${days[0].date}T00:00:00Z`);
  const lastDate = new Date(`${days.at(-1)?.date}T00:00:00Z`);
  const dayCount =
    Math.round((lastDate.getTime() - firstDate.getTime()) / 86_400_000) + 1;
  const weekCount = Math.ceil(dayCount / 7);

  return Array.from({ length: weekCount }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) => {
      const date = new Date(firstDate);
      date.setUTCDate(firstDate.getUTCDate() + weekIndex * 7 + dayIndex);
      return daysByDate.get(date.toISOString().slice(0, 10)) ?? null;
    }),
  );
}

/* ─── Sub-components ─── */
function ContributionCalendar({ days }: { days: ContributionDay[] }) {
  const weeks = buildContributionWeeks(days);

  return (
    <div className="overflow-x-auto pb-2 [scrollbar-color:rgba(255,255,255,0.15)_transparent] [scrollbar-width:thin]">
      <div className="grid min-w-[720px] grid-cols-[24px_minmax(0,1fr)] gap-3">
        <div
          aria-hidden="true"
          className="grid grid-rows-7 gap-[3px] pt-px text-[9px] font-medium text-white/25"
        >
          <span />
          <span className="flex items-center">Mon</span>
          <span />
          <span className="flex items-center">Wed</span>
          <span />
          <span className="flex items-center">Fri</span>
          <span />
        </div>

        <div
          role="grid"
          aria-label="GitHub contributions during the past year"
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, minmax(10px, 1fr))`,
          }}
        >
          {weeks.map((week, weekIndex) => (
            <div
              key={`${week[0]?.date ?? 'week'}-${weekIndex}`}
              role="row"
              className="grid grid-rows-7 gap-[3px]"
            >
              {week.map((day, dayIndex) => {
                if (!day) {
                  return (
                    <span
                      key={`empty-${dayIndex}`}
                      aria-hidden="true"
                      className="aspect-square"
                    />
                  );
                }

                const label = `${day.count} ${
                  day.count === 1 ? 'contribution' : 'contributions'
                } on ${DATE_FORMATTER.format(
                  new Date(`${day.date}T00:00:00Z`),
                )}`;

                return (
                  <span
                    key={day.date}
                    role="gridcell"
                    aria-label={label}
                    title={label}
                    className={`aspect-square rounded-[3px] border transition-transform duration-150 hover:scale-125 hover:ring-1 hover:ring-white/40 ${CONTRIBUTION_COLORS[day.level]}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number | null;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.075] bg-white/[0.025] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <span className="flex size-9 items-center justify-center rounded-xl border border-[#00c9a7]/15 bg-[#00c9a7]/[0.07] text-[#00c9a7] [&>svg]:size-4">
          {icon}
        </span>
        <span className="font-display text-2xl font-bold tabular-nums tracking-[-0.04em] text-white sm:text-3xl">
          {value ?? '—'}
        </span>
      </div>
      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-white/30 sm:text-[11px]">
        {label}
      </p>
    </div>
  );
}

/* ─── Main bento content component ─── */
export function GitHubActivityBentoContent({
  snapshot,
}: {
  snapshot: GitHubSnapshotClient;
}) {
  const { contributions, profile, repositoryStats } = snapshot;
  const hasLiveData = Boolean(profile || contributions || repositoryStats);

  const stats = [
    {
      icon: <CalendarDays />,
      label: 'Contributions',
      value: contributions?.total ?? null,
    },
    {
      icon: <BookOpen />,
      label: 'Repositories',
      value: profile?.publicRepos ?? null,
    },
    {
      icon: <Star />,
      label: 'Stars',
      value: repositoryStats?.stars ?? null,
    },
    {
      icon: <Users />,
      label: 'Followers',
      value: profile?.followers ?? null,
    },
  ];

  return (
    <div className="relative z-10 flex h-full flex-col">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-black">
            <FaGithub size={20} />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-base font-bold text-white sm:text-lg">
              {profile?.name ?? 'Muhammad Azmi'}
            </p>
            <p className="mt-0.5 truncate text-xs font-medium text-white/35">
              @{profile?.username ?? 'yourfatherisgreen'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white/30">
            <span
              className={`size-1.5 rounded-full ${
                hasLiveData
                  ? 'bg-[#00c9a7] shadow-[0_0_12px_#00c9a7]'
                  : 'bg-amber-400'
              }`}
            />
            {hasLiveData ? 'Live' : 'Offline'}
          </span>
          <a
            href={profile?.url ?? 'https://github.com/yourfatherisgreen'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/65 transition-all hover:border-[#00c9a7]/45 hover:bg-[#00c9a7] hover:text-[#04100e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7]"
            aria-label="Open GitHub profile in a new tab"
          >
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-5 grid grid-cols-2 gap-2 lg:gap-3">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Contribution calendar */}
      <div className="mt-4 flex-1 rounded-[18px] border border-white/[0.075] bg-black/25 p-3 sm:p-4">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#00c9a7]">
              Activity
            </p>
            <h3 className="mt-1 font-display text-base font-bold tracking-[-0.03em] text-white sm:text-lg">
              Last 12 months
            </h3>
          </div>

          {contributions && (
            <div className="flex items-center gap-4 text-[10px] text-white/40">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={12} className="text-[#00c9a7]" />
                <strong className="font-semibold text-white/70">
                  {contributions.activeDays}
                </strong>{' '}
                days
              </span>
              <span className="flex items-center gap-1.5">
                <Flame size={12} className="text-[#00c9a7]" />
                <strong className="font-semibold text-white/70">
                  {contributions.longestStreak}
                </strong>{' '}
                streak
              </span>
            </div>
          )}
        </div>

        {contributions ? (
          <>
            <ContributionCalendar days={contributions.days} />
            <div className="mt-3 flex items-center justify-end gap-2 text-[10px] font-medium text-white/25">
              <span>Less</span>
              {CONTRIBUTION_COLORS.map((color, level) => (
                <span
                  key={color}
                  aria-label={`Contribution level ${level}`}
                  className={`size-3 rounded-[3px] border ${color}`}
                />
              ))}
              <span>More</span>
            </div>
          </>
        ) : (
          <div className="flex min-h-24 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 text-center text-xs leading-5 text-white/35">
            Contribution data is temporarily unavailable.
          </div>
        )}
      </div>

      {/* Languages */}
      {repositoryStats && (
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/[0.07] pt-3">
          {repositoryStats.languages.map((language) => (
            <span
              key={language}
              className="rounded-full border border-white/[0.075] bg-white/[0.035] px-2.5 py-1.5 text-[10px] font-semibold tracking-wide text-white/45"
            >
              {language}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

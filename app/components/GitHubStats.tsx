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

import {
  getGitHubSnapshot,
  type ContributionDay,
} from './github/githubData';

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

export function GitHubStatsSkeleton() {
  return (
    <section id="github" className="relative z-10 px-5 py-24 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-[1200px] animate-pulse">
        <div className="mx-auto h-4 w-32 rounded-full bg-[#00c9a7]/15" />
        <div className="mx-auto mt-5 h-10 max-w-lg rounded-xl bg-white/[0.055]" />
        <div className="mt-12 h-[430px] rounded-[28px] border border-white/[0.06] bg-white/[0.025]" />
      </div>
    </section>
  );
}

export default async function GitHubStats() {
  const { contributions, profile, repositoryStats } = await getGitHubSnapshot();
  const hasLiveData = Boolean(profile || contributions || repositoryStats);

  const stats = [
    {
      icon: <CalendarDays />,
      label: 'Contributions · 12 months',
      value: contributions?.total ?? null,
    },
    {
      icon: <BookOpen />,
      label: 'Public repositories',
      value: profile?.publicRepos ?? null,
    },
    {
      icon: <Star />,
      label: 'Stars earned',
      value: repositoryStats?.stars ?? null,
    },
    {
      icon: <Users />,
      label: 'Followers',
      value: profile?.followers ?? null,
    },
  ];

  return (
    <section
      id="github"
      className="relative z-10 overflow-hidden px-5 py-24 sm:px-6 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00c9a7]/[0.045] blur-[130px]" />

      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#00c9a7] sm:text-base">
            Open source activity
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-5xl">
            Building in public, one commit at a time.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
            A live snapshot of my public work and contribution activity on GitHub.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[28px] border border-white/[0.085] bg-[#0a0b0b]/90 shadow-[0_32px_100px_rgba(0,0,0,0.35)] sm:mt-14">
          <div className="flex flex-col gap-5 border-b border-white/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7 lg:px-8">
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-black">
                <FaGithub size={24} />
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-bold text-white sm:text-xl">
                  {profile?.name ?? 'Muhammad Azmi'}
                </p>
                <p className="mt-0.5 truncate text-xs font-medium text-white/35 sm:text-sm">
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
                {hasLiveData ? 'Live data' : 'Temporarily unavailable'}
              </span>
              <a
                href={profile?.url ?? 'https://github.com/yourfatherisgreen'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/65 transition-all hover:border-[#00c9a7]/45 hover:bg-[#00c9a7] hover:text-[#04100e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9a7]"
                aria-label="Open GitHub profile in a new tab"
              >
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          <div className="p-5 sm:p-7 lg:p-8">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>

            <div className="mt-5 rounded-[22px] border border-white/[0.075] bg-black/25 p-4 sm:mt-6 sm:p-6">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#00c9a7]">
                    Contribution activity
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-[-0.03em] text-white sm:text-2xl">
                    The last 12 months
                  </h3>
                </div>

                {contributions && (
                  <div className="flex items-center gap-5 text-xs text-white/40">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={14} className="text-[#00c9a7]" />
                      <strong className="font-semibold text-white/70">
                        {contributions.activeDays}
                      </strong>{' '}
                      active days
                    </span>
                    <span className="flex items-center gap-2">
                      <Flame size={14} className="text-[#00c9a7]" />
                      <strong className="font-semibold text-white/70">
                        {contributions.longestStreak}
                      </strong>{' '}
                      day streak
                    </span>
                  </div>
                )}
              </div>

              {contributions ? (
                <>
                  <ContributionCalendar days={contributions.days} />
                  <div className="mt-4 flex items-center justify-end gap-2 text-[10px] font-medium text-white/25">
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
                <div className="flex min-h-36 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center text-sm leading-6 text-white/35">
                  Contribution data is temporarily unavailable. The rest of the
                  portfolio remains available while GitHub reconnects.
                </div>
              )}
            </div>

            {repositoryStats && (
              <div className="mt-5 flex flex-col gap-4 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {repositoryStats.languages.map((language) => (
                    <span
                      key={language}
                      className="rounded-full border border-white/[0.075] bg-white/[0.035] px-3 py-2 text-[10px] font-semibold tracking-wide text-white/45 sm:text-[11px]"
                    >
                      {language}
                    </span>
                  ))}
                </div>
                <p className="shrink-0 text-[10px] font-medium uppercase tracking-[0.14em] text-white/25">
                  {repositoryStats.forks} repository forks
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

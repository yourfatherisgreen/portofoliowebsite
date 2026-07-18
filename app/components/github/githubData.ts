import 'server-only';

const GITHUB_USERNAME = 'yourfatherisgreen';
const REVALIDATE_SECONDS = 60 * 60 * 6;

const API_HEADERS: HeadersInit = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'muhammad-azmi-portfolio',
  'X-GitHub-Api-Version': '2022-11-28',
};

interface GitHubProfileResponse {
  login: string;
  name: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
}

interface GitHubRepositoryResponse {
  fork: boolean;
  forks_count: number;
  language: string | null;
  stargazers_count: number;
}

export interface ContributionDay {
  count: number;
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionSummary {
  activeDays: number;
  days: ContributionDay[];
  longestStreak: number;
  total: number;
}

export interface GitHubSnapshot {
  contributions: ContributionSummary | null;
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

function getApiHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN?.trim();

  return token
    ? { ...API_HEADERS, Authorization: `Bearer ${token}` }
    : API_HEADERS;
}

async function fetchGitHubJson<T>(path: string): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: getApiHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function parseContributionDays(html: string): ContributionDay[] {
  const countsByCellId = new Map<string, number>();
  const tooltipPattern =
    /<tool-tip(?=[^>]*\bfor="([^"]+)")[^>]*>\s*(No|[\d,]+) contributions? on [^<]+<\/tool-tip>/gi;

  for (const match of html.matchAll(tooltipPattern)) {
    countsByCellId.set(
      match[1],
      match[2].toLowerCase() === 'no'
        ? 0
        : Number.parseInt(match[2].replaceAll(',', ''), 10),
    );
  }

  const days: ContributionDay[] = [];
  const cellPattern =
    /<td(?=[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})")(?=[^>]*\bid="([^"]+)")(?=[^>]*\bdata-level="([0-4])")[^>]*>/gi;

  for (const match of html.matchAll(cellPattern)) {
    days.push({
      count: countsByCellId.get(match[2]) ?? 0,
      date: match[1],
      level: Number.parseInt(match[3], 10) as ContributionDay['level'],
    });
  }

  return days.sort((a, b) => a.date.localeCompare(b.date));
}

function getLongestStreak(days: ContributionDay[]): number {
  let current = 0;
  let longest = 0;

  for (const day of days) {
    if (day.count > 0) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 0;
    }
  }

  return longest;
}

async function fetchContributions(): Promise<ContributionSummary> {
  const response = await fetch(
    `https://github.com/users/${GITHUB_USERNAME}/contributions`,
    {
      headers: {
        Accept: 'text/html',
        'User-Agent': 'muhammad-azmi-portfolio',
      },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8_000),
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub contributions returned ${response.status}`);
  }

  const html = await response.text();
  const days = parseContributionDays(html);

  if (!days.length) {
    throw new Error('GitHub contribution calendar was empty');
  }

  const displayedTotal = html.match(
    /id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s+contributions?/i,
  );
  const calculatedTotal = days.reduce((total, day) => total + day.count, 0);

  return {
    activeDays: days.filter((day) => day.count > 0).length,
    days,
    longestStreak: getLongestStreak(days),
    total: displayedTotal
      ? Number.parseInt(displayedTotal[1].replaceAll(',', ''), 10)
      : calculatedTotal,
  };
}

function summarizeRepositories(repositories: GitHubRepositoryResponse[]) {
  const ownedRepositories = repositories.filter((repository) => !repository.fork);
  const languageCounts = new Map<string, number>();

  for (const repository of ownedRepositories) {
    if (!repository.language) continue;
    languageCounts.set(
      repository.language,
      (languageCounts.get(repository.language) ?? 0) + 1,
    );
  }

  return {
    forks: ownedRepositories.reduce(
      (total, repository) => total + repository.forks_count,
      0,
    ),
    languages: [...languageCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([language]) => language),
    stars: ownedRepositories.reduce(
      (total, repository) => total + repository.stargazers_count,
      0,
    ),
  };
}

export async function getGitHubSnapshot(): Promise<GitHubSnapshot> {
  const [profileResult, repositoriesResult, contributionsResult] =
    await Promise.allSettled([
      fetchGitHubJson<GitHubProfileResponse>(`/users/${GITHUB_USERNAME}`),
      fetchGitHubJson<GitHubRepositoryResponse[]>(
        `/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      ),
      fetchContributions(),
    ]);

  return {
    contributions:
      contributionsResult.status === 'fulfilled'
        ? contributionsResult.value
        : null,
    profile:
      profileResult.status === 'fulfilled'
        ? {
            followers: profileResult.value.followers,
            name: profileResult.value.name ?? profileResult.value.login,
            publicRepos: profileResult.value.public_repos,
            url: profileResult.value.html_url,
            username: profileResult.value.login,
          }
        : null,
    repositoryStats:
      repositoriesResult.status === 'fulfilled'
        ? summarizeRepositories(repositoriesResult.value)
        : null,
  };
}

import type { Metadata } from "next";

import ProjectsList, { type Project } from "@/components/ProjectsList";
import { getCopy, getLocaleFromSearchParams } from "@/lib/i18n";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const locale = getLocaleFromSearchParams(searchParams);
  const copy = getCopy(locale);

  return {
    title: copy.nav.projects,
    description: copy.projects.lead,
    openGraph: {
      title: `${copy.name} | ${copy.nav.projects}`,
      description: copy.projects.lead,
    },
  };
}

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
};

const USERS = ["rebecanonato89", "Devs-IO"];

async function fetchRepos(user: string) {
  const response = await fetch(
    `https://api.github.com/users/${user}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    return [] as Repo[];
  }

  return (await response.json()) as Repo[];
}

function mapRepo(repo: Repo): Project {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    language: repo.language,
    url: repo.html_url,
  };
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const locale = getLocaleFromSearchParams(searchParams);
  const copy = getCopy(locale);

  const repos = await Promise.all(USERS.map((user) => fetchRepos(user)));
  const projects = repos.flat().map(mapRepo);
  const languages = Array.from(
    new Set(projects.map((project) => project.language).filter(Boolean))
  ).sort();

  return (
    <section className="flex flex-col gap-8">
      <header>
        <h1 className="section-title">{copy.projects.title}</h1>
        <p className="section-lead max-w-2xl">{copy.projects.lead}</p>
      </header>
      <ProjectsList
        projects={projects}
        languages={languages as string[]}
        filterLabel={copy.projects.filterLabel}
        allLabel={copy.projects.allLanguages}
        emptyLabel={copy.projects.empty}
        noDescription={copy.projects.noDescription}
        noLanguage={copy.projects.noLanguage}
      />
    </section>
  );
}

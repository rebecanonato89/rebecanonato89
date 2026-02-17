"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

export type Project = {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  url: string;
};

type ProjectsListProps = {
  projects: Project[];
  languages: string[];
  filterLabel: string;
  allLabel: string;
  emptyLabel: string;
  noDescription: string;
  noLanguage: string;
};

export default function ProjectsList({
  projects,
  languages,
  filterLabel,
  allLabel,
  emptyLabel,
  noDescription,
  noLanguage,
}: ProjectsListProps) {
  const [language, setLanguage] = useState("all");

  const filtered = useMemo(() => {
    if (language === "all") return projects;
    return projects.filter((project) => project.language === language);
  }, [language, projects]);

  return (
    <div className="flex flex-col gap-6">
      <div className="surface flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <label className="text-sm text-base-300" htmlFor="language-filter">
          {filterLabel}
        </label>
        <div className="flex flex-wrap gap-2">
          <select
            id="language-filter"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="h-11 rounded-md border border-base-600 bg-base-800 px-3 text-sm text-base-100 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-base-900"
          >
            <option value="all">{allLabel}</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setLanguage("all")}
          >
            {allLabel}
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="surface p-6 text-base text-base-300">{emptyLabel}</div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((project) => (
            <article key={project.id} className="surface p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-base-100">
                    <a
                      href={project.url}
                      className="hover:text-accent-500"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-base-300">
                    {project.description ?? noDescription}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-base-400">
                  {project.language ?? noLanguage}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

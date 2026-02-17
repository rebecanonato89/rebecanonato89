"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { getCopy, normalizeLocale } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const searchParams = useSearchParams();
  const locale = normalizeLocale(searchParams?.get("lang"));
  const copy = getCopy(locale);

  return (
    <header className="border-b border-base-800 bg-base-900/90 backdrop-blur">
      <div className="container-grid flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <Link href={`/?lang=${locale}`} className="text-lg font-semibold">
            {copy.name}
          </Link>
          <span className="text-sm text-base-400">{copy.tagline}</span>
        </div>
        <nav
          aria-label={copy.a11y.primaryNav}
          className="flex flex-wrap gap-4 text-sm"
        >
          <Link href={`/?lang=${locale}`} className="hover:text-accent-500">
            {copy.nav.home}
          </Link>
          <Link
            href={`/services?lang=${locale}`}
            className="hover:text-accent-500"
          >
            {copy.nav.services}
          </Link>
          <Link
            href={`/projects?lang=${locale}`}
            className="hover:text-accent-500"
          >
            {copy.nav.projects}
          </Link>
          <Link
            href={`/about?lang=${locale}`}
            className="hover:text-accent-500"
          >
            {copy.nav.about}
          </Link>
          <Link
            href={`/contact?lang=${locale}`}
            className="hover:text-accent-500"
          >
            {copy.nav.contact}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle labels={copy.ui.language} />
          <ThemeToggle labels={copy.ui.theme} />
        </div>
      </div>
    </header>
  );
}

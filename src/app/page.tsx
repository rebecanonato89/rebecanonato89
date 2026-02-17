import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
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
    title: copy.nav.home,
    description: copy.home.lead,
    openGraph: {
      title: `${copy.name} | ${copy.nav.home}`,
      description: copy.home.lead,
    },
  };
}

export default function HomePage({ searchParams }: PageProps) {
  const locale = getLocaleFromSearchParams(searchParams);
  const copy = getCopy(locale);

  return (
    <section className="flex flex-col gap-10">
      <div className="surface p-8 md:p-12">
        <p className="text-sm uppercase tracking-[0.2em] text-base-400">
          {copy.tagline}
        </p>
        <h1 className="mt-5 text-3xl font-semibold md:text-5xl">
          {copy.home.headline}
        </h1>
        <p className="section-lead max-w-2xl">{copy.home.lead}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={`/services?lang=${locale}`}>{copy.nav.services}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/projects?lang=${locale}`}>{copy.nav.projects}</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {copy.home.highlights.map((item) => (
          <div key={item} className="surface p-6">
            <p className="text-base text-base-200">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

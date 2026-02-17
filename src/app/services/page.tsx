import type { Metadata } from "next";

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
    title: copy.nav.services,
    description: copy.services.lead,
    openGraph: {
      title: `${copy.name} | ${copy.nav.services}`,
      description: copy.services.lead,
    },
  };
}

export default function ServicesPage({ searchParams }: PageProps) {
  const locale = getLocaleFromSearchParams(searchParams);
  const copy = getCopy(locale);

  return (
    <section className="flex flex-col gap-8">
      <header>
        <h1 className="section-title">{copy.services.title}</h1>
        <p className="section-lead max-w-2xl">{copy.services.lead}</p>
      </header>
      <div className="grid gap-4">
        {copy.services.items.map((service) => (
          <div key={service} className="surface p-6">
            <p className="text-base text-base-200">{service}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

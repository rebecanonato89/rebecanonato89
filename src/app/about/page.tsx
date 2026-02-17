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
    title: copy.nav.about,
    description: copy.about.lead,
    openGraph: {
      title: `${copy.name} | ${copy.nav.about}`,
      description: copy.about.lead,
    },
  };
}

export default function AboutPage({ searchParams }: PageProps) {
  const locale = getLocaleFromSearchParams(searchParams);
  const copy = getCopy(locale);

  return (
    <section className="flex flex-col gap-8">
      <header>
        <h1 className="section-title">{copy.about.title}</h1>
        <p className="section-lead max-w-2xl">{copy.about.lead}</p>
      </header>
      <div className="surface space-y-4 p-6">
        {copy.about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-base text-base-200">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="surface p-6">
        <h2 className="text-lg font-semibold text-base-100">
          {copy.about.focusTitle}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-base-200">
          {copy.about.focusItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

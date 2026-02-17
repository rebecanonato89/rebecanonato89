import type { Metadata } from "next";

import ContactForm from "@/components/ContactForm";
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
    title: copy.nav.contact,
    description: copy.contact.lead,
    openGraph: {
      title: `${copy.name} | ${copy.nav.contact}`,
      description: copy.contact.lead,
    },
  };
}

export default function ContactPage({ searchParams }: PageProps) {
  const locale = getLocaleFromSearchParams(searchParams);
  const copy = getCopy(locale);

  return (
    <section className="flex flex-col gap-8">
      <header>
        <h1 className="section-title">{copy.contact.title}</h1>
        <p className="section-lead max-w-2xl">{copy.contact.lead}</p>
      </header>
      <ContactForm locale={locale} />
    </section>
  );
}
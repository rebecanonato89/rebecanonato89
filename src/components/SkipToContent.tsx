"use client";

import { useSearchParams } from "next/navigation";

import { getCopy, normalizeLocale } from "@/lib/i18n";

export default function SkipToContent() {
  const searchParams = useSearchParams();
  const locale = normalizeLocale(searchParams?.get("lang"));
  const copy = getCopy(locale);

  return (
    <a className="skip-link" href="#content">
      {copy.a11y.skipToContent}
    </a>
  );
}

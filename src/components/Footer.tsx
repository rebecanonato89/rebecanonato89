"use client";

import { useSearchParams } from "next/navigation";

import { getCopy, normalizeLocale } from "@/lib/i18n";

export default function Footer() {
  const searchParams = useSearchParams();
  const locale = normalizeLocale(searchParams?.get("lang"));
  const copy = getCopy(locale);

  return (
    <footer className="border-t border-base-800">
      <div className="container-grid flex flex-col gap-2 py-8 text-sm text-base-400">
        <span>{copy.footer.note}</span>
        <span>© {new Date().getFullYear()} {copy.name}</span>
      </div>
    </footer>
  );
}

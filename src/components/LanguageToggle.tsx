"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { normalizeLocale } from "@/lib/i18n";

type LanguageToggleProps = {
  labels: {
    pt: string;
    en: string;
  };
};

export default function LanguageToggle({ labels }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = normalizeLocale(searchParams?.get("lang"));

  const setLang = (nextLang: "pt" | "en") => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("lang", nextLang);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant={current === "pt" ? "solid" : "ghost"}
        size="sm"
        onClick={() => setLang("pt")}
        aria-pressed={current === "pt"}
      >
        {labels.pt}
      </Button>
      <Button
        type="button"
        variant={current === "en" ? "solid" : "ghost"}
        size="sm"
        onClick={() => setLang("en")}
        aria-pressed={current === "en"}
      >
        {labels.en}
      </Button>
    </div>
  );
}

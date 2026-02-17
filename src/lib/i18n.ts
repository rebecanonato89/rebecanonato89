import { content, type LocaleKey } from "@/content";

type SearchParams = Record<string, string | string[] | undefined> | URLSearchParams;

export function getLocaleFromSearchParams(searchParams?: SearchParams | null) {
  if (!searchParams) return "pt" satisfies LocaleKey;

  if (searchParams instanceof URLSearchParams) {
    const value = searchParams.get("lang");
    return normalizeLocale(value);
  }

  const raw = searchParams.lang;
  if (Array.isArray(raw)) {
    return normalizeLocale(raw[0]);
  }

  return normalizeLocale(raw);
}

export function normalizeLocale(value?: string | null): LocaleKey {
  if (!value) return "pt";
  return value.toLowerCase().startsWith("en") ? "en" : "pt";
}

export function getCopy(locale: LocaleKey) {
  return content[locale];
}

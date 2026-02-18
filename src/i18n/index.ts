import translationsJson from './translations.json';

export type Lang = 'pt' | 'en' | 'zh';

type TranslationKeys = keyof typeof translationsJson['pt'];
type Translations = Record<Lang, Record<TranslationKeys, string>>;
const translations: Translations = translationsJson as Translations;

export function t(lang: Lang, key: string): string {
  return (translations[lang] as Record<string, string>)[key] || key;
}

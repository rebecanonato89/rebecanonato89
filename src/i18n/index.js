import ptBR from './pt-BR.js';
import en from './en.js';
import zhCN from './zh-CN.js';

export const LOCALES = { 'pt-BR': ptBR, en, 'zh-CN': zhCN };
export const LOCALE_OPTIONS = ['pt-BR', 'en', 'zh-CN'];
export const DEFAULT_LOCALE = 'pt-BR';

export function getLocale(value) {
  return LOCALES[value] ? value : DEFAULT_LOCALE;
}

export function getLocaleFromHash(hash = '') {
  const match = hash.match(/^#\/(pt-BR|en|zh-CN)(?:\/|$)/);
  return match ? match[1] : DEFAULT_LOCALE;
}

export function localePath(locale, path = '/') {
  const suffix = path === '/' ? '' : path;
  return `/#/${locale}${suffix}`;
}

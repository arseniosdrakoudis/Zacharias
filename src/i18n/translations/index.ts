import { en } from "./en";
import { el } from "./el";
import { ru } from "./ru";

export type Locale = "en" | "el" | "ru";

export type Translations = typeof en;

export const translations: Record<Locale, Translations> = {
  en,
  el,
  ru,
};

export const localeNames: Record<Locale, string> = {
  en: "EN",
  el: "ΕΛ",
  ru: "РУ",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇬🇧",
  el: "🇬🇷",
  ru: "🇷🇺",
};

export { en, el, ru };

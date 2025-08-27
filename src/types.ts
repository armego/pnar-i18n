export type Language = string;

export interface TranslationMap {
  [key: string]: string | TranslationMap;
}

export interface Translations {
  [language: string]: TranslationMap;
}

export interface I18nConfig {
  defaultLanguage: Language;
  fallbackLanguage?: Language;
  translations: Translations;
  loadTranslations?: (language: Language) => Promise<TranslationMap>;
  persistLanguage?: boolean;
  storageKey?: string;
  interpolation?: {
    prefix: string;
    suffix: string;
  };
}

export interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: TranslationOptions) => string;
  translations: Translations;
  isLoading: boolean;
  availableLanguages: Language[];
}

export interface TranslationOptions {
  fallback?: string;
  count?: number;
  context?: string;
  [key: string]: any;
}

export interface LanguageOption {
  value: Language;
  label: string;
  flag?: string;
}

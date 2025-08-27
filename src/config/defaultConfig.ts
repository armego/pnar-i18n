import { I18nConfig } from '../types';

export const defaultConfig: Partial<I18nConfig> = {
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
  persistLanguage: true,
  storageKey: 'pnar-i18n-language',
  interpolation: {
    prefix: '{{',
    suffix: '}}',
  },
};

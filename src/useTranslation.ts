import { useTranslation as useTranslationContext } from './TranslationProvider';
import { TranslationOptions } from './types';

export const useTranslation = () => {
  const { t, language, setLanguage, isLoading, availableLanguages } =
    useTranslationContext();

  return {
    t,
    language,
    setLanguage,
    isLoading,
    availableLanguages,
    // Helper functions
    isLanguage: (lang: string) => language === lang,
    switchToNextLanguage: () => {
      const currentIndex = availableLanguages.indexOf(language);
      const nextIndex = (currentIndex + 1) % availableLanguages.length;
      setLanguage(availableLanguages[nextIndex]);
    },
  };
};

// Specialized hooks
export const usePluralize = () => {
  const { t } = useTranslation();

  return (
    key: string,
    count: number,
    options: TranslationOptions = {}
  ): string => {
    const pluralKey = count === 1 ? `${key}_one` : `${key}_many`;
    return t(pluralKey, { count, ...options, fallback: t(key, options) });
  };
};

export const useDateLocalization = () => {
  const { language } = useTranslation();

  return {
    formatDate: (date: Date, options?: Intl.DateTimeFormatOptions): string => {
      return new Intl.DateTimeFormat(language, options).format(date);
    },

    formatRelativeTime: (date: Date): string => {
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) return `${days} days ago`;
      if (hours > 0) return `${hours} hours ago`;
      if (minutes > 0) return `${minutes} minutes ago`;
      return 'just now';
    },
  };
};

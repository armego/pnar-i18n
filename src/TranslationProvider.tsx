import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  Language,
  Translations,
  I18nConfig,
  TranslationContextType,
  TranslationOptions,
} from './types';
import { defaultConfig } from './config/defaultConfig';
import { interpolate } from './utils/interpolation';

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

interface TranslationProviderProps {
  config: I18nConfig;
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  config,
  children,
}) => {
  const finalConfig = { ...defaultConfig, ...config };
  const {
    defaultLanguage,
    fallbackLanguage,
    translations: staticTranslations,
    loadTranslations,
    persistLanguage,
    storageKey,
    interpolation,
  } = finalConfig;

  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState<Translations>(
    staticTranslations || {}
  );
  const [isLoading, setIsLoading] = useState(false);

  // Load saved language preference
  useEffect(() => {
    if (persistLanguage && storageKey) {
      const savedLanguage = localStorage.getItem(storageKey) as Language;
      if (savedLanguage) {
        setLanguageState(savedLanguage);
      }
    }
  }, [persistLanguage, storageKey]);

  // Load translations for current language
  useEffect(() => {
    const loadTranslationsForLanguage = async () => {
      if (!loadTranslations) return;

      setIsLoading(true);
      try {
        const newTranslations = await loadTranslations(language);
        setTranslations((prev) => ({
          ...prev,
          [language]: newTranslations,
        }));
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslationsForLanguage();
  }, [language, loadTranslations]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (persistLanguage && storageKey) {
      localStorage.setItem(storageKey, lang);
    }
  };

  const getNestedValue = (obj: any, path: string): string | undefined => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const t = (key: string, options: TranslationOptions = {}): string => {
    const { fallback, ...interpolationOptions } = options;

    // Try current language
    let translation = getNestedValue(translations[language], key);

    // Try fallback language if not found
    if (!translation && fallbackLanguage && language !== fallbackLanguage) {
      translation = getNestedValue(translations[fallbackLanguage], key);
    }

    // Use fallback or return key
    const finalText = translation || fallback || key;

    // Interpolate variables
    return interpolate(finalText, interpolationOptions, interpolation!);
  };

  const availableLanguages = Object.keys(translations);

  const value: TranslationContextType = {
    language,
    setLanguage,
    t,
    translations,
    isLoading,
    availableLanguages,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

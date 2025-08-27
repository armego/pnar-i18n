import React from 'react';
import { useTranslation } from './useTranslation';
import { Language, LanguageOption } from './types';

interface LanguageSwitcherProps {
  languages?: LanguageOption[];
  variant?: 'dropdown' | 'buttons' | 'flags';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  languages,
  variant = 'dropdown',
  className = '',
}) => {
  const { language, setLanguage, availableLanguages } = useTranslation();

  const languageOptions: LanguageOption[] =
    languages ||
    availableLanguages.map((lang) => ({
      value: lang,
      label: lang.toUpperCase(),
      flag: getFlagEmoji(lang),
    }));

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  if (variant === 'buttons') {
    return (
      <div className={`language-switcher-buttons ${className}`}>
        {languageOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleLanguageChange(option.value)}
            className={`language-button ${
              language === option.value ? 'active' : ''
            }`}
          >
            {option.flag && <span className="flag">{option.flag}</span>}
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'flags') {
    return (
      <div className={`language-switcher-flags ${className}`}>
        {languageOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleLanguageChange(option.value)}
            className={`flag-button ${
              language === option.value ? 'active' : ''
            }`}
            title={option.label}
          >
            {option.flag}
          </button>
        ))}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <select
      value={language}
      onChange={(e) => handleLanguageChange(e.target.value as Language)}
      className={`language-switcher-dropdown ${className}`}
    >
      {languageOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.flag && `${option.flag} `}
          {option.label}
        </option>
      ))}
    </select>
  );
};

const getFlagEmoji = (language: string): string => {
  const flags: Record<string, string> = {
    en: '🇺🇸',
    pnar: '🇮🇳',
    es: '🇪🇸',
    fr: '🇫🇷',
    de: '🇩🇪',
  };
  return flags[language] || '🌍';
};

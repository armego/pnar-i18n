# pnar-i18n

A powerful, flexible internationalization library for React applications with built-in Pnar language support.

## Features

- ✅ **TypeScript Support** - Full type safety
- ✅ **Dynamic Loading** - Load translations on-demand
- ✅ **Interpolation** - Variable substitution in translations
- ✅ **Pluralization** - Handle singular/plural forms
- ✅ **Date Localization** - Format dates according to language
- ✅ **Persistence** - Remember user's language preference
- ✅ **Fallbacks** - Graceful degradation to fallback languages
- ✅ **React Integration** - Hooks and context-based API
- ✅ **Framework Agnostic** - Works with any React setup

## Installation

```bash
npm install pnar-i18n
# or
yarn add pnar-i18n
```

## Quick Start

```typescript
import React from 'react';
import { TranslationProvider, useTranslation } from 'pnar-i18n';

const translations = {
  en: {
    welcome: 'Welcome',
    greeting: 'Hello {{name}}!',
  },
  pnar: {
    welcome: 'Alæ',
    greeting: 'Hey[Hei/Hoi/Hiw] {{name}}!',
  },
};

function App() {
  return (
    <TranslationProvider
      config={{
        defaultLanguage: 'en',
        translations,
      }}
    >
      <MyComponent />
    </TranslationProvider>
  );
}

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'John' })}</p>
    </div>
  );
}
```

## API Reference

### TranslationProvider

```typescript
interface I18nConfig {
  defaultLanguage: string;
  fallbackLanguage?: string;
  translations?: Translations;
  loadTranslations?: (language: string) => Promise<TranslationMap>;
  persistLanguage?: boolean;
  storageKey?: string;
  interpolation?: {
    prefix: string;
    suffix: string;
  };
}
```

### useTranslation Hook

```typescript
const {
  t, // Translation function
  language, // Current language
  setLanguage, // Change language
  isLoading, // Loading state
  availableLanguages, // Available languages
} = useTranslation();
```

### usePluralize Hook

```typescript
const pluralize = usePluralize();

// Basic usage
pluralize('item', 1); // "item"
pluralize('item', 5); // "items" (if plural form exists)

// With custom translations
pluralize('apple', 3); // Uses translation key 'apple_many' if available
```

### useDateLocalization Hook

```typescript
const localizeDate = useDateLocalization();

// Format dates according to current language
localizeDate(new Date(), 'long'); // "December 25, 2023" (localized)
localizeDate(new Date(), 'short'); // "12/25/23" (localized)
```

## Advanced Usage

### Dynamic Translation Loading

```typescript
const loadTranslations = async (language: string) => {
  const response = await fetch(`/locales/${language}.json`);
  return response.json();
};

<TranslationProvider
  config={{
    defaultLanguage: 'en',
    loadTranslations,
  }}
>
  <App />
</TranslationProvider>;
```

### Pluralization

```typescript
import { usePluralize } from 'pnar-i18n';

function MyComponent() {
  const pluralize = usePluralize();

  return <p>{pluralize('item', count)}</p>;
}
```

### Language Switcher

```typescript
import { LanguageSwitcher } from 'pnar-i18n';

function Header() {
  return (
    <header>
      <LanguageSwitcher variant="buttons" />
    </header>
  );
}
```

## Configuration Options

| Option             | Type           | Default                        | Description              |
| ------------------ | -------------- | ------------------------------ | ------------------------ |
| `defaultLanguage`  | `string`       | `'en'`                         | Default language         |
| `fallbackLanguage` | `string`       | `'en'`                         | Fallback language        |
| `translations`     | `Translations` | `{}`                           | Static translations      |
| `loadTranslations` | `Function`     | -                              | Dynamic loading function |
| `persistLanguage`  | `boolean`      | `true`                         | Save language preference |
| `storageKey`       | `string`       | `'pnar-i18n-language'`         | localStorage key         |
| `interpolation`    | `object`       | `{prefix: '{{', suffix: '}}'}` | Interpolation markers    |

## Examples

### Basic Usage with JSON Files

```typescript
// translations/en.json
{
  "welcome": "Welcome",
  "greeting": "Hello {{name}}!",
  "items": "item",
  "items_many": "items"
}

// translations/pnar.json
{
  "welcome": "Alæ",
  "greeting": "Hey[Hei/Hoi/Hiw] {{name}}!",
  "items": "ki item",
  "items_many": "Bõn item"
}

// App.tsx
import React from 'react';
import { TranslationProvider, useTranslation, usePluralize, LanguageSwitcher } from 'pnar-i18n';

const loadTranslations = async (language: string) => {
  const response = await fetch(`/translations/${language}.json`);
  return response.json();
};

function App() {
  return (
    <TranslationProvider
      config={{
        defaultLanguage: 'en',
        loadTranslations
      }}
    >
      <Header />
      <Content />
    </TranslationProvider>
  );
}

function Header() {
  return (
    <header>
      <LanguageSwitcher variant="buttons" />
    </header>
  );
}

function Content() {
  const { t } = useTranslation();
  const pluralize = usePluralize();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'John' })}</p>
      <p>{pluralize('items', 5)}</p>
    </div>
  );
}
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in development mode
npm run dev

# Run tests
npm run test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT</content>
<parameter name="filePath">/Users/armegochylla/Projects/pnar-world-admin-vite-react-ts/pnar-i18n/README.md

import { TranslationOptions } from '../types';

export const interpolate = (
  text: string,
  options: TranslationOptions = {},
  config: { prefix: string; suffix: string }
): string => {
  const { prefix, suffix } = config;

  return text.replace(
    new RegExp(`${prefix}(\\w+)${suffix}`, 'g'),
    (match, key) => {
      return options[key] !== undefined ? String(options[key]) : match;
    }
  );
};

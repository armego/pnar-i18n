module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    // Add any custom rules here
  },
};

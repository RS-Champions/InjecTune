// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const unicorn = require('eslint-plugin-unicorn');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      {
        languageOptions: {
          parserOptions: {
            projectService: true,
            tsconfigRootDir: __dirname,
          },
        },
      },
      angular.configs.tsRecommended,
      unicorn.default.configs.recommended,
    ],
    plugins: {
      eslintPluginUnicorn: unicorn.default,
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: ['element', 'attribute'],
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['main\\.ts', 'environment.*'],
        },
      ],
      'unicorn/prevent-abbreviations': [
        'warn',
        {
          ignore: ['e2e', 'i18n'],
        },
      ],
      'unicorn/no-null': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
]);

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import tsPluginObject from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPluginObject from 'eslint-plugin-import';
import prettierPluginObject from 'eslint-plugin-prettier';
import unusedImportObject from 'eslint-plugin-unused-imports';
import globals from 'globals';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '.output/**', 'node_modules/**', 'public/**']),

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
        React: 'readonly',
      },
    },
    plugins: {
      'unused-imports': unusedImportObject,
      '@typescript-eslint': tsPluginObject,
      import: importPluginObject,
      prettier: prettierPluginObject,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['node_modules/**'],
              message: 'Import dependencies through their public package exports instead of node_modules internals.',
            },
          ],
        },
      ],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      eqeqeq: 'error',
      'prettier/prettier': 'error',
      'no-console': 'error',
      'max-len': ['warn', { code: 150, tabWidth: 2, ignoreUrls: true }],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      'no-empty-pattern': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  prettierConfig,
]);

export default eslintConfig;

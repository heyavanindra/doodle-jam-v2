import { config as baseConfig } from '@repo/eslint-config/base';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...baseConfig,
  {
    ignores: ['dist/**', 'build/**', 'coverage/**', 'node_modules/**', 'drizzle/**', '**/*.d.ts'],
  },
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2024,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'off',
    },
  },
);

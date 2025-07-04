// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

/**
 * @typedef {typeof import('typescript-eslint').InfiniteDepthConfigWithExtends} Config
 * @typedef {{ignores?: string[]}} Options
 **/

/**
 * @param   {Options} [options]
 * @returns {Config}
 **/
export const createConfigs = (options = {}) => {
  const { ignores = ['**/dist/**', '**/__generated__/**'] } = options;

  return [
    {
      files: ['**/*.{ts,js}'],
      ignores,
      extends: [eslint.configs.recommended],
    },
    {
      files: ['**/*.ts'],
      ignores,
      extends: tseslint.configs.recommended,
      rules: {
        '@typescript-eslint/no-unused-vars': ['error', {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        }],
      },
    },
    {
      files: ['**/*.ts'],
      ignores,
      extends: tseslint.configs.recommended,
    },
    {
      files: ['**/*.{ts,js}'],
      ignores,
      extends: [stylistic.configs.customize({
        semi: true,
        severity: 'warn',
      })],
    },
  ];
};

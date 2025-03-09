import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginSecurity from 'eslint-plugin-security';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts}'], ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        plugins: {
            security: eslintPluginSecurity,
            'simple-import-sort': simpleImportSort,
        },

        rules: {
            'no-console': 'error',
            'no-await-in-loop': 'error',
            'no-duplicate-imports': 'error',
            'require-atomic-updates': 'error',

            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',

            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [['^node:'], ['^express$', '^@?\\w'], ['^@'], ['^\\.']],
                },
            ],
        },
    },
];

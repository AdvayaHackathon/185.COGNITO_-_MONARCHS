
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';
import nextPlugin from '@next/eslint-plugin-next';

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': ts,
            tailwindcss: eslintPluginTailwindcss,
            '@next/next': nextPlugin,
        },
        rules: {
            ...ts.configs.recommended.rules,
            'tailwindcss/classnames-order': 'warn',
            'tailwindcss/no-custom-classname': 'warn',
            'tailwindcss/no-contradicting-classname': 'error',
            '@next/next/no-html-link-for-pages': 'error',
            '@next/next/no-img-element': 'error',
        },
    },
];

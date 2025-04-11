import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginTailwindcss from 'eslint-plugin-tailwindcss';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      tailwindcss: eslintPluginTailwindcss,
      '@next/next': nextPlugin,
    },
    rules: {
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'warn',
      'tailwindcss/no-contradicting-classname': 'error',
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',
    },
  },
);
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        files: ['**/*.{ts,tsx,js}'],
        languageOptions: {
            ecmaVersion: 2020,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: globals.browser,
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@stylistic': stylistic,
            'simple-import-sort': simpleImportSort,

        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
        ],
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...react.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            eqeqeq: 'error',
            'no-nested-ternary': 'error',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            '@stylistic/indent': ['error', 4],
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/ban-ts-comment': 'warn',
            '@typescript-eslint/no-unused-expressions': [
                'error',
                { allowShortCircuit: true },
            ],
            // Исключение
            'react/react-in-jsx-scope': 'off',
            // Пробелы
            // Убирает пробелы в конце строк
            'no-trailing-spaces': 'error',

            // Запрещает множественные пробелы подряд
            'no-multi-spaces': 'error',

            // Удаляет пробел перед ;
            'semi-spacing': ['error', { before: false, after: true }],

            // Пробелы вокруг ключевых слов (`if`, `else`, `for`)
            'keyword-spacing': ['error', { before: true, after: true }],

            // Пробел после запятых, но не перед
            'comma-spacing': ['error', { before: false, after: true }],

            // Пробелы внутри скобок объектов/массивов
            'object-curly-spacing': ['error', 'always'],

            // Пробел внутри JSX атрибутов и между ними
            'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],

        },
    },
);

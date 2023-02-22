module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard-with-typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:json/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
    'plugin:eslint-comments/recommended',
  ],
  plugins: [
    'module-resolver',
    'prettier',
    '@typescript-eslint',
    'unused-imports',
    'simple-import-sort',
  ],
  ignorePatterns: [
    '*.next-env.js',
    '*.config.js',
    'package.json',
    '*.json',
    '.eslintrc.js',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prefer-arrow-callback': 'error',
    'eslint-comments/no-use': ['error', { allow: [] }],
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
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'prettier/prettier': 'error',
    'sort-imports': [
      'warn',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'import/order': [
      1,
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'sibling',
          'parent',
          'index',
        ],
      },
    ],
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

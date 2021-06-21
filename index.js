const CapitalizeModules = require('./capitalize-modules');

const recommended = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  plugins: ['@typeofweb', 'functional', '@typescript-eslint', 'unicorn', 'eslint-comments'],
  extends: [
    'prettier',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    '@typeofweb/capitalize-modules': 'error',
    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
    '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/restrict-template-expressions': ['error', { allowNullish: true }],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    'functional/no-let': ['error', { allowLocalMutation: true, ignorePattern: '^mutable' }],
    'functional/no-loop-statement': 'error',
    'functional/no-this-expression': 'error',
    'functional/prefer-readonly-type': 'error',
    'import/dynamic-import-chunkname': 'error',
    'import/no-anonymous-default-export': 'error',
    'import/no-cycle': 'error',
    'import/no-default-export': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'type'],
      },
    ],
    'unicorn/prefer-module': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'eslint-comments/require-description': ['error', { ignore: ['eslint-enable'] }],
    'no-const-assign': 'error',
    'no-param-reassign': 'error',
    'no-unused-vars': 'off',
    'no-var': 'error',
    'prefer-const': 'error',
    'require-await': 'error',
  },
};

module.exports = {
  configs: {
    recommended,
  },
  rules: {
    'capitalize-modules': CapitalizeModules,
  },
};

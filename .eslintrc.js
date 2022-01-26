module.exports = {
  parser: '@typescript-eslint/parser',
  // Specifies the ESLint parser
  extends: [
    'eslint:recommended',
    'plugin:@next/next/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react/prop-types': 'off',
    // Disable prop-types as we use TypeScript for type checking
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'no-unused-vars': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'linebreak-style': 0,
    'react/button-has-type': 0,
    'max-len': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'comma-dangle': [1, 'always-multiline'],
    // allow or disallow trailing commas
    'no-useless-catch': 0,
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 0,
    'global-require': 0,
    'no-underscore-dangle': 0,
    'react/react-in-jsx-scope': 0,
    'import/extensions': 0,
    'react/require-default-props': 0,
    'func-style': [0],
    'func-names': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/no-unstable-nested-components': [
      'off',
      {
        allowAsProps: true,
      },
    ],
    'react/no-unescaped-entities': 'off',
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-max-props-per-line': [
      2,
      {
        maximum: 1,
        when: 'multiline',
      },
    ],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
        tabWidth: 2,
        endOfLine: 'auto',
        proseWrap: 'preserve',
        trailingComma: 'all',
      },
    ],
  },
  overrides: [
    // Override some TypeScript rules just for .js files
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off', //
      },
    },
  ],
};

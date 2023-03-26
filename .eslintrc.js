module.exports = {
  root: true,
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  extends: [
    __dirname + '/.eslintrc-node.js',
    __dirname + '/.eslintrc-typescript.js',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2021,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'comma-dangle': [ 'error', 'always-multiline' ],
    indent: [ 'error', 2 ],
    quotes: [ 'error', 'single' ],
    semi: [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'max-len': [ 'error', { 'code': 120 } ],
    'max-lines-per-function': [ 'error', { 'max': 60, 'skipBlankLines': true, 'skipComments': true } ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [ '.js', '.ts' ],
      },
      typescript: {
        project: __dirname + '/tsconfig.json',
      },
    },
  },
};

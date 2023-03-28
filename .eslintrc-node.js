'use strict';

module.exports = {
  plugins: ['node'],
  extends: ['plugin:node/recommended'],
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  rules: {
    'node/no-unpublished-require': 0,
    'node/no-unpublished-import': 0,
  },
};

module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'class-methods-use-this': 'off',
    camelCase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'linebreak-style': ['error', 'windows'],
  },
};

module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:jest/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: { 'jest/no-done-callback': 0, 'func-names': 0, 'no-console': 0 },
};

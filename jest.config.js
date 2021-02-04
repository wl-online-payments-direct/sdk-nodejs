/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  globalSetup: './tests/integration/__setup__/globalSetup.js',
  globalTeardown: './tests/integration/__setup__/globalTeardown.js',
  testEnvironment: 'node',
};

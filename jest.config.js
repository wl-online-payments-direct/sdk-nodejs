/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.test.js'],
    },
    {
      displayName: 'integration',
      globalSetup: './tests/integration/__setup__/globalSetup.js',
      globalTeardown: './tests/integration/__setup__/globalTeardown.js',
      testMatch: ['<rootDir>/tests/integration/**/*.test.js'],
    },
  ],
};

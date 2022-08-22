const context = require('../../src/utils/context');

describe('sdkContext', () => {
  test('context is a function', async () => {
    expect(typeof context).toBe('function');
  });
});

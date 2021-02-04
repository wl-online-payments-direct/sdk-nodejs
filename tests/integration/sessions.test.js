const sdkInstance = require('./__fixture__');
const config = require('./__fixture__/config');
const stubs = require('./__stubs__');

describe('Sessions', () => {
  test('it can create a session', (done) => {
    sdkInstance.sessions.createSession(config.merchantId, stubs.createSession, {}, (error, sdkResponse) => {
      expect(error).toBeNull();
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
      done();
    });
  });
});

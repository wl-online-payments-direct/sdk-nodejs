import sdkInstance, { config } from "./initPrism";
import stubs from "./__stubs__";

describe("Sessions", () => {
  test("it can create a session", done => {
    sdkInstance.sessions.createSession(config.merchantId, stubs.createSession, {}).then(sdkResponse => {
      expect(sdkResponse.isSuccess).toBe(true);
      expect(sdkResponse).toMatchSnapshot();
      done();
    });
  });
});

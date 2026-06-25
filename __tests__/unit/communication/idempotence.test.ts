import nock from "nock";
import { SdkContext } from "../../../src";
import communicator from "../../../src/utils/communicator";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

/**
 * @group communication
 */
describe("idempotence", () => {
  let sdkContext: SdkContext;

  beforeAll(() => {
    nock.disableNetConnect();
    sdkContext = newSdkContext(dummySdkConfig());
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test("shouldReturnIdempotenceKeyInRequestHeaderWhenSetAndBeAbsentWhenNot", async () => {
    const path = "/api/payments";

    nock("http://test")
      .matchHeader("x-gcs-idempotence-key", "test-idempotence-key")
      .get(path)
      .reply(200, {});
    await communicator.json({ method: "GET", modulePath: path, paymentContext: { idempotence: { key: "test-idempotence-key" } } }, sdkContext);

    nock("http://test", { badheaders: ["x-gcs-idempotence-key"] })
      .get(path)
      .reply(200, {});
    await communicator.json({ method: "GET", modulePath: path }, sdkContext);
  });

  test("shouldSetIdempotenceValuesCorrectlyOnPaymentContextAfterGetRequest", async () => {
    const path = "/api/payments";
    const requestTimestamp = "2024-01-01T10:00:00Z";
    const responseDateTime = "2024-01-01T10:00:01Z";

    nock("http://test")
      .get(path)
      .reply(200, {}, { "x-gcs-idempotence-request-timestamp": requestTimestamp, idempotencyresponsedatetime: responseDateTime });

    const paymentContext: { idempotence: { key: string; requestTimestamp?: string; responseDateTime?: string } } = {
      idempotence: { key: "test-idempotence-key" }
    };

    await communicator.json({ method: "GET", modulePath: path, paymentContext }, sdkContext);

    expect(paymentContext.idempotence.key).toBe("test-idempotence-key");
    expect(paymentContext.idempotence.requestTimestamp).toBe(requestTimestamp);
    expect(paymentContext.idempotence.responseDateTime).toBe(responseDateTime);
  });
});

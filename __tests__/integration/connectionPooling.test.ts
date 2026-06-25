import https from "https";
import { init as SDKInit } from "../../src";
import { sdkConfig } from "../auth_config";
import config from "../config.json";
import { TestConnection } from "../../src/generated/model/domain/index.js";

jest.setTimeout(60 * 1000);

const REQUEST_COUNT = 10;

async function testConnectionPooling(maxSockets: number): Promise<void> {
  const agent = new https.Agent({ keepAlive: true, maxSockets });
  const client = SDKInit({ ...sdkConfig(config), connectionOptions: { agent } });

  const promises = Array.from({ length: REQUEST_COUNT }, () => client.services.testConnection(config.merchantId));

  const responses = await Promise.all(promises);

  for (const response of responses) {
    expect(response.isSuccess).toBe(true);

    const body = response.body as TestConnection;
    expect(body.result).toBeDefined();
  }
}

describe("ConnectionPooling", () => {
  describe("whenTestingConnectionPooling", () => {
    describe("with max connections equal to request count", () => {
      test("shouldHandleConcurrentRequests", async () => {
        await testConnectionPooling(REQUEST_COUNT);
      });
    });

    describe("with max connections less than request count", () => {
      test("shouldHandleConcurrentRequests", async () => {
        await testConnectionPooling(5);
      });
    });

    describe("with max connections one", () => {
      test("shouldHandleConcurrentRequests", async () => {
        await testConnectionPooling(1);
      });
    });
  });
});

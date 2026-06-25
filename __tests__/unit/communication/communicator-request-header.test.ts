import nock from "nock";
import { SdkContext, V1HmacConfiguration } from "../../../src";
import communicator from "../../../src/utils/communicator";
import { serverMetaInfo } from "../../../src/utils/headers";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

/**
 * @group communication
 */
describe("communicator request header", () => {
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

  test("shouldSendExtraHeaderWithConfiguredNameAndValue", async () => {
    const path = "/api/resource";
    nock("http://test")
      .matchHeader("x-correlation-id", "abc-123")
      .get(path)
      .reply(200, {});

    const response = await communicator.json(
      {
        method: "GET",
        modulePath: path,
        paymentContext: {
          extraHeaders: [{ key: "X-Correlation-Id", value: "abc-123" }]
        }
      },
      sdkContext
    );

    expect(response.isSuccess).toBe(true);
  });

  test("shouldSendExtraHeaderWithEmptyValueWhenHeaderValueIsEmpty", async () => {
    const path = "/api/resource";
    nock("http://test")
      .matchHeader("x-custom", "")
      .get(path)
      .reply(200, {});

    const response = await communicator.json(
      {
        method: "GET",
        modulePath: path,
        paymentContext: {
          extraHeaders: [{ key: "X-Custom", value: "" }]
        }
      },
      sdkContext
    );

    expect(response.isSuccess).toBe(true);
  });

  test("shouldTrimAndNormalizeMultiLineHttpHeaderValues", async () => {
    const path = "/api/resource";
    nock("http://test")
      .matchHeader("x-custom", "line1 line2")
      .get(path)
      .reply(200, {});

    const response = await communicator.json(
      {
        method: "GET",
        modulePath: path,
        paymentContext: {
          extraHeaders: [{ key: "X-Custom", value: "line1 line2" }]
        }
      },
      sdkContext
    );

    expect(response.isSuccess).toBe(true);
  });

  test("shouldGenerateFullServerMetaInfoHeaderWithShoppingCartExtension", () => {
    const config: V1HmacConfiguration = {
      ...dummySdkConfig(),
      shoppingCartExtension: { creator: "test-creator", name: "test-name", version: "1.0", extensionId: "ext-123" }
    };

    const context = newSdkContext(config);
    const header = serverMetaInfo(context);

    expect(header.key).toBe("X-GCS-ServerMetaInfo");
    const decoded = JSON.parse(Buffer.from(header.value, "base64").toString("utf8"));
    expect(decoded.sdkCreator).toBe("OnlinePayments");
    expect(decoded.shoppingCartExtension).toEqual({ creator: "test-creator", name: "test-name", version: "1.0", extensionId: "ext-123" });
  });

  test("shouldGenerateServerMetaInfoHeaderWithShoppingCartExtensionWithoutExtensionId", () => {
    const config: V1HmacConfiguration = {
      ...dummySdkConfig(),
      shoppingCartExtension: { creator: "test-creator", name: "test-name", version: "1.0" }
    };

    const context = newSdkContext(config);
    const header = serverMetaInfo(context);

    const decoded = JSON.parse(Buffer.from(header.value, "base64").toString("utf8"));
    expect(decoded.shoppingCartExtension.creator).toBe("test-creator");
    expect(decoded.shoppingCartExtension.extensionId).toBeUndefined();
  });
});

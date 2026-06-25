import { serverMetaInfo } from "../../../src/utils/headers";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";
import { V1HmacConfiguration } from "../../../src";

/**
 * @group communication
 */
describe("serverMetaInfo", () => {
  function decode(headerValue: string): Record<string, unknown> {
    return JSON.parse(Buffer.from(headerValue, "base64").toString("utf8"));
  }

  test("shouldReturnServerMetaInfoHeaderWhenGettingServerMetadataHeadersWithoutShoppingCartExtension", () => {
    const sdkContext = newSdkContext(dummySdkConfig());
    const header = serverMetaInfo(sdkContext);

    expect(header.key).toBe("X-GCS-ServerMetaInfo");
    expect(header.value).toBeTruthy();

    const decoded = decode(header.value);
    expect(decoded.sdkCreator).toBe("OnlinePayments");
    expect(decoded.sdkIdentifier).toContain("NodejsServerSDK");
    expect(decoded.platformIdentifier).toBeTruthy();
    expect(decoded.shoppingCartExtension).toBeUndefined();
  });

  test("shouldIncludeShoppingCartExtensionInMetadataWhenConfigured", () => {
    const config: V1HmacConfiguration = {
      ...dummySdkConfig(),
      shoppingCartExtension: { creator: "acme", name: "my-plugin", version: "2.1.0", extensionId: "ext-001" }
    };

    const decoded = decode(serverMetaInfo(newSdkContext(config)).value);

    expect(decoded.shoppingCartExtension).toEqual({ creator: "acme", name: "my-plugin", version: "2.1.0", extensionId: "ext-001" });
  });

  test("shouldIncludeShoppingCartExtensionWithoutExtensionIdInMetadataWhenConfigured", () => {
    const config: V1HmacConfiguration = {
      ...dummySdkConfig(),
      shoppingCartExtension: { creator: "acme", name: "my-plugin", version: "2.1.0" }
    };

    const decoded = decode(serverMetaInfo(newSdkContext(config)).value) as any;

    expect(decoded.shoppingCartExtension.creator).toBe("acme");
    expect(decoded.shoppingCartExtension.name).toBe("my-plugin");
    expect(decoded.shoppingCartExtension.version).toBe("2.1.0");
    expect(decoded.shoppingCartExtension.extensionId).toBeUndefined();
  });

  test("shouldContainNodeVersionInPlatformIdentifier", () => {
    const decoded = decode(serverMetaInfo(newSdkContext(dummySdkConfig())).value);

    expect(decoded.platformIdentifier).toContain(`Node.js/${process.versions.node}`);
  });

  test("shouldContainValidSdkIdentifierFormat", () => {
    const decoded = decode(serverMetaInfo(newSdkContext(dummySdkConfig())).value);

    expect(decoded.sdkIdentifier).toMatch(/^NodejsServerSDK\/v\d+\.\d+\.\d+$/);
  });

  test("shouldIncludeConfiguredIntegratorNameInServerMetaInfoHeader", () => {
    const config: V1HmacConfiguration = { ...dummySdkConfig(), integrator: "OnlinePayments.Integrator" };
    const decoded = decode(serverMetaInfo(newSdkContext(config)).value);

    expect(decoded.integrator).toBe("OnlinePayments.Integrator");
  });

  test("shouldOmitShoppingCartExtensionFromServerMetaInfoHeaderWhenNotConfigured", () => {
    const decoded = decode(serverMetaInfo(newSdkContext(dummySdkConfig())).value);

    expect(decoded.integrator).toBe("dummy");
    expect(decoded.shoppingCartExtension).toBeUndefined();
  });
});

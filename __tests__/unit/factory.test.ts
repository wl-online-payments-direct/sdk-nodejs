import { init } from "../../src/index";
import { newSdkContext } from "../../src/utils/context";
import { V1HmacAuthenticator } from "../../src/utils/authentication";
import { V1HmacConfiguration } from "../../src";
import { serverMetaInfo } from "../../src/utils/headers";
import { dummySdkConfig } from "../auth_config";

/**
 * @group factory
 */
describe("factory", () => {
  test("shouldReturnExpectedConfigurationWhenCreatingConfigurationWithValidPropertiesUri", () => {
    const config = dummySdkConfig();
    const sdkContext = newSdkContext(config);

    const endpoint = sdkContext.getEndpoint();
    expect(endpoint.host).toBe(config.host);
    expect(endpoint.scheme).toBe(config.scheme);
    expect(endpoint.port).toBe(config.port);
    expect(sdkContext.getIntegrator()).toBe(config.integrator);
    expect(sdkContext.getAuthenticator()).toBeInstanceOf(V1HmacAuthenticator);
  });

  test("shouldThrowRuntimeExceptionWhenCreatingConfigurationWithInvalidPropertiesUri", () => {
    const config = dummySdkConfig();
    config.integrator = "";

    expect(() => newSdkContext(config)).toThrow();
  });

  test("shouldReturnExpectedCommunicatorWhenCreatingCommunicatorWithValidPropertiesUri", () => {
    const config = dummySdkConfig();
    const client = init(config);

    expect(client.context.getEndpoint().host).toBe(config.host);
    expect(client.context.getEndpoint().scheme).toBe(config.scheme);
    expect(client.context.getEndpoint().port).toBe(config.port);
    expect(client.context.getIntegrator()).toBe(config.integrator);
    expect(client.context.getAuthenticator()).toBeInstanceOf(V1HmacAuthenticator);
  });

  test("shouldThrowRuntimeExceptionWhenCreatingCommunicatorWithInvalidPropertiesUri", () => {
    const config = dummySdkConfig();
    config.integrator = "";

    expect(() => init(config)).toThrow();
  });

  test("shouldReturnNonNullClientWhenCreatingClientWithValidConfiguration", () => {
    const client = init(dummySdkConfig());

    expect(client).not.toBeNull();
    expect(client).toBeDefined();
    expect(client.context).toBeDefined();
  });

  test("shouldThrowExceptionWhenCreatingClientWithInvalidConfiguration", () => {
    const config: V1HmacConfiguration = {
      ...dummySdkConfig(),
      shoppingCartExtension: { creator: "acme", name: "", version: "1.0" }
    };

    expect(() => init(config)).toThrow();
  });

  test("shouldReturnClientFromConfigurationWithCorrectIntegratorAndAuthenticator", () => {
    const config: V1HmacConfiguration = { ...dummySdkConfig(), integrator: "MyIntegrator" };
    const client = init(config);

    expect(client).not.toBeNull();
    expect(client.context.getIntegrator()).toBe("MyIntegrator");
    expect(client.context.getAuthenticator()).toBeInstanceOf(V1HmacAuthenticator);
  });

  test("shouldWireServerMetaInfoHeaderWhenCreatingClientWithValidConfiguration", () => {
    const client = init(dummySdkConfig());
    const header = serverMetaInfo(client.context);

    expect(header.key).toBe("X-GCS-ServerMetaInfo");
    expect(header.value).toBeTruthy();
  });
});

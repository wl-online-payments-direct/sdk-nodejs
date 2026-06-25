import { V1HmacConfiguration } from "../../../src";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

/**
 * @group utils
 */
describe("communicator configuration", () => {
  test("shouldSetExpectedConfigurationWhenConstructedWithoutProxy", () => {
    const context = newSdkContext(dummySdkConfig());

    expect(context.getProxy()).toBeUndefined();
  });

  test("shouldSetExpectedProxyConfigurationWhenConstructedWithProxyWithoutAuthentication", () => {
    const config: V1HmacConfiguration = { ...dummySdkConfig(), proxy: { host: "proxy.example.com", scheme: "http", port: 8080 } };
    const context = newSdkContext(config);

    expect(context.getProxy()?.host).toBe("proxy.example.com");
    expect(context.getProxy()?.scheme).toBe("http");
    expect(context.getProxy()?.port).toBe(8080);
    expect(context.getProxy()?.credentials).toBeUndefined();
  });

  test("shouldSetExpectedProxyConfigurationWhenConstructedWithProxyWithAuthentication", () => {
    const config: V1HmacConfiguration = {
      ...dummySdkConfig(),
      proxy: { host: "proxy.example.com", scheme: "http", port: 8080, credentials: "user:password" }
    };

    const context = newSdkContext(config);

    expect(context.getProxy()?.host).toBe("proxy.example.com");
    expect(context.getProxy()?.credentials).toBe("user:password");
  });

  test("shouldSetEndpointWithConfiguredSchemeWhenConstructedWithHostAndScheme", () => {
    const config: V1HmacConfiguration = { ...dummySdkConfig(), host: "api.example.com", scheme: "https", port: undefined };
    const context = newSdkContext(config);

    expect(context.getEndpoint().host).toBe("api.example.com");
    expect(context.getEndpoint().scheme).toBe("https");
    expect(context.getEndpoint().port).toBe(443);
  });

  test("shouldSetEndpointWithConfiguredPortWhenConstructedWithHostAndPort", () => {
    const config: V1HmacConfiguration = { ...dummySdkConfig(), host: "api.example.com", port: 8443 };
    const context = newSdkContext(config);

    expect(context.getEndpoint().host).toBe("api.example.com");
    expect(context.getEndpoint().port).toBe(8443);
  });

  test("shouldSetEndpointWithConfiguredSchemeAndPortWhenConstructedWithHostSchemeAndPort", () => {
    const config: V1HmacConfiguration = { ...dummySdkConfig(), host: "api.example.com", scheme: "http", port: 8080 };
    const context = newSdkContext(config);

    expect(context.getEndpoint().host).toBe("api.example.com");
    expect(context.getEndpoint().scheme).toBe("http");
    expect(context.getEndpoint().port).toBe(8080);
  });

  test("shouldSetBracketedHttpsEndpointWhenConstructedWithIpv6Host", () => {
    const config: V1HmacConfiguration = { ...dummySdkConfig(), host: "::1", scheme: "https", port: undefined };
    const context = newSdkContext(config);

    expect(context.getEndpoint().host).toBe("::1");
    expect(context.getEndpoint().scheme).toBe("https");
    expect(context.getEndpoint().port).toBe(443);
  });

  test("shouldDefaultToHttpsSchemeAndPort443WhenSchemeIsNotSpecified", () => {
    const config: V1HmacConfiguration = { host: "api.example.com", integrator: "test", apiKeyId: "key", secretApiKey: "secret" };
    const context = newSdkContext(config);

    expect(context.getEndpoint().scheme).toBe("https");
    expect(context.getEndpoint().port).toBe(443);
  });

  test("shouldSetIntegratorAndShoppingCartExtensionWhenBothAreConfigured", () => {
    const config: V1HmacConfiguration = {
      ...dummySdkConfig(),
      integrator: "OnlinePayments.Integrator",
      shoppingCartExtension: {
        creator: "OnlinePayments.Creator",
        name: "OnlinePayments.ShoppingCarts",
        version: "1.0"
      }
    };

    const context = newSdkContext(config);

    expect(context.getIntegrator()).toBe("OnlinePayments.Integrator");
    expect(context.getShoppingCartExtension()).toBeDefined();
    expect(context.getShoppingCartExtension()?.creator).toBe("OnlinePayments.Creator");
    expect(context.getShoppingCartExtension()?.name).toBe("OnlinePayments.ShoppingCarts");
    expect(context.getShoppingCartExtension()?.version).toBe("1.0");
  });
});

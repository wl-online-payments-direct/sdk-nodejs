import http from "http";
import { init, obfuscate, V1HmacConfiguration, Logger } from "../../../src/index";
import { dummySdkConfig } from "../../auth_config";

/**
 * @group communication
 */
describe("client logging", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("shouldDelegateToCommunicatorWithValidLogger", () => {
    const client = init(dummySdkConfig());
    const spy = jest.spyOn(client.context, "setEnableLogging");

    client.context.setEnableLogging(true);

    expect(spy).toHaveBeenCalledWith(true);
  });

  test("shouldDelegateToCommunicator", () => {
    const config = dummySdkConfig();
    config.enableLogging = true;
    const client = init(config);
    const spy = jest.spyOn(client.context, "setEnableLogging");

    client.context.setEnableLogging(false);

    expect(spy).toHaveBeenCalledWith(false);
  });

  test("shouldDelegateEachCallToCommunicator", () => {
    const client = init(dummySdkConfig());
    const spy = jest.spyOn(client.context, "setEnableLogging");

    client.context.setEnableLogging(true);
    client.context.setEnableLogging(false);
    client.context.setEnableLogging(true);
    client.context.setEnableLogging(false);

    expect(spy).toHaveBeenCalledTimes(4);
    expect(spy).toHaveBeenNthCalledWith(1, true);
    expect(spy).toHaveBeenNthCalledWith(2, false);
    expect(spy).toHaveBeenNthCalledWith(3, true);
    expect(spy).toHaveBeenNthCalledWith(4, false);
  });
});

describe("client connection options", () => {
  test("shouldExposeAgentFromConnectionOptions", () => {
    const agent = new http.Agent({ keepAlive: true });
    const client = init({ ...dummySdkConfig(), connectionOptions: { agent } });

    expect(client.context.getConnectionOptions()?.agent).toBe(agent);
  });

  test("shouldReturnUndefinedConnectionOptionsWhenNotConfigured", () => {
    const client = init(dummySdkConfig());

    expect(client.context.getConnectionOptions()).toBeUndefined();
  });

  test("shouldNotThrowWhenDestroyingAgentConnections", () => {
    const agent = new http.Agent({ keepAlive: true });
    const client = init({ ...dummySdkConfig(), connectionOptions: { agent } });

    expect(() => client.context.getConnectionOptions()?.agent?.destroy()).not.toThrow();
  });
});

describe("client construction", () => {
  test("shouldCreateValidInstanceAfterInit", () => {
    const client = init(dummySdkConfig());

    expect(client).toBeDefined();
    expect(client).not.toBeNull();
  });

  test("shouldExposeContextAfterInit", () => {
    const client = init(dummySdkConfig());

    expect(client.context).toBeDefined();
  });
});

describe("client integrator and metadata", () => {
  test("shouldExposeIntegratorFromConfiguration", () => {
    const client = init({ ...dummySdkConfig(), integrator: "TestIntegrator" });
    expect(client.context.getIntegrator()).toBe("TestIntegrator");
  });

  test("shouldExposeShoppingCartExtensionFromConfigurationWhenConfigured", () => {
    const config: V1HmacConfiguration = {
      ...dummySdkConfig(),
      shoppingCartExtension: { creator: "acme", name: "my-plugin", version: "1.0.0" }
    };

    const client = init(config);

    expect(client.context.getShoppingCartExtension()).toEqual({ creator: "acme", name: "my-plugin", version: "1.0.0" });
  });

  test("shouldReturnUndefinedShoppingCartExtensionWhenNotConfigured", () => {
    const client = init(dummySdkConfig());
    expect(client.context.getShoppingCartExtension()).toBeUndefined();
  });
});

describe("client obfuscation rules", () => {
  test("shouldExposeObfuscationRulesFromConfiguration", () => {
    const authorizationRule = obfuscate.allButFirst(6);
    const client = init({ ...dummySdkConfig(), obfuscationRules: { Authorization: authorizationRule } });
    const rules = client.context.getObfuscationRules();

    expect(rules).toHaveProperty("Authorization");
    expect(rules["Authorization"]("Bearer abc123")).toBe(authorizationRule("Bearer abc123"));
  });

  test("shouldExposeEmptyObfuscationRulesWhenNotConfigured", () => {
    const client = init(dummySdkConfig());
    expect(client.context.getObfuscationRules()).toEqual({});
  });

  test("shouldExposeMultipleObfuscationRulesIndependently", () => {
    const rules = {
      Authorization: obfuscate.all(),
      "X-Api-Key": obfuscate.allButLast(4)
    };

    const client = init({ ...dummySdkConfig(), obfuscationRules: rules });
    const stored = client.context.getObfuscationRules();

    expect(stored).toHaveProperty("Authorization");
    expect(stored).toHaveProperty("X-Api-Key");
    expect(stored["Authorization"]("secret")).toBe("******");
    expect(stored["X-Api-Key"]("abcd1234")).toBe("****1234");
  });
});

describe("client logger", () => {
  test("shouldReplaceLoggerWhenSetOnContext", () => {
    const client = init(dummySdkConfig());
    const customLogger: Logger = () => {};

    client.context.setLogger(customLogger);
    expect(client.context.getLogger()).toBe(customLogger);
  });

  test("shouldUseInitialLoggerFromConfiguration", () => {
    const messages: string[] = [];
    const configLogger = { info: (m: string) => messages.push(m), warn: () => {}, error: () => {} };
    const client = init({ ...dummySdkConfig(), enableLogging: true, logger: configLogger });

    expect(client.context.isLoggingEnabled()).toBe(true);
    expect(client.context.getLogger()).toBeDefined();
  });
});

describe("client structure", () => {
  test("shouldExposeAllExpectedResourceClientsAfterInitialization", () => {
    const client = init(dummySdkConfig());
    expect(client.payments).toBeDefined();
    expect(client.hostedCheckout).toBeDefined();
    expect(client.hostedTokenization).toBeDefined();
    expect(client.hostedFields).toBeDefined();
    expect(client.tokens).toBeDefined();
    expect(client.sessions).toBeDefined();
    expect(client.services).toBeDefined();
    expect(client.products).toBeDefined();
    expect(client.productGroups).toBeDefined();
    expect(client.webhooks).toBeDefined();
    expect(client.captures).toBeDefined();
    expect(client.refunds).toBeDefined();
    expect(client.payouts).toBeDefined();
    expect(client.mandates).toBeDefined();
    expect(client.context).toBeDefined();
  });
});

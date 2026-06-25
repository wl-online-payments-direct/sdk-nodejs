import { Configuration } from "../../../src";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

/**
 * @group unit:context
 */
describe("context.integrator", () => {
  test("must not be empty", () => {
    const configuration: Configuration = dummySdkConfig();
    configuration.integrator = "";

    expect(() => newSdkContext(configuration)).toThrowError("integrator is required");
  });

  test("can be set", () => {
    const configuration: Configuration = dummySdkConfig();
    configuration.integrator = "test-integrator";
    const sdkContext = newSdkContext(configuration);

    expect(sdkContext.getIntegrator()).toBe(configuration.integrator);
  });
});

describe("context.shoppingCartExtension", () => {
  const input = [
    ["", "test-name", "test-version"],
    ["test-creator", "", "test-version"],
    ["test-creator", "test-name", ""]
  ];
  test.each(input)("must not have an empty creator, name or version", (creator, name, version) => {
    const configuration: Configuration = dummySdkConfig();
    configuration.shoppingCartExtension = {
      creator,
      name,
      version
    };

    expect(() => newSdkContext(configuration)).toThrowError(
      "shoppingCartExtension is missing a required property (creator / name / version). Your shoppingCartExtension: " + JSON.stringify(configuration.shoppingCartExtension)
    );
  });

  test("shouldThrowWhenCreatorIsNull", () => {
    const configuration: Configuration = dummySdkConfig();
    configuration.shoppingCartExtension = { creator: null as any, name: "name", version: "1.0" };

    expect(() => newSdkContext(configuration)).toThrow();
  });

  test("shouldThrowWhenNameIsNull", () => {
    const configuration: Configuration = dummySdkConfig();
    configuration.shoppingCartExtension = { creator: "creator", name: null as any, version: "1.0" };

    expect(() => newSdkContext(configuration)).toThrow();
  });

  test("shouldThrowWhenVersionIsNull", () => {
    const configuration: Configuration = dummySdkConfig();
    configuration.shoppingCartExtension = { creator: "creator", name: "name", version: null as any };

    expect(() => newSdkContext(configuration)).toThrow();
  });

  test("can be set", () => {
    const configuration: Configuration = dummySdkConfig();
    configuration.shoppingCartExtension = {
      creator: "test-creator",
      name: "test-name",
      version: "test-version"
    };
    const sdkContext = newSdkContext(configuration);
    expect(sdkContext.getShoppingCartExtension()).toStrictEqual(configuration.shoppingCartExtension);
  });
});

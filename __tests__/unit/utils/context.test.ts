import { Configuration } from "../../../src/model";
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

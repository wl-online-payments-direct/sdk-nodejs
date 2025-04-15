import { init as SDKInit } from "../../src";
import { sdkConfig } from "../auth_config";
import config from "../config.json";

jest.setTimeout(60 * 1000);

const client = SDKInit(sdkConfig(config));

export { config };

export default client;

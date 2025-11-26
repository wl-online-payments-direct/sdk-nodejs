import fs from "fs";
import path from "path";
import { init as SDKInit } from "../../src";
import { sdkConfig } from "../auth_config";
import config from "../config.json";

jest.setTimeout(60 * 1000);

// Read port from server metadata (set by global setup)
const metadataPath = path.join(__dirname, "__setup__", "server-metadata.json");
const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8")) as { port: number };

config.apiEndpoint = {
  host: "localhost",
  scheme: "http",
  port: metadata.port
};

const client = SDKInit(sdkConfig(config));

export { config };

export default client;

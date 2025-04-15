import { Configuration, V1HmacConfiguration } from "../src/model";

export function sdkConfig(config, host?: string | null, scheme?: string | null, port?: number | null, integrator?: string | null): Configuration {
  return {
    host: host ?? config.apiEndpoint.host,
    scheme: scheme ?? config.apiEndpoint.scheme,
    port: port ?? config.apiEndpoint.port,
    enableLogging: config.enableLogging, // defaults to false
    apiKeyId: config.v1hmac.apiKey,
    secretApiKey: config.v1hmac.secretApiKey,
    integrator: integrator ?? config.integrator,
    proxy: config.proxy
  };
}

export function dummySdkConfig(): V1HmacConfiguration {
  return {
    host: "test",
    scheme: "http",
    port: 80,
    enableLogging: false,
    apiKeyId: "dummy",
    secretApiKey: "dummy",
    integrator: "dummy"
  };
}

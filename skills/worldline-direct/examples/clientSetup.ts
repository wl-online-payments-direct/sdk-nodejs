import https from "https";
import { Duplex } from "stream";
import { Client, init } from "onlinepayments-sdk-nodejs";

// [START client-setup]
// Create the client once when the application starts and reuse it for every request.
// Call createClient, getMerchantId and getPublicBaseUrl at startup: a missing or invalid setting then stops the
// application with a message that names it, instead of failing on the first customer's request.
export function createClient(): Client {
  return init({
    // Test or live endpoint, e.g. https://payment.direct.ecom.preprod.worldline-solutions.com. The SDK takes the host
    // name only; the scheme defaults to https and the port to 443.
    host: requiredUrl("ONLINEPAYMENTS_API_ENDPOINT").hostname,
    apiKeyId: requiredEnv("ONLINEPAYMENTS_API_KEY_ID"),
    secretApiKey: requiredEnv("ONLINEPAYMENTS_API_SECRET"),
    // Required: init() throws "integrator is required" without it (it only tests that the value is not empty, so
    // validate it yourself, as here). Your company or application name; it identifies your requests in the platform logs.
    integrator: requiredEnv("ONLINEPAYMENTS_INTEGRATOR"),
    // The agent holds the connection pool and the timeout (in milliseconds).
    connectionOptions: { agent: createAgent(300000) }
  });
}

// The merchant ID is your PSPID. Every API call takes it as its first argument.
export function getMerchantId(): string {
  return requiredEnv("ONLINEPAYMENTS_MERCHANT_ID");
}

// The SDK has no timeout setting, and the timeout option of an agent alone does not stop a request: without this,
// a call can wait forever. This agent closes a connection that has been inactive for timeoutMs milliseconds; the
// call then rejects with "socket hang up" (code ECONNRESET), like any other connection error.
function createAgent(timeoutMs: number): https.Agent {
  const agent = new https.Agent({ keepAlive: true, timeout: timeoutMs });
  // createConnection is a documented Agent method that custom agents may override; older @types/node versions do
  // not declare it.
  const connections = (agent as unknown) as { createConnection: CreateConnection };
  const createConnection = connections.createConnection.bind(agent);
  connections.createConnection = (options, callback) => {
    const socket = createConnection(options, callback);
    socket?.on("timeout", () => socket.destroy());
    return socket;
  };
  return agent;
}

type CreateConnection = (options: https.RequestOptions, callback?: (error: Error | null, socket: Duplex) => void) => Duplex | null | undefined;

// The public base URL of your shop, e.g. https://shop.example. Return URLs are built from it, never from the Host
// header of a request. Origin and path only, without a trailing slash.
export function getPublicBaseUrl(): string {
  const url = requiredUrl("SHOP_PUBLIC_BASE_URL");
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`Configuration error: SHOP_PUBLIC_BASE_URL must be an http:// or https:// URL`);
  }
  return url.origin + url.pathname.replace(/\/+$/, "");
}

// Read settings from the environment, filled from a secret store of your platform. For local development keep the
// secrets in your shell or run configuration, never in a file in the repository. A blank value counts as missing.
export function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Configuration error: environment variable ${name} is not set or blank`);
  }
  return value;
}

export function requiredUrl(name: string): URL {
  const value = requiredEnv(name);
  try {
    return new URL(value);
  } catch {
    // Do not repeat the value: a URL can hold credentials.
    throw new Error(`Configuration error: ${name} must be an absolute URL, e.g. https://shop.example`);
  }
}
// [END client-setup]

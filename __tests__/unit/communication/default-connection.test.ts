import http from "http";
import https from "https";
import nock from "nock";
import { ProxyConfiguration, SdkContext } from "../../../src";
import connection from "../../../src/utils/connection";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

/**
 * @group communication
 */
describe("default connection", () => {
  describe("applyProxyConfiguration", () => {
    test("shouldConstructWithoutProxy", () => {
      const options: https.RequestOptions = { host: "api.example.com", protocol: "https:", port: 443, method: "GET", path: "/v1/resource" };
      const before = { ...options };

      connection.applyProxyConfiguration(options);

      expect(options).toEqual(before);
    });

    test("shouldConstructWithProxyWithoutAuthentication", () => {
      const options: https.RequestOptions = { host: "api.example.com", protocol: "https:", port: 443, method: "GET", path: "/v1/resource" };
      const proxy: ProxyConfiguration = { host: "proxy.example.com", scheme: "http", port: 8080 };

      connection.applyProxyConfiguration(options, proxy);

      expect(options.path).toBe("https://api.example.com:443/v1/resource");
      expect(options.host).toBe("proxy.example.com");
      expect(options.protocol).toBe("http:");
      expect(options.port).toBe(8080);
      expect((options.headers as Record<string, string> | undefined)?.["Proxy-Authorization"]).toBeUndefined();
    });

    test("shouldConstructWithProxyWithAuthentication", () => {
      const options: https.RequestOptions = { host: "api.example.com", protocol: "https:", port: 443, method: "GET", path: "/v1/resource" };
      const credentials = "user:password";
      const proxy: ProxyConfiguration = { host: "proxy.example.com", scheme: "http", port: 8080, credentials };

      connection.applyProxyConfiguration(options, proxy);

      expect(options.path).toBe("https://api.example.com:443/v1/resource");
      expect(options.host).toBe("proxy.example.com");
      expect(options.protocol).toBe("http:");
      expect(options.port).toBe(8080);
      expect((options.headers as Record<string, string>)["Proxy-Authorization"]).toBe("Basic " + Buffer.from(credentials).toString("base64"));
    });

    test("shouldConstructWithProxyWithAuthenticationWithHandler", () => {
      const options: https.RequestOptions = { host: "api.example.com", protocol: "https:", port: 443, method: "GET", path: "/v1/resource" };
      const credentials = "user:password";
      const proxy: ProxyConfiguration = { host: "proxy.example.com", scheme: "http", port: 8080, credentials };
      const agent = new http.Agent();

      connection.applyProxyConfiguration(options, proxy);
      connection.applyConnectionOptions(options, { agent });

      expect(options.host).toBe("proxy.example.com");
      expect((options.headers as Record<string, string>)["Proxy-Authorization"]).toBe("Basic " + Buffer.from(credentials).toString("base64"));
      expect(options.agent).toBe(agent);
    });
  });

  describe("applyConnectionOptions", () => {
    test("shouldApplyHttpsAgentWithTlsSettings", () => {
      const options: https.RequestOptions = { host: "api.example.com", protocol: "https:", port: 443, method: "GET", path: "/v1/resource" };
      const agent = new https.Agent({ minVersion: "TLSv1.2", maxVersion: "TLSv1.3" });

      connection.applyConnectionOptions(options, { agent });

      expect(options.agent).toBe(agent);
    });
  });

  describe("sendJSON", () => {
    let sdkContext: SdkContext;

    beforeAll(() => {
      nock.disableNetConnect();
      const sdkConfig = dummySdkConfig();
      sdkContext = newSdkContext(sdkConfig);
    });

    afterAll(() => {
      nock.enableNetConnect();
    });

    afterEach(() => {
      nock.cleanAll();
    });

    test("shouldCallbackWithErrorWhenRequestTimesOut", done => {
      nock("http://test")
        .get("/timeout")
        .replyWithError({ code: "ETIMEDOUT", message: "socket hang up" });
      const options: https.RequestOptions = { host: "test", protocol: "http:", port: 80, method: "GET", path: "/timeout" };

      connection.sendJSON(options, null, sdkContext, (error, response) => {
        expect(error).not.toBeNull();
        expect(response).toBeNull();
        done();
      });
    });

    test("shouldCallbackWithErrorWhenConnectionFails", done => {
      nock("http://test")
        .get("/connect-error")
        .replyWithError({ code: "ECONNREFUSED", message: "Connection refused" });
      const options: https.RequestOptions = { host: "test", protocol: "http:", port: 80, method: "GET", path: "/connect-error" };

      connection.sendJSON(options, null, sdkContext, (error, response) => {
        expect(error).not.toBeNull();
        expect(response).toBeNull();
        done();
      });
    });
  });
});

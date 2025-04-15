/* eslint-disable @typescript-eslint/no-non-null-assertion */

import https from "https";
import nock from "nock";
import { SdkContext } from "../../../src/model";
import connection from "../../../src/utils/connection";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

describe("connection logging", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const capturedLogs: { level: string; message: any }[] = [];
  const logger = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: (message: any): void => {
      capturedLogs.push({ level: "info", message: message });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn: (message: any): void => {
      capturedLogs.push({ level: "warn", message: message });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: (message: any): void => {
      capturedLogs.push({ level: "error", message: message });
    }
  };
  let sdkContext: SdkContext;

  beforeAll(() => {
    const sdkConfig = dummySdkConfig();
    sdkConfig.enableLogging = true;
    sdkConfig.logger = logger;

    sdkContext = newSdkContext(sdkConfig);
  });
  beforeEach(() => {
    capturedLogs.length = 0;
  });

  describe("for sendJSON", () => {
    test("with no request body", done => {
      const path = "/no-request-body";
      nock("http://test")
        .get(path)
        .reply(200, {
          id: 1
        });
      const options: https.RequestOptions = {
        host: "test",
        protocol: "https",
        port: 80,
        method: "GET",
        path: path
      };

      connection.sendJSON(options, null, sdkContext, (error, response) => {
        expect(error).toBeNull();
        expect(response).not.toBeNull();

        // Only request logging is performed' response logging is done when the output is consumed
        expect(capturedLogs.length).toBe(1);
        expect(capturedLogs[0].level).toBe("info");
        expect(capturedLogs[0].message).toMatch(new RegExp(`Request with Message ID: .*, GET to ${path}, headers: .*, body: `, "s"));

        response!.on("end", () => {
          done();
        });
      });
    });

    test("with request body", done => {
      const path = "/request-body";
      nock("http://test")
        .post(path)
        .reply(200, {
          id: 1
        });
      const options: https.RequestOptions = {
        host: "test",
        protocol: "https",
        port: 80,
        method: "POST",
        path: path
      };

      const postData = {
        id: 1
      };
      const postDataString = JSON.stringify(postData, null, 2);
      connection.sendJSON(options, postData, sdkContext, (error, response) => {
        expect(error).toBeNull();
        expect(response).not.toBeNull();

        // Only request logging is performed' response logging is done when the output is consumed
        expect(capturedLogs.length).toBe(1);
        expect(capturedLogs[0].level).toBe("info");
        expect(capturedLogs[0].message).toMatch(new RegExp(`Request with Message ID: .*, POST to ${path}, headers: .*, body: ${postDataString}`, "s"));

        response!.on("end", () => {
          done();
        });
      });
    });
  });

  test("for sendMultipart", done => {
    const path = "/multipart";
    nock("http://test")
      .post(path)
      .reply(200, {
        id: 1
      });
    const options: https.RequestOptions = {
      host: "test",
      protocol: "https",
      port: 80,
      method: "POST",
      path: path
    };

    const postData = {
      value: "foo"
    };
    connection.sendMultipart(options, postData, "boundary", sdkContext, (error, response) => {
      expect(error).toBeNull();
      expect(response).not.toBeNull();

      // Only request logging is performed' response logging is done when the output is consumed
      expect(capturedLogs.length).toBe(1);
      expect(capturedLogs[0].level).toBe("info");
      expect(capturedLogs[0].message).toMatch(new RegExp(`Request with Message ID: .*, POST to ${path}, headers: .*, body: <binary data>`, "s"));

      response!.on("end", () => {
        done();
      });
    });
  });

  test("with no response body", done => {
    const path = "/no-response-body";
    nock("http://test")
      .get(path)
      .reply(204);
    const options: https.RequestOptions = {
      host: "test",
      protocol: "https",
      port: 80,
      method: "GET",
      path: path
    };

    connection.sendJSON(options, null, sdkContext, (error, response) => {
      expect(error).toBeNull();
      expect(response).not.toBeNull();

      response!.on("end", () => {
        expect(capturedLogs.length).toBe(2);

        const requestRegex = new RegExp(`Request with Message ID: (.*), GET to ${path}, headers: .*, body: `, "s");
        expect(capturedLogs[0].level).toBe("info");
        expect(capturedLogs[0].message).toMatch(requestRegex);

        const messageId = requestRegex.exec(capturedLogs[0].message)![1];
        expect(capturedLogs[1].level).toBe("info");
        expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 204, headers: .*, body: `, "s"));

        done();
      });
    });
  });

  test("with JSON response body", done => {
    const path = "/json-response-body";
    const responseBody = {
      id: 1
    };
    nock("http://test")
      .get(path)
      .reply(200, responseBody);
    const options: https.RequestOptions = {
      host: "test",
      protocol: "https",
      port: 80,
      method: "GET",
      path: path
    };

    const responseBodyString = JSON.stringify(responseBody, null, 2);
    connection.sendJSON(options, null, sdkContext, (error, response) => {
      expect(error).toBeNull();
      expect(response).not.toBeNull();

      response!.on("end", () => {
        expect(capturedLogs.length).toBe(2);

        const requestRegex = new RegExp(`Request with Message ID: (.*), GET to ${path}, headers: .*, body: `, "s");
        expect(capturedLogs[0].level).toBe("info");
        expect(capturedLogs[0].message).toMatch(requestRegex);

        const messageId = requestRegex.exec(capturedLogs[0].message)![1];
        expect(capturedLogs[1].level).toBe("info");
        expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 200, headers: .*, body: ${responseBodyString}`, "s"));

        done();
      });
    });
  });

  test("with binary response body", done => {
    const path = "/binary-response-body";
    const responseBody = "Test response";
    const contentLength = responseBody.length;
    const contentType = "application/octet-stream";
    const filename = "file.txt";
    nock("http://test")
      .get(path)
      .reply(200, responseBody, {
        "Content-Type": contentType,
        "Content-Length": contentLength.toString(),
        "Content-Disposition": `attachment; filename="${filename}"`
      });
    const options: https.RequestOptions = {
      host: "test",
      protocol: "https",
      port: 80,
      method: "GET",
      path: path
    };

    connection.sendJSON(options, null, sdkContext, (error, response) => {
      expect(error).toBeNull();
      expect(response).not.toBeNull();

      // No JSON response, so the data must be read explicitly
      let data = "";
      response!.on("data", chunk => {
        data += chunk;
      });
      response!.on("end", () => {
        expect(capturedLogs.length).toBe(2);

        const requestRegex = new RegExp(`Request with Message ID: (.*), GET to ${path}, headers: .*, body: `, "s");
        expect(capturedLogs[0].level).toBe("info");
        expect(capturedLogs[0].message).toMatch(requestRegex);

        const messageId = requestRegex.exec(capturedLogs[0].message)![1];
        expect(capturedLogs[1].level).toBe("info");
        expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 200, headers: .*, body: <binary content>`, "s"));

        expect(data).toBe(responseBody);

        done();
      });
    });
  });

  test("with error", done => {
    const path = "/error";
    const errorMessage = "Unknown error occurred";
    nock("http://test")
      .get(path)
      .replyWithError(errorMessage);
    const options: https.RequestOptions = {
      host: "test",
      protocol: "https",
      port: 80,
      method: "GET",
      path: path
    };

    connection.sendJSON(options, null, sdkContext, (error, response) => {
      expect(error).not.toBeNull();
      expect(response).toBeNull();

      expect(capturedLogs.length).toBe(2);

      const requestRegex = new RegExp(`Request with Message ID: (.*), GET to ${path}, headers: .*, body: `, "s");
      expect(capturedLogs[0].level).toBe("info");
      expect(capturedLogs[0].message).toMatch(requestRegex);

      const messageId = requestRegex.exec(capturedLogs[0].message)![1];
      const errorString = JSON.stringify(error);
      expect(capturedLogs[1].level).toBe("error");
      // Space between ID: and the message id is indeed missing...
      expect(capturedLogs[1].message).toMatch(new RegExp(`Error for Message ID:${messageId}, error: ${errorString}`, "s"));

      done();
    });
  });
});

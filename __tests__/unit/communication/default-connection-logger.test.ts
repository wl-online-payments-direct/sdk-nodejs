import http from "http";
import https from "https";
import nock from "nock";
import { MultipartFormDataObject, SdkContext } from "../../../src";
import connection from "../../../src/utils/connection";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

/**
 * @group communication
 */
describe("connection logging", () => {
  const capturedLogs: { level: string; message: any }[] = [];
  const logger = {
    info: (message: any): void => {
      capturedLogs.push({ level: "info", message });
    },
    warn: (message: any): void => {
      capturedLogs.push({ level: "warn", message });
    },
    error: (message: any): void => {
      capturedLogs.push({ level: "error", message });
    }
  };

  let sdkContext: SdkContext;

  beforeAll(() => {
    nock.disableNetConnect();

    const sdkConfig = dummySdkConfig();
    sdkConfig.enableLogging = true;
    sdkConfig.logger = logger;
    sdkContext = newSdkContext(sdkConfig);
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  beforeEach(() => {
    capturedLogs.length = 0;
    sdkContext.setEnableLogging(true);
  });

  function callSendJSON(options: https.RequestOptions, data: object | null = null): Promise<{ error: Error | null; response: http.IncomingMessage | null }> {
    return new Promise(resolve => {
      connection.sendJSON(options, data, sdkContext, (error, response) => resolve({ error, response }));
    });
  }

  function callSendMultipart(
    options: https.RequestOptions,
    data: MultipartFormDataObject,
    boundary: string
  ): Promise<{ error: Error | null; response: http.IncomingMessage | null }> {
    return new Promise(resolve => {
      connection.sendMultipart(options, data, boundary, sdkContext, (error, response) => resolve({ error, response }));
    });
  }

  function consumeBody(response: http.IncomingMessage): Promise<string> {
    return new Promise(resolve => {
      let body = "";
      response.on("data", chunk => {
        body += chunk;
      });
      response.on("end", () => resolve(body));
    });
  }

  describe("for sendJSON", () => {
    test("shouldLogRequestWhenSendingGetRequestWithoutQueryParameters", async () => {
      const path = "/no-request-body";
      nock("http://test")
        .get(path)
        .reply(200, { id: 1 });
      const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

      const { error, response } = await callSendJSON(options);
      expect(error).toBeNull();
      expect(response).not.toBeNull();
      expect(capturedLogs.length).toBe(1);
      expect(capturedLogs[0].level).toBe("info");
      expect(capturedLogs[0].message).toMatch(new RegExp(`Request with Message ID: .*, GET to ${path}, headers: .*, body: `, "s"));

      await consumeBody(response!);
    });

    test("shouldLogRequestWhenSendingPostRequestWithBody", async () => {
      const path = "/request-body";
      nock("http://test")
        .post(path)
        .reply(200, { id: 1 });
      const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "POST", path };

      const postData = { id: 1 };
      const postDataString = JSON.stringify(postData, null, 2);
      const { error, response } = await callSendJSON(options, postData);

      expect(error).toBeNull();
      expect(response).not.toBeNull();
      expect(capturedLogs.length).toBe(1);
      expect(capturedLogs[0].level).toBe("info");
      expect(capturedLogs[0].message).toMatch(new RegExp(`Request with Message ID: .*, POST to ${path}, headers: .*, body: ${postDataString}`, "s"));

      await consumeBody(response!);
    });
  });

  test("shouldLogRequestWhenSendingMultipartRequest", async () => {
    const path = "/multipart";
    nock("http://test")
      .post(path)
      .reply(200, { id: 1 });
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "POST", path };

    const postData = { value: "foo" };
    const { error, response } = await callSendMultipart(options, postData, "boundary");

    expect(error).toBeNull();
    expect(response).not.toBeNull();
    expect(capturedLogs.length).toBe(1);
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(new RegExp(`Request with Message ID: .*, POST to ${path}, headers: .*, body: <binary data>`, "s"));

    await consumeBody(response!);
  });

  test("shouldLogRequestAndResponseWhenReceivingNoContentResponse", async () => {
    const path = "/no-response-body";
    nock("http://test")
      .get(path)
      .reply(204);
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

    const { error, response } = await callSendJSON(options);
    expect(error).toBeNull();
    expect(response).not.toBeNull();

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), GET to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 204, headers: .*, body: `, "s"));
  });

  test("shouldLogRequestAndResponseWhenReceivingJsonResponseBody", async () => {
    const path = "/json-response-body";
    const responseBody = { id: 1 };
    nock("http://test")
      .get(path)
      .reply(200, responseBody);
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

    const responseBodyString = JSON.stringify(responseBody, null, 2);
    const { error, response } = await callSendJSON(options);
    expect(error).toBeNull();
    expect(response).not.toBeNull();

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), GET to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 200, headers: .*, body: ${responseBodyString}`, "s"));
  });

  test("shouldLogRequestAndResponseWhenReceivingBinaryResponseBody", async () => {
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

    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

    const { error, response } = await callSendJSON(options);
    expect(error).toBeNull();
    expect(response).not.toBeNull();

    const data = await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), GET to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 200, headers: .*, body: <binary content>`, "s"));

    expect(data).toBe(responseBody);
  });

  test("shouldLogRequestAndErrorWhenRequestFailsWithNetworkError", async () => {
    const path = "/error";
    const errorMessage = "Unknown error occurred";
    nock("http://test")
      .get(path)
      .replyWithError(errorMessage);
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

    const { error, response } = await callSendJSON(options);
    expect(error).not.toBeNull();
    expect(response).toBeNull();

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), GET to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    const errorString = JSON.stringify(error);
    expect(capturedLogs[1].level).toBe("error");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Error for Message ID:${messageId}, error: ${errorString}`, "s"));
  });

  test("shouldLogRequestWhenSendingGetRequestWithQueryParameters", async () => {
    const path = "/get-with-query-params?amount=123&source=USD";
    nock("http://test")
      .get(path)
      .reply(200, { id: 1 });
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

    const { error, response } = await callSendJSON(options);
    expect(error).toBeNull();
    expect(capturedLogs.length).toBe(1);
    expect(capturedLogs[0].message).toMatch(new RegExp(`Request with Message ID: .*, GET to ${path.replace("?", "\\?")}, headers: .*, body: `, "s"));

    await consumeBody(response!);
  });

  test("shouldLogRequestAndResponseWhenReceivingBadRequestResponse", async () => {
    const path = "/bad-request";
    const responseBody = { errorCode: "INVALID_REQUEST", message: "Bad request" };
    nock("http://test")
      .post(path)
      .reply(400, responseBody);
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "POST", path };

    const responseBodyString = JSON.stringify(responseBody, null, 2);
    const { error, response } = await callSendJSON(options);
    expect(error).toBeNull();

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), POST to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 400, headers: .*, body: ${responseBodyString}`, "s"));
  });

  test("shouldLogRequestAndResponseWhenReceivingServerErrorResponse", async () => {
    const path = "/server-error";
    const responseBody = { errorCode: "SERVER_ERROR" };
    nock("http://test")
      .get(path)
      .reply(500, responseBody);
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

    const responseBodyString = JSON.stringify(responseBody, null, 2);
    const { error, response } = await callSendJSON(options);
    expect(error).toBeNull();

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), GET to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 500, headers: .*, body: ${responseBodyString}`, "s"));
  });

  test("shouldLogRequestAndResponseWhenReceivingNonJsonResponseBody", async () => {
    const path = "/non-json";
    const responseBody = '<html lang="en">Not found</html>';
    nock("http://test")
      .get(path)
      .reply(200, responseBody, { "Content-Type": "text/html" });
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

    const { error, response } = await callSendJSON(options);
    expect(error).toBeNull();

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), GET to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 200, headers: .*, body: ${responseBody}`, "s"));
  });

  test("shouldLogRequestAndErrorWhenRequestTimesOut", async () => {
    const path = "/timeout";
    nock("http://test")
      .get(path)
      .replyWithError({ code: "ETIMEDOUT", message: "socket hang up" });
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

    const { error, response } = await callSendJSON(options);
    expect(error).not.toBeNull();
    expect(response).toBeNull();

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), GET to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("error");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Error for Message ID:${messageId}, error: `, "s"));
  });

  test("shouldLogOnlyRequestWhenLoggingIsDisabledBeforeResponseIsConsumed", async () => {
    const path = "/log-request-only";
    nock("http://test")
      .get(path)
      .reply(200, { id: 1 });
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

    const { response } = await callSendJSON(options);
    sdkContext.setEnableLogging(false);

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(1);
    expect(capturedLogs[0].message).toMatch(/Request with Message ID:/);
  });

  test("shouldLogRequestAndResponseWhenSendingGetRequestWithQueryParameters", async () => {
    const path = "/get-with-query-params-full?amount=123&source=USD";
    const responseBody = { id: 1 };
    nock("http://test")
      .get(path)
      .reply(200, responseBody);
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

    const responseBodyString = JSON.stringify(responseBody, null, 2);
    const { error, response } = await callSendJSON(options);
    expect(error).toBeNull();

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), GET to ${path.replace("?", "\\?")}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 200, headers: .*, body: ${responseBodyString}`, "s"));
  });

  test("shouldLogRequestAndResponseWhenSendingDeleteRequestWithNoContentResponse", async () => {
    const path = "/delete-void";
    nock("http://test")
      .delete(path)
      .reply(204);
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "DELETE", path };

    const { error, response } = await callSendJSON(options);
    expect(error).toBeNull();
    expect(response).not.toBeNull();

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), DELETE to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 204, headers: .*, body: `, "s"));
  });

  test("shouldLogRequestAndResponseWhenSendingPostRequestWithCreatedResponse", async () => {
    const path = "/post-created";
    const requestBody = { amount: 100 };
    const responseBody = { id: "payment-123", status: "CREATED" };
    nock("http://test")
      .post(path)
      .reply(201, responseBody);
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "POST", path };

    const responseBodyString = JSON.stringify(responseBody, null, 2);
    const { error, response } = await callSendJSON(options, requestBody);
    expect(error).toBeNull();
    expect(response).not.toBeNull();

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), POST to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 201, headers: .*, body: ${responseBodyString}`, "s"));
  });

  test("shouldLogRequestAndResponseWhenSendingPutRequestWithSuccessResponse", async () => {
    const path = "/put-success";
    const requestBody = { amount: 200 };
    const responseBody = { id: "payment-123", status: "UPDATED" };
    nock("http://test")
      .put(path)
      .reply(200, responseBody);
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "PUT", path };

    const responseBodyString = JSON.stringify(responseBody, null, 2);
    const { error, response } = await callSendJSON(options, requestBody);
    expect(error).toBeNull();
    expect(response).not.toBeNull();

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), PUT to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 200, headers: .*, body: ${responseBodyString}`, "s"));
  });

  test("shouldLogRequestAndResponseWhenSendingPutRequestWithBadRequestResponse", async () => {
    const path = "/put-bad-request";
    const requestBody = { amount: -1 };
    const responseBody = { errorCode: "INVALID_REQUEST", message: "Amount must be positive" };
    nock("http://test")
      .put(path)
      .reply(400, responseBody);
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "PUT", path };

    const responseBodyString = JSON.stringify(responseBody, null, 2);
    const { error, response } = await callSendJSON(options, requestBody);
    expect(error).toBeNull();
    expect(response).not.toBeNull();

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), PUT to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 400, headers: .*, body: ${responseBodyString}`, "s"));
  });

  test("shouldLogRequestAndResponseWhenSendingBinaryRequestWithKnownContentLength", async () => {
    const path = "/binary-request-known-length";
    const responseBody = { status: "uploaded" };
    nock("http://test")
      .post(path)
      .reply(200, responseBody);
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "POST", path };

    const content = Buffer.from("file content");
    const postData: MultipartFormDataObject = {
      file: { fileName: "test.txt", contentType: "text/plain", content, contentLength: content.length }
    };

    const responseBodyString = JSON.stringify(responseBody, null, 2);
    const { error, response } = await callSendMultipart(options, postData, "boundary-known");
    expect(error).toBeNull();
    expect(response).not.toBeNull();

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), POST to ${path}, headers: .*, body: <binary data>`, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 200, headers: .*, body: ${responseBodyString}`, "s"));
  });

  test("shouldLogRequestAndResponseWhenSendingBinaryRequestWithUnknownContentLength", async () => {
    const path = "/binary-request-unknown-length";
    const responseBody = { status: "uploaded" };
    nock("http://test")
      .post(path)
      .reply(200, responseBody);
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "POST", path };

    const content = Buffer.from("file content");
    const postData: MultipartFormDataObject = {
      file: { fileName: "test.txt", contentType: "text/plain", content }
    };

    const responseBodyString = JSON.stringify(responseBody, null, 2);
    const { error, response } = await callSendMultipart(options, postData, "boundary-unknown");
    expect(error).toBeNull();
    expect(response).not.toBeNull();

    await consumeBody(response!);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), POST to ${path}, headers: .*, body: <binary data>`, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 200, headers: .*, body: ${responseBodyString}`, "s"));
  });

  test("shouldLogOnlyResponseWhenLoggingIsEnabledAfterRequest", async () => {
    const path = "/log-response-only";
    nock("http://test")
      .get(path)
      .delayConnection(20)
      .reply(200, { id: 1 });
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

    sdkContext.setEnableLogging(false);

    const responsePromise = callSendJSON(options);

    setImmediate(() => {
      sdkContext.setEnableLogging(true);
    });

    const { response } = await responsePromise;
    await consumeBody(response!);

    expect(capturedLogs.length).toBe(1);
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(/Response from Message ID:/);
  });

  test("shouldLogOnlyErrorWhenLoggingIsEnabledBeforeError", async () => {
    const path = "/log-error-only";
    nock("http://test")
      .get(path)
      .delayConnection(20)
      .replyWithError("Network failure");
    const options: https.RequestOptions = { host: "test", protocol: "https", port: 80, method: "GET", path };

    sdkContext.setEnableLogging(false);

    const responsePromise = callSendJSON(options);

    setImmediate(() => {
      sdkContext.setEnableLogging(true);
    });

    const { error, response } = await responsePromise;
    expect(error).not.toBeNull();
    expect(response).toBeNull();

    expect(capturedLogs.length).toBe(1);
    expect(capturedLogs[0].level).toBe("error");
    expect(capturedLogs[0].message).toMatch(/Error for Message ID:/);
  });
});

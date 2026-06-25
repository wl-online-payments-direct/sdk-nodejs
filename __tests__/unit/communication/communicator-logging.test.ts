import nock from "nock";
import { SdkContext } from "../../../src";
import communicator from "../../../src/utils/communicator";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

/**
 * @group communicator
 */
describe("communicator logging", () => {
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
    sdkContext = newSdkContext({ ...dummySdkConfig(), enableLogging: true, logger });
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

  test("shouldLogRequestsAndResponsesOnlyWhileLoggingIsEnabled", async () => {
    nock("http://test")
      .get("/test")
      .reply(200, { id: 1 });
    await communicator.json({ method: "GET", modulePath: "/test" }, sdkContext);
    const logsWhileEnabled = capturedLogs.length;
    expect(logsWhileEnabled).toBeGreaterThan(0);

    capturedLogs.length = 0;
    sdkContext.setEnableLogging(false);
    nock("http://test")
      .get("/test")
      .reply(200, { id: 1 });
    await communicator.json({ method: "GET", modulePath: "/test" }, sdkContext);
    expect(capturedLogs.length).toBe(0);
  });

  test("shouldLogSuccessfulPostRequestAndResponseWithObfuscation", async () => {
    const path = "/api/payments";
    const responseBody = { id: "payment-1", status: "CREATED" };
    nock("http://test")
      .post(path)
      .reply(201, responseBody);

    await communicator.json({ method: "POST", modulePath: path, body: { amount: 100 } }, sdkContext);

    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), POST to ${path}, headers: .*, body: `, "s");
    expect(capturedLogs[0].level).toBe("info");
    expect(capturedLogs[0].message).toMatch(requestRegex);

    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].level).toBe("info");
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 201, headers: .*, body: `, "s"));
  });

  test("shouldLogSuccessfulUtf8ResponseWithObfuscation", async () => {
    const path = "/api/utf8";
    const responseBody = { message: "Héllo wörld: 日本語 テスト" };
    nock("http://test")
      .get(path)
      .reply(200, responseBody);

    await communicator.json({ method: "GET", modulePath: path }, sdkContext);

    expect(capturedLogs.length).toBe(2);
    const responseBodyString = JSON.stringify(responseBody, null, 2);
    expect(capturedLogs[1].message).toContain(responseBodyString);
  });

  test("shouldLogClientErrorResponse", async () => {
    const path = "/api/resource";
    const errorBody = { errorCode: "INVALID_REQUEST", message: "Bad request" };
    nock("http://test")
      .post(path)
      .reply(400, errorBody);

    const response = await communicator.json({ method: "POST", modulePath: path, body: {} }, sdkContext);

    expect(response.isSuccess).toBe(false);
    expect(response.status).toBe(400);
    expect(capturedLogs.length).toBe(2);

    const requestRegex = new RegExp(`Request with Message ID: (.*), POST to ${path}, headers: .*, body: `, "s");
    const messageId = requestRegex.exec(capturedLogs[0].message)![1];
    expect(capturedLogs[1].message).toMatch(new RegExp(`Response from Message ID: ${messageId}, status: 400, headers: .*, body: `, "s"));
  });

  test("shouldLogInvalidResponseAndRejectWithError", async () => {
    const path = "/api/invalid";
    nock("http://test")
      .get(path)
      .reply(200, "not-json-at-all", { "Content-Type": "application/json" });

    const error = await communicator
      .json({ method: "GET", modulePath: path }, sdkContext)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(capturedLogs.length).toBe(3);
    expect(capturedLogs[0].message).toMatch(new RegExp(`Request with Message ID: .*, GET to ${path}, headers: .*, body: `, "s"));
    expect(capturedLogs[1].message).toMatch(/Cannot parse input to JSON: not-json-at-all/);
    expect(capturedLogs[2].message).toMatch(new RegExp(`Response from Message ID: .*, status: 200, headers: .*, body: `, "s"));
  });

  test("shouldLogCommunicationExceptionAlongWithOutgoingRequest", async () => {
    const path = "/api/error";
    nock("http://test")
      .get(path)
      .replyWithError("Connection refused");

    const error = await communicator
      .json({ method: "GET", modulePath: path }, sdkContext)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(capturedLogs.length).toBe(2);
    expect(capturedLogs[0].message).toMatch(new RegExp(`Request with Message ID: .*, GET to ${path}, headers: .*, body: `, "s"));
    expect(capturedLogs[1].level).toBe("error");
    expect(capturedLogs[1].message).toMatch(/Error for Message ID:/);
  });

  test("shouldLogBinaryResponseBodyAsBinaryContent", async () => {
    const path = "/api/image";
    nock("http://test")
      .get(path)
      .reply(200, Buffer.from([0x89, 0x50, 0x4e, 0x47]), { "Content-Type": "image/png" });

    const response = (await communicator.json({ method: "GET", modulePath: path }, sdkContext)) as any;

    // The response stream must be consumed to trigger the 'end' event, which fires the response log
    await new Promise<void>(resolve => (response.body as NodeJS.ReadableStream).resume().on("end", resolve));

    expect(capturedLogs.length).toBe(2);
    expect(capturedLogs[1].message).toContain("<binary content>");
  });

  test("shouldObfuscateSensitiveResponseHeaders", async () => {
    const path = "/api/sensitive";
    nock("http://test")
      .get(path)
      .reply(200, { ok: true }, { Authorization: "Bearer secret-token-12345" });

    await communicator.json({ method: "GET", modulePath: path }, sdkContext);

    expect(capturedLogs.length).toBe(2);
    const responseLog = capturedLogs[1].message;
    expect(responseLog).toContain("authorization");
    expect(responseLog).toContain("*");
    expect(responseLog).not.toContain("secret-token-12345");
  });

  test("shouldIncludeContentTypeInResponseLog", async () => {
    const path = "/api/xml";
    nock("http://test")
      .get(path)
      .reply(200, '{"ok":true}', { "Content-Type": "application/xml" });

    await communicator.json({ method: "GET", modulePath: path }, sdkContext);

    expect(capturedLogs.length).toBe(2);
    expect(capturedLogs[1].message).toContain("application/xml");
  });
});

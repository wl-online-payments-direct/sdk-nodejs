import nock from "nock";
import { Readable } from "stream";
import { SdkContext } from "../../../src";
import communicator from "../../../src/utils/communicator";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";

/**
 * @group utils
 */
describe("communicator requests", () => {
  let sdkContext: SdkContext;

  beforeAll(() => {
    sdkContext = newSdkContext(dummySdkConfig());
  });

  test("shouldConstructAbsoluteUriCorrectlyWhenNoQueryParametersAreProvided", async () => {
    nock("http://test")
      .get("/v1/merchant/20000/convertamount")
      .reply(200, { result: "ok" });

    const response = await communicator.json({ method: "GET", modulePath: "/v1/merchant/20000/convertamount" }, sdkContext);

    expect(response.status).toBe(200);
    expect(response.isSuccess).toBe(true);
  });

  test("shouldConstructAbsoluteUriWithQueryParametersWhenQueryParametersAreProvided", async () => {
    nock("http://test")
      .get("/v1/merchant/20000/convertamount")
      .query({ amount: "123", source: "USD", target: "EUR" })
      .reply(200, { result: "ok" });

    const response = await communicator.json(
      {
        method: "GET",
        modulePath: "/v1/merchant/20000/convertamount",
        paymentContext: { amount: "123", source: "USD", target: "EUR" } as any
      },
      sdkContext
    );

    expect(response.status).toBe(200);
    expect(response.isSuccess).toBe(true);
  });

  test("shouldReturnValidResponseObjectWithCorrectRequestUrlWhenApiRequestIsPost", async () => {
    nock("http://test")
      .post("/api/resource")
      .reply(200, { id: 1 });

    const response = await communicator.json({ method: "POST", modulePath: "/api/resource", body: {} }, sdkContext);

    expect(response.status).toBe(200);
    expect(response.isSuccess).toBe(true);
    expect(response.body).toHaveProperty("id", 1);
  });

  test("shouldReturnValidResponseObjectWithCorrectRequestUrlWhenApiRequestIsDelete", async () => {
    nock("http://test")
      .delete("/api/resource/1")
      .reply(200, { deleted: true });

    const response = await communicator.json({ method: "DELETE", modulePath: "/api/resource/1" }, sdkContext);

    expect(response.status).toBe(200);
    expect(response.isSuccess).toBe(true);
  });

  test("shouldReturnValidResponseObjectWithCorrectRequestUrlWhenApiRequestIsPut", async () => {
    nock("http://test")
      .put("/api/resource/1")
      .reply(200, { id: 1 });

    const response = await communicator.json({ method: "PUT", modulePath: "/api/resource/1", body: {} }, sdkContext);

    expect(response.status).toBe(200);
    expect(response.isSuccess).toBe(true);
    expect(response.body).toHaveProperty("id", 1);
  });

  test("shouldReturnNonEmptyResponseBodyWhenApiRequestIsPostWithBinaryResponse", async () => {
    nock("http://test")
      .post("/api/binary")
      .reply(200, { id: 1 });

    const response = await communicator.json({ method: "POST", modulePath: "/api/binary", body: {}, expectBinaryResponse: true }, sdkContext);

    expect(response.status).toBe(200);
    expect(response.isSuccess).toBe(true);
    expect(response.body).toBeInstanceOf(Readable);

    let content = "";
    for await (const chunk of response.body as Readable) {
      content += chunk;
    }

    expect(JSON.parse(content)).toHaveProperty("id", 1);
  });

  test("shouldReturnNonEmptyResponseBodyWhenApiRequestIsPutWithBinaryResponse", async () => {
    nock("http://test")
      .put("/api/binary")
      .reply(200, { id: 1 });

    const response = await communicator.json({ method: "PUT", modulePath: "/api/binary", body: {}, expectBinaryResponse: true }, sdkContext);

    expect(response.status).toBe(200);
    expect(response.isSuccess).toBe(true);
    expect(response.body).toBeInstanceOf(Readable);

    let content = "";
    for await (const chunk of response.body as Readable) {
      content += chunk;
    }

    expect(JSON.parse(content)).toHaveProperty("id", 1);
  });

  test("shouldReturnNonEmptyResponseBodyWhenApiRequestIsDeleteWithBinaryResponse", async () => {
    nock("http://test")
      .delete("/api/binary")
      .reply(200, { id: 1 });

    const response = await communicator.json({ method: "DELETE", modulePath: "/api/binary", expectBinaryResponse: true }, sdkContext);

    expect(response.status).toBe(200);
    expect(response.isSuccess).toBe(true);
    expect(response.body).toBeInstanceOf(Readable);

    let content = "";
    for await (const chunk of response.body as Readable) {
      content += chunk;
    }

    expect(JSON.parse(content)).toHaveProperty("id", 1);
  });

  test("shouldReturnNonEmptyResponseBodyWhenApiRequestIsGetWithBinaryResponse", async () => {
    nock("http://test")
      .get("/api/binary")
      .reply(200, { id: 1 });

    const response = await communicator.json({ method: "GET", modulePath: "/api/binary", expectBinaryResponse: true }, sdkContext);

    expect(response.status).toBe(200);
    expect(response.isSuccess).toBe(true);
    expect(response.body).toBeInstanceOf(Readable);

    let content = "";
    for await (const chunk of response.body as Readable) {
      content += chunk;
    }

    expect(JSON.parse(content)).toHaveProperty("id", 1);
  });

  test("shouldSendPostRequestWithoutBodyWhenBodyIsNull", async () => {
    nock("http://test")
      .post("/api/resource")
      .reply(200, { result: "ok" });

    const response = await communicator.json({ method: "POST", modulePath: "/api/resource" }, sdkContext);

    expect(response.isSuccess).toBe(true);
    expect(response.status).toBe(200);
  });

  test("shouldSendPutRequestWithoutBodyWhenBodyIsNull", async () => {
    nock("http://test")
      .put("/api/resource/1")
      .reply(200, { result: "ok" });

    const response = await communicator.json({ method: "PUT", modulePath: "/api/resource/1" }, sdkContext);

    expect(response.isSuccess).toBe(true);
    expect(response.status).toBe(200);
  });
});

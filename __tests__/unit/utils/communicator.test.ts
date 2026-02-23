/* eslint-disable @typescript-eslint/no-non-null-assertion */

import each from "jest-each";
import nock from "nock";
import { Readable } from "stream";
import { SdkBinaryErrorResponse, SdkBinarySuccessResponse, SdkContext } from "../../../src";
import communicator from "../../../src/utils/communicator";
import { newSdkContext } from "../../../src/utils/context";
import { dummySdkConfig } from "../../auth_config";
import http from "http";
import * as zlib from "node:zlib";
import https from "https";
import connection from "../../../src/utils/connection";

/**
 * @group unit:communicator
 */
describe("communicator", () => {
  const testData = [
    [200, true],
    [404, false],
    [500, false]
  ];
  let sdkContext: SdkContext;

  beforeAll(() => {
    sdkContext = newSdkContext(dummySdkConfig());
  });

  each(testData).test("with JSON response with status %d", async (status, isSuccess) => {
    nock("http://test")
      .get("/json")
      .reply(status, {
        id: 1
      });

    const response = await communicator.json(
      {
        method: "GET",
        modulePath: "/json"
      },
      sdkContext
    );
    expect(response.status).toBe(status);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.isSuccess).toBe(isSuccess);
    expect(response).not.toHaveProperty("file");
  });

  describe("with JSON response requested as binary response", () => {
    test("with status 200", done => {
      nock("http://test")
        .get("/json")
        .reply(200, {
          id: 1
        });

      communicator
        .json(
          {
            method: "GET",
            modulePath: "/json",
            expectBinaryResponse: true
          },
          sdkContext
        )
        .then(response => {
          expect(response.status).toBe(200);
          expect(response.body).toBeInstanceOf(Readable);
          expect(response.isSuccess).toBe(true);
          expect(response).toHaveProperty("file");
          const file = (response as SdkBinarySuccessResponse | SdkBinaryErrorResponse).file;
          expect(file.contentType).toBe("application/json");
          expect(file.filename).toBeNull();

          const body = response.body as Readable;
          let content = "";
          body.on("data", chunk => {
            content += chunk;
          });
          body.on("end", () => {
            const jsonBody = JSON.parse(content);
            expect(jsonBody).toHaveProperty("id", 1);

            done();
          });
        });
    });

    each(testData.slice(1)).test("with status %d", async (status, isSuccess) => {
      nock("http://test")
        .get("/json")
        .reply(status, {
          id: 1
        });

      const response = await communicator.json(
        {
          method: "GET",
          modulePath: "/json"
        },
        sdkContext
      );
      expect(response.status).toBe(status);
      expect(response.body).toHaveProperty("id", 1);
      expect(response.isSuccess).toBe(isSuccess);
      expect(response).not.toHaveProperty("file");
    });
  });

  each(testData).describe("with binary response with status %d", (status, isSuccess) => {
    test("with full headers", done => {
      const responseBody = "Test response";
      const contentLength = responseBody.length;
      const contentType = "application/octet-stream";
      const filename = "file.txt";

      nock("http://test")
        .get("/binary")
        .reply(status, responseBody, {
          "Content-Type": contentType,
          "Content-Length": contentLength.toString(),
          "Content-Disposition": `attachment; filename="${filename}"`
        });

      communicator
        .json(
          {
            method: "GET",
            modulePath: "/binary"
          },
          sdkContext
        )
        .then(response => {
          expect(response.status).toBe(status);
          expect(response.body).toBeInstanceOf(Readable);
          expect(response.isSuccess).toBe(isSuccess);
          expect(response).toHaveProperty("file");
          const file = (response as SdkBinarySuccessResponse | SdkBinaryErrorResponse).file;
          expect(file.contentType).toBe(contentType);
          expect(file.contentLength).toBe(contentLength);
          expect(file.filename).toBe(filename);

          const body = response.body as Readable;
          let content = "";
          body.on("data", chunk => {
            content += chunk;
          });
          body.on("end", () => {
            expect(content).toBe(responseBody);

            done();
          });
        });
    });

    test("with minimal headers", done => {
      const responseBody = "Test response";
      const contentType = "application/octet-stream";

      nock("http://test")
        .get("/binary")
        .reply(status, responseBody, {
          "Content-Type": contentType
        });

      communicator
        .json(
          {
            method: "GET",
            modulePath: "/binary"
          },
          sdkContext
        )
        .then(response => {
          expect(response.status).toBe(status);
          expect(response.body).toBeInstanceOf(Readable);
          expect(response.isSuccess).toBe(isSuccess);
          const file = (response as SdkBinarySuccessResponse | SdkBinaryErrorResponse).file;
          expect(file.contentType).toBe(contentType);
          expect(file.contentLength).toBeNull();
          expect(file.filename).toBeNull();

          const body = response.body as Readable;
          let content = "";
          body.on("data", chunk => {
            content += chunk;
          });
          body.on("end", () => {
            expect(content).toBe(responseBody);

            done();
          });
        });
    });
  });

  test("with invalid JSON response", async () => {
    const responseBody = "Non-JSON";
    nock("http://test")
      .get("/non-json")
      .reply(200, responseBody);

    const error = await communicator
      .json(
        {
          method: "GET",
          modulePath: "/non-json"
        },
        sdkContext
      )
      .then(() => undefined)
      .catch(e => e);
    expect(error).not.toBeUndefined();
    expect(error.status).toBe(200);
    expect(error.body).toBe(responseBody);
    expect(error.message).toMatch(/Unexpected token .*/);
  });

  test("with error", async () => {
    const errorMessage = "Unknown error occurred";
    nock("http://test")
      .get("/error")
      .replyWithError(errorMessage);

    const error = await communicator
      .json(
        {
          method: "GET",
          modulePath: "/error"
        },
        sdkContext
      )
      .then(() => undefined)
      .catch(e => e);
    expect(error).not.toBeUndefined();
    expect(error.status).toBeUndefined();
    expect(error.body).toBeUndefined();
    expect(error.message).toBe(errorMessage);
  });

  test("sendJSON compresses JSON body when Content-Encoding: gzip is set", done => {
    const httpServer = http.createServer((request, response) => {
      const requestChunks: Buffer[] = [];

      request.on("data", chunk => {
        requestChunks.push(chunk as Buffer);
      });

      request.on("end", () => {
        try {
          const contentEncodingHeader = String(request.headers["content-encoding"] || "");
          expect(contentEncodingHeader.toLowerCase()).toBe("gzip");

          const requestBuffer = Buffer.concat(requestChunks);
          expect(requestBuffer.length).toBeGreaterThan(0);

          const decompressedBuffer = zlib.gunzipSync(requestBuffer);
          const decodedJson = JSON.parse(decompressedBuffer.toString("utf-8"));

          expect(decodedJson.header?.operationType).toBe("CreatePayment");
          expect(decodedJson.header?.itemCount).toBe(2);

          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify({ ok: true }));
        } catch (error) {
          response.statusCode = 500;
          response.end();
          done(error as Error);
        }
      });
    });

    httpServer.listen(0, () => {
      const serverAddress = httpServer.address();
      if (!serverAddress || typeof serverAddress === "string") {
        httpServer.close();
        return done(new Error("Failed to get server address"));
      }

      const configuration = dummySdkConfig();
      configuration.host = "127.0.0.1";
      configuration.port = serverAddress.port;
      configuration.scheme = "http";

      const gzipContext = newSdkContext(configuration);

      const requestBody = {
        header: {
          operationType: "CreatePayment",
          itemCount: 2
        },
        items: [
          { amount: 10000, currencyCode: "EUR" },
          { amount: 20000, currencyCode: "EUR" }
        ]
      };

      const requestOptions: https.RequestOptions = {
        protocol: "http:",
        host: "127.0.0.1",
        port: serverAddress.port,
        path: "/gzip-request",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Encoding": "gzip"
        }
      };

      connection.sendJSON(requestOptions, requestBody, gzipContext, (error, incomingResponse) => {
        try {
          expect(error).toBeNull();
          expect(incomingResponse).not.toBeNull();
          expect(incomingResponse!.statusCode).toBe(200);
        } finally {
          httpServer.close();
          done(error ?? undefined);
        }
      });
    });
  });
});

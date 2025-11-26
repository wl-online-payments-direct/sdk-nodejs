/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Readable } from "stream";
import express from "express";
import multer from "multer";
import { Server } from "http";
import communicator from "../../src/utils/communicator";
import { newSdkContext } from "../../src/utils/context";
import { sdkConfig } from "../auth_config";
import config from "../config.json";
import { SdkContext, SdkResponse } from "../../src";
import { findAvailablePort } from "./__setup__/portUtils";

let server: Server;
let sdkContext: SdkContext;

// Setup local mock server for multipart form handling
beforeAll(async () => {
  const port = await findAvailablePort([4011, 4012, 4013, 4014, 4015]);

  const app = express();
  const upload = multer();

  app.post("/post", upload.single("file"), (req, res) => {
    res.json({
      form: req.body,
      files: { file: req.file?.buffer.toString() }
    });
  });

  app.put("/put", upload.single("file"), (req, res) => {
    res.json({
      form: req.body,
      files: { file: req.file?.buffer.toString() }
    });
  });

  await new Promise<void>(resolve => {
    server = app.listen(port, resolve);
  });

  sdkContext = newSdkContext(sdkConfig(config, "localhost", "http", port, "Integration tests"));
});

afterAll(async () => {
  await new Promise<void>(resolve => {
    server?.close(() => resolve());
  });
});

jest.setTimeout(60 * 1000);

function toReadable(str: string): Readable {
  const result = new Readable();
  result.push(str);
  result.push(null);
  return result;
}

interface HttpBinResponse {
  form: { [key: string]: string | undefined };
  files: { [key: string]: string | undefined };
}

/**
 * @group integration
 */
describe("multipart", () => {
  test("POST", async () => {
    const body = {
      value: "Hello World",
      file: {
        content: toReadable("This is the contents of a file"),
        fileName: "file.txt",
        contentType: "text/plain"
      }
    };

    const response = await communicator.multipart(
      {
        method: "POST",
        modulePath: "/post",
        body: body,
        paymentContext: null
      },
      sdkContext
    );

    validateResponse(response);
  });

  test("PUT", async () => {
    const body = {
      value: "Hello World",
      file: {
        content: toReadable("This is the contents of a file"),
        fileName: "file.txt",
        contentType: "text/plain"
      }
    };

    const response = await communicator.multipart(
      {
        method: "PUT",
        modulePath: "/put",
        body: body,
        paymentContext: null
      },
      sdkContext
    );

    validateResponse(response);
  });
});

const validateResponse = (response: SdkResponse<unknown, unknown>) => {
  expect(response.status).toBe(200);
  expect(response.body).not.toBeNull();

  const responseBody = response.body as HttpBinResponse;
  expect(responseBody.files).not.toBeNull();
  expect(responseBody.files.file).toBe("This is the contents of a file");
  expect(responseBody.form).not.toBeNull();
  expect(responseBody.form.value).toBe("Hello World");
};

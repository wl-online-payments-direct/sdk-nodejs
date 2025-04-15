/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Readable } from "stream";
import { URL } from "url";
import communicator from "../../src/utils/communicator";
import { newSdkContext } from "../../src/utils/context";
import { sdkConfig } from "../auth_config";

import config from "../config.json";

const httpBinUrl = new URL(config.httpBinUrl || "http://httpbin.org");
const scheme = httpBinUrl.protocol === "http:" ? "http" : "https";
const port = httpBinUrl.port ? parseInt(httpBinUrl.port) : httpBinUrl.protocol === "http:" ? 80 : 443;

const sdkContext = newSdkContext(sdkConfig(config, httpBinUrl.hostname, scheme, port, "Integration tests"));

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
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();

    const responseBody = response.body as HttpBinResponse;
    expect(responseBody.files).not.toBeNull();
    expect(responseBody.files.file).toBe("This is the contents of a file");
    expect(responseBody.form).not.toBeNull();
    expect(responseBody.form.value).toBe("Hello World");
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
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();

    const responseBody = response.body as HttpBinResponse;
    expect(responseBody.files).not.toBeNull();
    expect(responseBody.files.file).toBe("This is the contents of a file");
    expect(responseBody.form).not.toBeNull();
    expect(responseBody.form.value).toBe("Hello World");
  });
});

import { Readable } from "stream";
import express from "express";
import multer from "multer";
import { Server } from "http";
import communicator from "../../src/utils/communicator";
import { newSdkContext } from "../../src/utils/context";
import { sdkConfig } from "../auth_config";
import config from "../config.json";
import { SdkContext, SdkResponse, UploadableFile } from "../../src";
import { findAvailablePort } from "./__setup__/portUtils";

let server: Server;
let sdkContext: SdkContext;

beforeAll(async () => {
  const port = await findAvailablePort([4011, 4012, 4013, 4014, 4015]);

  const app = express();
  const upload = multer();

  const collectFiles = (files: Express.Multer.File[] | undefined): Record<string, string> => {
    const result: Record<string, string> = {};
    for (const file of files ?? []) {
      result[file.fieldname] = file.buffer.toString();
    }
    return result;
  };

  app.post("/post", upload.any(), (req, res) => {
    res.json({
      form: req.body,
      files: collectFiles(req.files as Express.Multer.File[])
    });
  });

  app.put("/put", upload.any(), (req, res) => {
    res.json({
      form: req.body,
      files: collectFiles(req.files as Express.Multer.File[])
    });
  });

  // Echoes back the request headers — used by boundary/content-type tests
  app.post("/headers", upload.any(), (req, res) => {
    res.json({ headers: req.headers });
  });

  await new Promise<void>(resolve => {
    server = app.listen(port, resolve);
  });

  sdkContext = newSdkContext(sdkConfig(config, "localhost", "http", port, "Integration tests"));
});

afterAll(async () => {
  await new Promise<void>(resolve => {
    server?.closeAllConnections();
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

interface MultipartResponse {
  form: Record<string, string | undefined>;
  files: Record<string, string | undefined>;
}

interface HeadersResponse {
  headers: Record<string, string>;
}

function postMultipart(body: Record<string, unknown>, sdkCtx: SdkContext = sdkContext): Promise<SdkResponse<unknown, unknown>> {
  return communicator.multipart({ method: "POST", modulePath: "/post", body: body as MultipartFormDataBody, paymentContext: null }, sdkCtx);
}

function putMultipart(body: Record<string, unknown>, sdkCtx: SdkContext = sdkContext): Promise<SdkResponse<unknown, unknown>> {
  return communicator.multipart({ method: "PUT", modulePath: "/put", body: body as MultipartFormDataBody, paymentContext: null }, sdkCtx);
}

// Alias to satisfy the TypeScript type without exposing the internal type name
type MultipartFormDataBody = Parameters<typeof communicator.multipart>[0]["body"];

describe("multipart", () => {
  describe("WhenPostingMultipartFormData", () => {
    describe("withSingleFileAndValue", () => {
      test("shouldPostWithResponse", async () => {
        const body = {
          value: "Hello World",
          file: { content: toReadable("This is the contents of a file"), fileName: "file.txt", contentType: "text/plain" }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.file).toBe("This is the contents of a file");
        expect(responseBody.form.value).toBe("Hello World");
      });

      test("shouldPostWithBodyHandler", async () => {
        const body = {
          value: "Hello World",
          file: { content: toReadable("file content"), fileName: "file.txt", contentType: "text/plain" }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(Object.keys(responseBody.files)).toHaveLength(1);
        expect(Object.keys(responseBody.form)).toHaveLength(1);
        expect(responseBody.files.file).toBe("file content");
        expect(responseBody.form.value).toBe("Hello World");
      });
    });

    describe("withMultipleFiles", () => {
      test("shouldPostTwoFiles", async () => {
        const body = {
          firstFile: { content: toReadable("firstContent"), fileName: "first.txt", contentType: "text/plain" },
          secondFile: { content: toReadable("secondContent"), fileName: "second.txt", contentType: "text/plain" }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(Object.keys(responseBody.files)).toHaveLength(2);
        expect(responseBody.files.firstFile).toBe("firstContent");
        expect(responseBody.files.secondFile).toBe("secondContent");
      });

      test("shouldPostThreeFilesWithDifferentTypes", async () => {
        const body = {
          textFile: { content: toReadable("text"), fileName: "file.txt", contentType: "text/plain" },
          jsonFile: { content: toReadable("json"), fileName: "file.json", contentType: "application/json" },
          xmlFile: { content: toReadable("xml"), fileName: "file.xml", contentType: "application/xml" }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(Object.keys(responseBody.files)).toHaveLength(3);
      });
    });

    describe("withMultipleValues", () => {
      test("shouldPostTwoValues", async () => {
        const body = { firstKey: "firstValue", secondKey: "secondValue" };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(Object.keys(responseBody.form)).toHaveLength(2);
        expect(responseBody.form.firstKey).toBe("firstValue");
        expect(responseBody.form.secondKey).toBe("secondValue");
      });

      test("shouldPostThreeValues", async () => {
        const body = { name: "John", age: "30", city: "NYC" };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(Object.keys(responseBody.form)).toHaveLength(3);
      });
    });

    describe("withFilesOnly", () => {
      test("shouldPostSingleFileWithoutValues", async () => {
        const body = {
          document: { content: toReadable("doc content"), fileName: "doc.pdf", contentType: "application/pdf" }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.document).toBe("doc content");
      });
    });

    describe("withValuesOnly", () => {
      test("shouldPostSingleValueWithoutFiles", async () => {
        const body = { message: "Hello" };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.form.message).toBe("Hello");
      });
    });

    describe("withDifferentContentTypes", () => {
      test("shouldPostPdfFile", async () => {
        const body = {
          pdf: { content: toReadable("pdf content"), fileName: "document.pdf", contentType: "application/pdf" }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
      });

      test("shouldPostImageFile", async () => {
        const body = {
          image: { content: toReadable("image content"), fileName: "photo.jpg", contentType: "image/jpeg" }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
      });

      test("shouldPostJsonFile", async () => {
        const body = {
          data: { content: toReadable("json content"), fileName: "data.json", contentType: "application/json" }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
      });
    });

    describe("withContentLength", () => {
      test("shouldPostFileWithKnownLength", async () => {
        const content = "content";
        const body = {
          file: { content: toReadable(content), fileName: "file.txt", contentType: "text/plain", contentLength: 7 }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.file).toBe("content");
      });

      test("shouldPostFileWithUnknownLength", async () => {
        const body = {
          file: { content: toReadable("content"), fileName: "file.txt", contentType: "text/plain" }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.file).toBe("content");
      });
    });

    describe("withMultipartFormDataRequest", () => {
      test("shouldPostWithResponse", async () => {
        const body = {
          value: "Hello World",
          file: { content: toReadable("file content"), fileName: "file.txt", contentType: "text/plain" }
        };

        const response = await communicator.multipart({ method: "POST", modulePath: "/post", body: body as MultipartFormDataBody, paymentContext: null }, sdkContext);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(Object.keys(responseBody.files)).toHaveLength(1);
        expect(responseBody.files.file).toBe("file content");
        expect(Object.keys(responseBody.form)).toHaveLength(1);
        expect(responseBody.form.value).toBe("Hello World");
      });

      test("shouldPostWithBodyHandler", async () => {
        const body = {
          value: "Hello World",
          file: { content: toReadable("file content"), fileName: "file.txt", contentType: "text/plain" }
        };

        const response = await communicator.multipart({ method: "POST", modulePath: "/post", body: body as MultipartFormDataBody, paymentContext: null }, sdkContext);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.file).toBe("file content");
        expect(responseBody.form.value).toBe("Hello World");
      });
    });
  });

  describe("WhenPuttingMultipartFormData", () => {
    describe("withMultipartFormDataObject", () => {
      test("shouldPutWithResponse", async () => {
        const body = {
          value: "Hello World",
          file: { content: toReadable("file content"), fileName: "file.txt", contentType: "text/plain" }
        };

        const response = await putMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(Object.keys(responseBody.files)).toHaveLength(1);
        expect(responseBody.files.file).toBe("file content");
        expect(Object.keys(responseBody.form)).toHaveLength(1);
        expect(responseBody.form.value).toBe("Hello World");
      });

      test("shouldPutWithBodyHandler", async () => {
        const body = {
          value: "Hello World",
          file: { content: toReadable("file content"), fileName: "file.txt", contentType: "text/plain" }
        };

        const response = await putMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.file).toBe("file content");
        expect(responseBody.form.value).toBe("Hello World");
      });
    });

    describe("withMultipartFormDataRequest", () => {
      test("shouldPutWithResponse", async () => {
        const body = {
          value: "Hello World",
          file: { content: toReadable("file content"), fileName: "file.txt", contentType: "text/plain" }
        };

        const response = await communicator.multipart({ method: "PUT", modulePath: "/put", body: body as MultipartFormDataBody, paymentContext: null }, sdkContext);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(Object.keys(responseBody.files)).toHaveLength(1);
        expect(responseBody.files.file).toBe("file content");
        expect(Object.keys(responseBody.form)).toHaveLength(1);
        expect(responseBody.form.value).toBe("Hello World");
      });

      test("shouldPutWithBodyHandler", async () => {
        const body = {
          value: "Hello World",
          file: { content: toReadable("file content"), fileName: "file.txt", contentType: "text/plain" }
        };

        const response = await communicator.multipart({ method: "PUT", modulePath: "/put", body: body as MultipartFormDataBody, paymentContext: null }, sdkContext);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.file).toBe("file content");
        expect(responseBody.form.value).toBe("Hello World");
      });
    });
  });

  describe("WhenAddingFiles", () => {
    describe("withValidFile", () => {
      test("shouldAddFileWithKnownLength", async () => {
        const body = {
          document: { content: toReadable("content"), fileName: "file.txt", contentType: "text/plain", contentLength: 7 }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.document).toBe("content");
      });

      test("shouldAddFileWithUnknownLength", async () => {
        const body = {
          document: { content: toReadable("content"), fileName: "file.txt", contentType: "text/plain" }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.document).toBe("content");
      });
    });

    describe("withInvalidFile", () => {
      test("shouldThrowExceptionForNullFile", async () => {
        const body = ({ file: null } as unknown) as Record<string, unknown>;

        await expect(postMultipart(body)).rejects.toThrow("Cannot read properties of null");
      });

      test("shouldThrowExceptionForNullFileName", async () => {
        const body = ({ file: { fileName: null, content: toReadable("content"), contentType: "text/plain" } } as unknown) as Record<string, unknown>;

        await expect(postMultipart(body)).rejects.toThrow("file: fileName is required");
      });

      test("shouldThrowExceptionForEmptyFileName", async () => {
        const body = { file: { fileName: "", content: toReadable("content"), contentType: "text/plain" } };

        await expect(postMultipart(body)).rejects.toThrow("file: fileName is required");
      });

      test("shouldAddTwoFilesWithDifferentParameterNames", async () => {
        const body = {
          firstDoc: { content: toReadable("first content"), fileName: "first.txt", contentType: "text/plain" },
          secondDoc: { content: toReadable("second content"), fileName: "second.txt", contentType: "text/plain" }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.firstDoc).toBe("first content");
        expect(responseBody.files.secondDoc).toBe("second content");
      });

      test("shouldAddFileAndValueWithDifferentParameterNames", async () => {
        const body = {
          myFile: { content: toReadable("file data"), fileName: "f.txt", contentType: "text/plain" },
          myValue: "some value"
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.myFile).toBe("file data");
        expect(responseBody.form.myValue).toBe("some value");
      });
    });
  });

  describe("WhenAddingValues", () => {
    describe("withValidValue", () => {
      test("shouldAddSingleValue", async () => {
        const body = { key: "value" };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.form.key).toBe("value");
      });

      test("shouldAddMultipleValues", async () => {
        const body = { firstKey: "firstValue", secondKey: "secondValue", thirdKey: "thirdValue" };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.form.firstKey).toBe("firstValue");
        expect(responseBody.form.secondKey).toBe("secondValue");
        expect(responseBody.form.thirdKey).toBe("thirdValue");
      });
    });

    describe("withInvalidValue", () => {
      test("shouldThrowExceptionForNullValue", async () => {
        const body = ({ field: null } as unknown) as Record<string, unknown>;

        await expect(postMultipart(body)).rejects.toThrow("Cannot read properties of null");
      });

      test("shouldSkipUndefinedValue", async () => {
        const body = ({ field: undefined, present: "yes" } as unknown) as Record<string, unknown>;

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.form.field).toBeUndefined();
        expect(responseBody.form.present).toBe("yes");
      });

      test("shouldThrowExceptionForEmptyParameterName", async () => {
        // Empty string keys are not validated at the SDK level but cause a server-side error.
        // Like Java's addValue("", value) throwing, the request ends up failing.
        const body = ({ "": "value" } as unknown) as Record<string, unknown>;

        await expect(postMultipart(body)).rejects.toThrow();
      });

      test("shouldAddTwoValuesWithDifferentParameterNames", async () => {
        const body = { alpha: "valueA", beta: "valueB" };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.form.alpha).toBe("valueA");
        expect(responseBody.form.beta).toBe("valueB");
      });

      test("shouldAddValueAndFileWithDifferentParameterNames", async () => {
        const body = {
          textField: "text value",
          binaryField: { content: toReadable("binary data"), fileName: "data.bin", contentType: "application/octet-stream" }
        };

        const response = await postMultipart(body);

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.form.textField).toBe("text value");
        expect(responseBody.files.binaryField).toBe("binary data");
      });
    });
  });

  describe("WhenVerifyingBoundaryAndContentType", () => {
    test("shouldGenerateUniqueBoundary", async () => {
      const body = { value: "test" };

      const response1 = await communicator.multipart({ method: "POST", modulePath: "/headers", body: body as MultipartFormDataBody, paymentContext: null }, sdkContext);
      const response2 = await communicator.multipart({ method: "POST", modulePath: "/headers", body: body as MultipartFormDataBody, paymentContext: null }, sdkContext);

      const contentType1 = (response1.body as HeadersResponse).headers["content-type"];
      const contentType2 = (response2.body as HeadersResponse).headers["content-type"];

      const boundary1 = contentType1.split("boundary=")[1];
      const boundary2 = contentType2.split("boundary=")[1];

      expect(boundary1).toBeTruthy();
      expect(boundary2).toBeTruthy();
      expect(boundary1).not.toBe(boundary2);
    });

    test("shouldIncludeBoundaryInContentType", async () => {
      const body = { value: "test" };

      const response = await communicator.multipart({ method: "POST", modulePath: "/headers", body: body as MultipartFormDataBody, paymentContext: null }, sdkContext);

      const contentType = (response.body as HeadersResponse).headers["content-type"];

      expect(contentType).toContain("boundary=");
      const boundary = contentType.split("boundary=")[1];
      expect(boundary).toBeTruthy();
      expect(contentType).toContain(boundary);
    });

    test("shouldReturnCorrectMultipartContentType", async () => {
      const body = { value: "test" };

      const response = await communicator.multipart({ method: "POST", modulePath: "/headers", body: body as MultipartFormDataBody, paymentContext: null }, sdkContext);

      const contentType = (response.body as HeadersResponse).headers["content-type"];

      expect(contentType).toMatch(/^multipart\/form-data; boundary=.+/);
    });
  });

  describe("WhenCreatingUploadableFile", () => {
    describe("withValidInput", () => {
      test("shouldCreateFileWithKnownLength", async () => {
        const file: UploadableFile = {
          fileName: "test.txt",
          content: toReadable("test content"),
          contentType: "text/plain",
          contentLength: 12
        };

        const response = await postMultipart({ file });

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.file).toBe("test content");
      });

      test("shouldCreateFileWithUnknownLength", async () => {
        const file: UploadableFile = {
          fileName: "test.txt",
          content: toReadable("test content"),
          contentType: "text/plain"
        };

        const response = await postMultipart({ file });

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.file).toBe("test content");
      });

      test("shouldSendFileWithNegativeContentLength", async () => {
        // Node.js does not normalize negative content lengths — the file is still transmitted correctly
        const file: UploadableFile = {
          fileName: "file.txt",
          content: toReadable("content"),
          contentType: "text/plain",
          contentLength: -100
        };

        const response = await postMultipart({ file });

        expect(response.status).toBe(200);
        const responseBody = response.body as MultipartResponse;
        expect(responseBody.files.file).toBe("content");
      });
    });

    describe("withInvalidInput", () => {
      test("shouldThrowExceptionForNullFileName", async () => {
        const body = ({ file: { fileName: null, content: toReadable("content"), contentType: "text/plain" } } as unknown) as Record<string, unknown>;

        await expect(postMultipart(body)).rejects.toThrow("file: fileName is required");
      });

      test("shouldThrowExceptionForEmptyFileName", async () => {
        const body = { file: { fileName: "", content: toReadable("content"), contentType: "text/plain" } };

        await expect(postMultipart(body)).rejects.toThrow("file: fileName is required");
      });

      test("shouldThrowExceptionForNullContent", async () => {
        const body = ({ file: { fileName: "file.txt", content: null, contentType: "text/plain" } } as unknown) as Record<string, unknown>;

        await expect(postMultipart(body)).rejects.toThrow("file: content is required");
      });

      test("shouldThrowExceptionForNullContentType", async () => {
        const body = ({ file: { fileName: "file.txt", content: toReadable("content"), contentType: null } } as unknown) as Record<string, unknown>;

        await expect(postMultipart(body)).rejects.toThrow("file: contentType is required");
      });

      test("shouldThrowExceptionForEmptyContentType", async () => {
        const body = { file: { fileName: "file.txt", content: toReadable("content"), contentType: "" } };

        await expect(postMultipart(body)).rejects.toThrow("file: contentType is required");
      });
    });
  });
});

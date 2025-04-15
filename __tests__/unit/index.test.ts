import { v4 as newUUID } from "uuid";
import { assertSuccess } from "../../src";
import { SdkApiError, SdkBinaryResponse, SdkResponse } from "../../src/model";
import { Readable } from "stream";

interface TestResponse {
  result: "OK";
}

interface ErrorResponse {
  errorId: string;
}

/**
 * @group unit:index
 */
describe("assertSuccess", () => {
  describe("SdkResponse", () => {
    test("isSuccess", () => {
      const response: SdkResponse<TestResponse, ErrorResponse> = {
        status: 200,
        isSuccess: true,
        body: {
          result: "OK"
        }
      };
      const asserted = assertSuccess(response);
      expect(asserted).toBe(response);
      // check separate properties too, to ensure that the right type is returned
      expect(asserted.status).toBe(response.status);
      expect(asserted.isSuccess).toBe(true);
      expect(asserted.body).toBe(response.body);
    });

    test("!isSuccess", () => {
      const response: SdkResponse<TestResponse, ErrorResponse> = {
        status: 500,
        isSuccess: false,
        body: {
          errorId: newUUID()
        }
      };
      try {
        assertSuccess(response);
        fail("expected an error");
      } catch (e) {
        const error = e as SdkApiError<ErrorResponse>;
        expect(error.message).toBe("the Online Payments platform returned an error response");
        expect(error.status).toBe(response.status);
        expect(error.body).toBe(response.body);
      }
    });
  });

  describe("SdkBinaryResponse", () => {
    test("isSuccess", () => {
      const response: SdkBinaryResponse<ErrorResponse> = {
        status: 200,
        isSuccess: true,
        body: new Readable(),
        file: {
          contentType: "text/plain",
          contentLength: 0,
          filename: "test.txt"
        }
      };
      const asserted = assertSuccess(response);
      expect(asserted).toBe(response);
      // check separate properties too, to ensure that the right type is returned
      expect(asserted.status).toBe(response.status);
      expect(asserted.isSuccess).toBe(true);
      expect(asserted.body).toBe(response.body);
      expect(asserted.file).toBe(response.file);
    });

    test("!isSuccess", () => {
      const response: SdkBinaryResponse<ErrorResponse> = {
        status: 500,
        isSuccess: false,
        body: {
          errorId: newUUID()
        }
      };
      try {
        assertSuccess(response);
        fail("expected an error");
      } catch (e) {
        const error = e as SdkApiError<ErrorResponse>;
        expect(error.message).toBe("the Online Payments platform returned an error response");
        expect(error.status).toBe(response.status);
        expect(error.body).toBe(response.body);
      }
    });
  });
});

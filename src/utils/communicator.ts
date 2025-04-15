/* eslint-disable @typescript-eslint/no-non-null-assertion */

import _ from "lodash";
import { IncomingMessage } from "http";
import { RequestOptions } from "https";
import { v4 as newUUID } from "uuid";
import headers from "../utils/headers";
import { applyConnectionOptions, applyProxyConfiguration, sendJSON, sendMultipart } from "./connection";
import { Header, JsonRequest, MultipartFormDataRequest, PaymentContext, SdkContext, SdkRequest, SdkResponse, SdkResponseError } from "../model";

async function prepareRequest(request: SdkRequest, sdkContext: SdkContext, options: RequestOptions, contentType: string): Promise<void> {
  const date = headers.date();
  let path = request.modulePath;
  if (request.paymentContext) {
    let separator = "?";
    for (const key in request.paymentContext) {
      if (key !== "extraHeaders" && key !== "idempotence") {
        if (Array.isArray(request.paymentContext[key])) {
          for (const value in request.paymentContext[key]) {
            path += `${separator + key}=${request.paymentContext[key][value]}`;
            separator = "&";
          }
        } else {
          path += `${separator + key}=${request.paymentContext[key]}`;
          separator = "&";
        }
      }
    }
  }
  const extraHeaders: Header[] = [];
  options.path = path;
  options.method = request.method;
  options.headers = options.headers || {};
  options.headers["Date"] = date;
  options.headers["Content-Type"] = contentType;
  if (request.paymentContext?.extraHeaders) {
    for (const header of request.paymentContext.extraHeaders) {
      options.headers[header.key] = _.trim(header.value.replace(/\r?\n[\\s&&[^\r\n]]*/g, " "));
      extraHeaders.push(header);
    }
  }

  // add idempotence header
  if (request.paymentContext?.idempotence) {
    const idempotenceKey = request.paymentContext.idempotence.key;
    const idempotenceHeader = {
      key: "X-GCS-Idempotence-Key",
      value: idempotenceKey
    };
    options.headers[idempotenceHeader.key] = idempotenceHeader.value;
    extraHeaders.push(idempotenceHeader);
  }

  // add X-GCS-ServerMetaInfo
  const serverMetaInfo = headers.serverMetaInfo(sdkContext);
  options.headers[serverMetaInfo.key] = serverMetaInfo.value;
  extraHeaders.push(serverMetaInfo);

  options.headers.Authorization = await sdkContext.getAuthenticator().getAuthorization(request.method, contentType, date, extraHeaders, options.path);

  applyProxyConfiguration(options, sdkContext.getProxy());
  applyConnectionOptions(options, sdkContext.getConnectionOptions());
}

function handleResponse(
  response: IncomingMessage,
  paymentContext: PaymentContext | null | undefined,
  expectBinaryResponse: boolean,
  resolve: (response: SdkResponse<unknown, unknown>) => void,
  reject: (error: SdkResponseError) => void
): void {
  const idempotenceRequestTimestamp = response.headers["x-gcs-idempotence-request-timestamp"];
  if (idempotenceRequestTimestamp && paymentContext?.idempotence) {
    paymentContext.idempotence.requestTimestamp = idempotenceRequestTimestamp as string;
  }
  const idempotenceResponseDateTime = response.headers["idempotencyresponsedatetime"];
  if (idempotenceResponseDateTime && paymentContext?.idempotence) {
    paymentContext.idempotence.responseDateTime = idempotenceResponseDateTime as string;
  }

  const statusCode = response.statusCode!;
  const isSuccess = statusCode >= 200 && statusCode < 300;
  const contentType = response.headers["content-type"];

  // Resolve to a binary response if a) the caller expects a binary response and the response is successful, or b) the
  // response is actually binary Error JSON responses are still resolved as objects
  if ((expectBinaryResponse && isSuccess) || headers.isBinaryContent(contentType)) {
    // The response is actually either an SdkBinarySuccessResponse or (unlikely) an SdkBinaryErrorResponse
    // Those are compatible with SdkSuccessResponse<Readable> and SdkErrorResponse<Readable> respectively but with an
    // extra "file" property
    resolve({
      status: statusCode,
      body: response,
      isSuccess,
      file: {
        contentType,
        contentLength: headers.contentLength(response.headers),
        filename: headers.dispositionFilename(response.headers)
      }
    } as SdkResponse<unknown, unknown>);
  } else {
    let body = "";

    response.setEncoding("utf8");
    response.on("data", chunk => {
      body += chunk;
    });
    response.on("end", () => {
      try {
        body = body ? JSON.parse(body) : null;
        resolve({
          status: statusCode,
          body,
          isSuccess
        });
      } catch (e) {
        const error = e as SdkResponseError;
        error.status = statusCode;
        error.body = body;
        reject(error);
      }
    });
  }
}

function createOptions(sdkContext: SdkContext): RequestOptions {
  const endpoint = sdkContext.getEndpoint();
  return {
    host: endpoint.host,
    port: endpoint.port,
    protocol: endpoint.scheme + ":"
  };
}

export async function json(request: JsonRequest, sdkContext: SdkContext): Promise<SdkResponse<unknown, unknown>> {
  const options = createOptions(sdkContext);
  await prepareRequest(request, sdkContext, options, "application/json");
  return new Promise((resolve, reject) => {
    sendJSON(options, request.body, sdkContext, (error, response) => {
      if (error) {
        reject(error);
      } else {
        handleResponse(response!, request.paymentContext, request.expectBinaryResponse ?? false, resolve, reject);
      }
    });
  });
}

export async function multipart(request: MultipartFormDataRequest, sdkContext: SdkContext): Promise<SdkResponse<unknown, unknown>> {
  const options = createOptions(sdkContext);
  const boundary = newUUID();
  await prepareRequest(request, sdkContext, options, "multipart/form-data; boundary=" + boundary);
  return new Promise((resolve, reject) => {
    sendMultipart(options, request.body, boundary, sdkContext, (error, response) => {
      if (error) {
        reject(error);
      } else {
        handleResponse(response!, request.paymentContext, request.expectBinaryResponse ?? false, resolve, reject);
      }
    });
  });
}

export default {
  json,
  multipart
};

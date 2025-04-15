import crypto from "crypto";
import compare from "secure-compare";
import { RequestHeaders, SecretKeyStore, SignatureValidator } from "../model/webhooks";

function getHeaderValue(requestHeaders: RequestHeaders, headerName: string): string {
  const lowerCaseHeaderName = headerName.toLowerCase();
  for (const name in requestHeaders) {
    if (name != null && lowerCaseHeaderName === name.toLowerCase()) {
      const value = requestHeaders[name];
      if (typeof value === "string") {
        return value;
      }
      if (typeof value === "undefined") {
        throw new Error(`could not find header '${headerName}'`);
      }
      throw new Error(`found multiple values for header '${headerName}'`);
    }
  }
  throw new Error(`could not find header '${headerName}'`);
}

async function validate(body: string | Buffer, requestHeaders: RequestHeaders, secretKeyStore: SecretKeyStore): Promise<void> {
  const signature = getHeaderValue(requestHeaders, "X-GCS-Signature");
  const keyId = getHeaderValue(requestHeaders, "X-GCS-KeyId");

  const secretKey = await secretKeyStore.getSecretKey(keyId);
  const expectedSignature = crypto
    .createHmac("sha256", secretKey)
    .update(body)
    .digest("base64");
  if (!compare(signature, expectedSignature)) {
    throw new Error(`failed to validate signature '${signature}'`);
  }
}

export function newSignatureValidator(store: SecretKeyStore): SignatureValidator {
  if (!store || typeof store.getSecretKey !== "function") {
    throw new Error("no valid secret key store given");
  }
  return {
    validate: (body, requestHeaders): Promise<void> => validate(body, requestHeaders, store)
  };
}

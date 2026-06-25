const validBody = `{
  "apiVersion": "v1",
  "id": "8ee793f6-4553-4749-85dc-f2ef095c5ab0",
  "created": "2017-02-02T11:24:14.040+0100",
  "merchantId": "20000",
  "type": "payment.paid",
  "payment": {
    "id": "00000200000143570012",
    "paymentOutput": {
      "amountOfMoney": {
        "amount": 1000,
        "currencyCode": "EUR"
      },
      "references": {
        "paymentReference": "200001681810"
      },
      "paymentMethod": "bankTransfer",
      "bankTransferPaymentMethodSpecificOutput": {
        "paymentProductId": 11
      }
    },
    "status": "PAID",
    "statusOutput": {
      "isCancellable": false,
      "statusCategory": "COMPLETED",
      "statusCode": 1000,
      "statusCodeChangeDateTime": "20170202112414",
      "isAuthorized": true
    }
  }
}`.replace(/\r\n/, "\n");

const invalidBody = `{
  "apiVersion": "v1",
  "id": "8ee793f6-4553-4749-85dc-f2ef095c5ab0",
  "created": "2017-02-02T11:25:14.040+0100",
  "merchantId": "20000",
  "type": "payment.paid",
  "payment": {
    "id": "00000200000143570012",
    "paymentOutput": {
      "amountOfMoney": {
        "amount": 1000,
        "currencyCode": "EUR"
      },
      "references": {
        "paymentReference": "200001681810"
      },
      "paymentMethod": "bankTransfer",
      "bankTransferPaymentMethodSpecificOutput": {
        "paymentProductId": 11
      }
    },
    "status": "PAID",
    "statusOutput": {
      "isCancellable": false,
      "statusCategory": "COMPLETED",
      "statusCode": 1000,
      "statusCodeChangeDateTime": "20170202112514",
      "isAuthorized": true
    }
  }
}`.replace(/\r\n/, "\n");

const validSignature = "2S7doBj/GnJnacIjSJzr5fxGM5xmfQyFAwxv1I53ZEk=";
const keyId = "dummy-key-id";
const secretKey = "hello+world";

import crypto from "crypto";
import { webhooks } from "../../../src";
import { ApiVersionMismatchError, WebhooksHelper } from "../../../src/model/webhooks";

/**
 * @group webhooks
 */
describe("webhooks.unmarshal", () => {
  let webhooksHelper: WebhooksHelper;

  beforeAll(() => {
    webhooksHelper = webhooks.init({
      getSecretKey: webhooks.inMemorySecretKeyStore.getSecretKey
    });
  });

  beforeEach(() => {
    webhooks.inMemorySecretKeyStore.clear();
  });

  test("shouldThrowSecretKeyNotAvailableExceptionWhenUnmarshallingWithoutAvailableSecretKey", async () => {
    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .unmarshal(validBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`could not find secret key for key id ${keyId}`);
    expect(error).toHaveProperty("keyId", keyId);
  });

  test("shouldThrowSignatureValidationExceptionWhenUnmarshallingWithMissingHeaders", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {};
    const error = await webhooksHelper
      .unmarshal(validBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe("could not find header 'X-GCS-Signature'");
  });

  test("shouldReturnValidEventWhenUnmarshallingValidRequestFromString", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const event = await webhooksHelper.unmarshal(validBody, headers);
    expect(event.apiVersion).toBe("v1");
    expect(event.id).toBe("8ee793f6-4553-4749-85dc-f2ef095c5ab0");
    expect(event.created).toBe("2017-02-02T11:24:14.040+0100");
    expect(event.merchantId).toBe("20000");
    expect(event.type).toBe("payment.paid");
  });

  test("shouldReturnValidEventWhenUnmarshallingValidRequestFromByteArray", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const event = await webhooksHelper.unmarshal(Buffer.from(validBody), headers);
    expect(event.apiVersion).toBe("v1");
    expect(event.id).toBe("8ee793f6-4553-4749-85dc-f2ef095c5ab0");
    expect(event.created).toBe("2017-02-02T11:24:14.040+0100");
    expect(event.merchantId).toBe("20000");
    expect(event.type).toBe("payment.paid");
  });

  test("shouldThrowSignatureValidationExceptionWhenUnmarshallingInvalidBody", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .unmarshal(invalidBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`failed to validate signature '${validSignature}'`);
  });

  test("shouldThrowSignatureValidationExceptionWhenUnmarshallingWithInvalidSecretKey", async () => {
    const invalidSecretKey = "1" + secretKey;
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, invalidSecretKey);

    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .unmarshal(validBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`failed to validate signature '${validSignature}'`);
  });

  test("shouldThrowSignatureValidationExceptionWhenUnmarshallingWithInvalidSignature", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const invalidSignature = "1" + validSignature;
    const headers = {
      "x-gcs-signature": invalidSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .unmarshal(validBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`failed to validate signature '${invalidSignature}'`);
  });

  test("shouldThrowApiVersionMismatchExceptionWhenUnmarshallingApiVersionMismatch", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const mismatchBody = validBody.replace('"apiVersion": "v1"', '"apiVersion": "v2"');
    const mismatchSignature = crypto
      .createHmac("sha256", secretKey)
      .update(mismatchBody)
      .digest("base64");
    const headers = {
      "x-gcs-signature": mismatchSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .unmarshal(mismatchBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error).toBeInstanceOf(ApiVersionMismatchError);
    expect(error.eventApiVersion).toBe("v2");
    expect(error.sdkApiVersion).toBe("v1");
  });

  test("shouldThrowSignatureValidationExceptionWhenUnmarshallingWithDuplicateHeaders", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {
      "x-gcs-signature": [validSignature, validSignature],
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .unmarshal(validBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe("found multiple values for header 'X-GCS-Signature'");
  });

  test("shouldThrowSecretKeyNotAvailableExceptionWhenUnmarshallingBufferWithoutAvailableSecretKey", async () => {
    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .unmarshal(Buffer.from(validBody), headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`could not find secret key for key id ${keyId}`);
    expect(error).toHaveProperty("keyId", keyId);
  });

  test("shouldThrowSignatureValidationExceptionWhenUnmarshallingBufferWithMissingHeaders", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {};
    const error = await webhooksHelper
      .unmarshal(Buffer.from(validBody), headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe("could not find header 'X-GCS-Signature'");
  });

  test("shouldThrowSignatureValidationExceptionWhenUnmarshallingBufferWithDuplicateHeaders", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {
      "x-gcs-signature": [validSignature, validSignature],
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .unmarshal(Buffer.from(validBody), headers)
      .then(() => undefined)
      .catch(e => e);
    expect(error).not.toBeUndefined();
    expect(error.message).toBe("found multiple values for header 'X-GCS-Signature'");
  });

  test("shouldThrowSignatureValidationExceptionWhenUnmarshallingInvalidBufferBody", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .unmarshal(Buffer.from(invalidBody), headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`failed to validate signature '${validSignature}'`);
  });

  test("shouldThrowSignatureValidationExceptionWhenUnmarshallingBufferWithInvalidSecretKey", async () => {
    const invalidSecretKey = "1" + secretKey;
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, invalidSecretKey);

    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .unmarshal(Buffer.from(validBody), headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`failed to validate signature '${validSignature}'`);
  });

  test("shouldThrowSignatureValidationExceptionWhenUnmarshallingBufferWithInvalidSignature", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const invalidSignature = "1" + validSignature;
    const headers = {
      "x-gcs-signature": invalidSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .unmarshal(Buffer.from(validBody), headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`failed to validate signature '${invalidSignature}'`);
  });
});

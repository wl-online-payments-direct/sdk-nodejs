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

import compare from "secure-compare";
import { webhooks } from "../../../src";
import { WebhooksHelper } from "../../../src/model/webhooks";

/**
 * @group webhooks
 */
describe("webhooks.validate", () => {
  let webhooksHelper: WebhooksHelper;

  beforeAll(() => {
    webhooksHelper = webhooks.init({
      getSecretKey: webhooks.inMemorySecretKeyStore.getSecretKey
    });
  });

  beforeEach(() => {
    webhooks.inMemorySecretKeyStore.clear();
  });

  test("shouldValidateValidWebhookFromStringWithoutErrors", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    await expect(webhooksHelper.validate(validBody, headers)).resolves.toBeUndefined();
  });

  test("shouldThrowSecretKeyNotAvailableExceptionWhenValidatingStringWithoutAvailableSecretKey", async () => {
    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .validate(validBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`could not find secret key for key id ${keyId}`);
    expect(error).toHaveProperty("keyId", keyId);
  });

  test("shouldThrowSignatureValidationExceptionWhenValidatingStringWithMissingHeaders", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {};
    const error = await webhooksHelper
      .validate(validBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe("could not find header 'X-GCS-Signature'");
  });

  test("shouldThrowSignatureValidationExceptionWhenValidatingStringWithDuplicateHeaders", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {
      "x-gcs-signature": [validSignature, validSignature],
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .validate(validBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe("found multiple values for header 'X-GCS-Signature'");
  });

  test("shouldThrowSignatureValidationExceptionWhenValidatingInvalidStringBody", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .validate(invalidBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`failed to validate signature '${validSignature}'`);
  });

  test("shouldThrowSignatureValidationExceptionWhenValidatingStringWithInvalidSecretKey", async () => {
    const invalidSecretKey = "1" + secretKey;
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, invalidSecretKey);

    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .validate(validBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`failed to validate signature '${validSignature}'`);
  });

  test("shouldThrowSignatureValidationExceptionWhenValidatingStringWithInvalidSignature", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const invalidSignature = "1" + validSignature;
    const headers = {
      "x-gcs-signature": invalidSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .validate(validBody, headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`failed to validate signature '${invalidSignature}'`);
  });

  test("shouldValidateValidWebhookFromByteArrayWithoutErrors", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    await expect(webhooksHelper.validate(Buffer.from(validBody), headers)).resolves.toBeUndefined();
  });

  test("shouldThrowSecretKeyNotAvailableExceptionWhenValidatingBufferWithoutAvailableSecretKey", async () => {
    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .validate(Buffer.from(validBody), headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`could not find secret key for key id ${keyId}`);
    expect(error).toHaveProperty("keyId", keyId);
  });

  test("shouldThrowSignatureValidationExceptionWhenValidatingBufferWithMissingHeaders", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {};
    const error = await webhooksHelper
      .validate(Buffer.from(validBody), headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe("could not find header 'X-GCS-Signature'");
  });

  test("shouldThrowSignatureValidationExceptionWhenValidatingBufferWithDuplicateHeaders", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {
      "x-gcs-signature": [validSignature, validSignature],
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .validate(Buffer.from(validBody), headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe("found multiple values for header 'X-GCS-Signature'");
  });

  test("shouldThrowSignatureValidationExceptionWhenValidatingInvalidBufferBody", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .validate(Buffer.from(invalidBody), headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`failed to validate signature '${validSignature}'`);
  });

  test("shouldThrowSignatureValidationExceptionWhenValidatingBufferWithInvalidSecretKey", async () => {
    const invalidSecretKey = "1" + secretKey;
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, invalidSecretKey);

    const headers = {
      "x-gcs-signature": validSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .validate(Buffer.from(validBody), headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`failed to validate signature '${validSignature}'`);
  });

  test("shouldThrowSignatureValidationExceptionWhenValidatingBufferWithInvalidSignature", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const invalidSignature = "1" + validSignature;
    const headers = {
      "x-gcs-signature": invalidSignature,
      "x-gcs-keyid": keyId
    };

    const error = await webhooksHelper
      .validate(Buffer.from(validBody), headers)
      .then(() => undefined)
      .catch(e => e);

    expect(error).not.toBeUndefined();
    expect(error.message).toBe(`failed to validate signature '${invalidSignature}'`);
  });
});

describe("webhooks.compareWithoutTimingLeak", () => {
  test("shouldReturnTrueForEqualInputsWhenComparingWithoutTimingLeak", () => {
    expect(compare("abc", "abc")).toBe(true);
    expect(compare("", "")).toBe(true);
    expect(compare(validSignature, validSignature)).toBe(true);
  });

  test("shouldReturnFalseForNonEqualInputsWhenComparingWithoutTimingLeak", () => {
    expect(compare("abc", "abd")).toBe(false);
    expect(compare("abc", "xbc")).toBe(false);
    expect(compare("abc", "abcd")).toBe(false);
    expect(compare("abcd", "abc")).toBe(false);
    expect(compare("", "a")).toBe(false);
    expect(compare("a", "")).toBe(false);
  });
});

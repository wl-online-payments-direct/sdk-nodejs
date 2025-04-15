/* eslint-disable @typescript-eslint/no-non-null-assertion */

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

import { webhooks } from "../../../src";
import { WebhooksHelper } from "../../../src/model/webhooks";

/**
 * @group unit:webhooks
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

  test("with no secret key available", async () => {
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

  test("with missing headers", async () => {
    webhooks.inMemorySecretKeyStore.storeSecretKey(keyId, secretKey);

    const headers = {};
    const error = await webhooksHelper
      .unmarshal(validBody, headers)
      .then(() => undefined)
      .catch(e => e);
    expect(error).not.toBeUndefined();
    expect(error.message).toBe("could not find header 'X-GCS-Signature'");
  });

  test("from string", async () => {
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

  test("from Buffer", async () => {
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

  test("from invalid body", async () => {
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

  test("with invalid secret key", async () => {
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

  test("with invalid signature", async () => {
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
});

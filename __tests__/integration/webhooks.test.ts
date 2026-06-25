import { randomUUID } from "crypto";
import client, { config } from "./init";
import { ValidateCredentialsRequestBuilder } from "./builders/webhooks/ValidateCredentialsRequestBuilder";
import { SendTestRequestBuilder } from "./builders/webhooks/SendTestRequestBuilder";
import { ValidateCredentialsResponse } from "../../src/generated/model/domain/index.js";

const VALID_WEBHOOK_KEY = "test-key";
const VALID_WEBHOOK_SECRET = "test-secret";
const INVALID_WEBHOOK_URL = "invalid-url";
const VALID_WEBHOOK_URL = "https://example.com/webhook";

describe("validateWebhookCredentials", () => {
  describe("with valid credentials", () => {
    test("shouldReturnResultWhenCredentialsAreValid", async () => {
      const response = await client.webhooks.validateWebhookCredentials(
        config.merchantId,
        new ValidateCredentialsRequestBuilder()
          .withKey(VALID_WEBHOOK_KEY)
          .withSecret(VALID_WEBHOOK_SECRET)
          .build()
      );

      expect(response.isSuccess).toBe(true);

      const body = response.body as ValidateCredentialsResponse;
      expect(body.result).toBeDefined();
    });

    test("shouldReturnResultWhenCallContextIsProvided", async () => {
      const response = await client.webhooks.validateWebhookCredentials(
        config.merchantId,
        new ValidateCredentialsRequestBuilder()
          .withKey(VALID_WEBHOOK_KEY)
          .withSecret(VALID_WEBHOOK_SECRET)
          .build(),
        { idempotence: { key: `test-webhooks-${randomUUID()}` } }
      );

      expect(response.isSuccess).toBe(true);

      const body = response.body as ValidateCredentialsResponse;
      expect(body.result).toBeDefined();
    });

    test("shouldReturnInvalidResultWhenSecretIsIncorrect", async () => {
      const response = await client.webhooks.validateWebhookCredentials(
        config.merchantId,
        new ValidateCredentialsRequestBuilder()
          .withKey(VALID_WEBHOOK_KEY)
          .withSecret("incorrect-secret")
          .build()
      );

      expect(response.isSuccess).toBe(true);

      const body = response.body as ValidateCredentialsResponse;
      expect(body.result).toBeDefined();
      expect(body.result).toBe("Invalid");
    });
  });
});

describe("sendTestWebhook", () => {
  describe("without webhook configuration", () => {
    test("shouldReturn400WhenWebhookIsNotConfigured", async () => {
      const response = await client.webhooks.sendTestWebhook(config.merchantId, new SendTestRequestBuilder().withUrl(VALID_WEBHOOK_URL).build());

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenWebhookIsNotConfiguredAndNoUrlIsProvided", async () => {
      const response = await client.webhooks.sendTestWebhook(config.merchantId, new SendTestRequestBuilder().build());

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });
  });

  describe("with invalid url", () => {
    test("shouldReturn400WhenUrlIsInvalid", async () => {
      const response = await client.webhooks.sendTestWebhook(config.merchantId, new SendTestRequestBuilder().withUrl(INVALID_WEBHOOK_URL).build());

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });
  });
});

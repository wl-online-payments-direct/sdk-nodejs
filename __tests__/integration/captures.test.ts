import client, { config } from "./init";
import { CreatePaymentRequestBuilder } from "./builders/common/CreatePaymentRequestBuilder";
import { CapturePaymentRequestBuilder } from "./builders/payments/CapturePaymentRequestBuilder";
import { CapturesResponse, CreatePaymentResponse } from "../../src/generated/model/domain/index.js";

const NON_EXISTING_PAYMENT_ID = "9999999999_0";

describe("Captures", () => {
  describe("getCaptures", () => {
    describe("with valid payment id", () => {
      let paymentId: string;

      beforeAll(async () => {
        const createResponse = await client.payments.createPayment(config.merchantId, new CreatePaymentRequestBuilder().build(), {});
        paymentId = (createResponse.body as CreatePaymentResponse).payment!.id!;
        await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});
      });

      test("shouldReturnCapturesWhenPaymentIdIsValid", async () => {
        const response = await client.captures.getCaptures(config.merchantId, paymentId);

        expect(response.isSuccess).toBe(true);
        expect(response.status).toBe(200);

        const body = response.body as CapturesResponse;
        expect(body.captures).toBeDefined();
        expect(body.captures!.length).toBeGreaterThan(0);
        expect(body.captures![0].id).toBeDefined();
        expect(body.captures![0].status).toBeDefined();
      });

      test("shouldReturnCapturesWhenCallContextIsProvided", async () => {
        const response = await client.captures.getCaptures(config.merchantId, paymentId, {});

        expect(response.isSuccess).toBe(true);
        expect(response.status).toBe(200);

        const body = response.body as CapturesResponse;
        expect(body.captures).toBeDefined();
        expect(body.captures!.length).toBeGreaterThan(0);
        expect(body.captures![0].id).toBeDefined();
        expect(body.captures![0].status).toBeDefined();
      });

      test("shouldReturnCaptureDetailsWhenPaymentIdIsValid", async () => {
        const response = await client.captures.getCaptures(config.merchantId, paymentId);
        expect(response.isSuccess).toBe(true);

        const body = response.body as CapturesResponse;
        expect(body.captures).toBeDefined();
        expect(body.captures!.length).toBeGreaterThan(0);

        const capture = body.captures![0];
        expect(capture.id).toBeDefined();
        expect(capture.status).toBeDefined();
        expect(capture.captureOutput).toBeDefined();
        expect(capture.statusOutput).toBeDefined();
      });

      test("shouldReturnMultipleCapturesIfExists", async () => {
        const response = await client.captures.getCaptures(config.merchantId, paymentId);
        expect(response.isSuccess).toBe(true);

        const body = response.body as CapturesResponse;
        expect(body.captures).toBeDefined();
        expect(body.captures!.length).toBeGreaterThan(0);

        for (const capture of body.captures!) {
          expect(capture.id).toBeDefined();
          expect(capture.status).toBeDefined();
        }
      });
    });

    describe("with invalid payment id", () => {
      test("shouldThrowReferenceException", async () => {
        const response = await client.captures.getCaptures(config.merchantId, NON_EXISTING_PAYMENT_ID);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });
  });
});

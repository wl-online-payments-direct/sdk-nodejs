import client, { config } from "./init";
import { CreatePaymentRequestBuilder } from "./builders/common/CreatePaymentRequestBuilder";
import { CapturePaymentRequestBuilder } from "./builders/payments/CapturePaymentRequestBuilder";
import { RefundRequestBuilder } from "./builders/payments/RefundRequestBuilder";
import { CreatePaymentResponse, RefundsResponse } from "../../src/generated/model/domain/index.js";

const NON_EXISTING_PAYMENT_ID = "9999999999_0";

describe("Refunds", () => {
  describe("getRefunds", () => {
    describe("with valid payment id", () => {
      let paymentId: string;

      beforeAll(async () => {
        const createResponse = await client.payments.createPayment(config.merchantId, new CreatePaymentRequestBuilder().build(), {});
        paymentId = (createResponse.body as CreatePaymentResponse).payment!.id!;
        await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});
        await client.payments.refundPayment(config.merchantId, paymentId, new RefundRequestBuilder().build(), {});
      });

      test("shouldReturnRefundsWhenPaymentIdIsValid", async () => {
        const response = await client.refunds.getRefunds(config.merchantId, paymentId);

        expect(response.isSuccess).toBe(true);
        expect(response.status).toBe(200);

        const body = response.body as RefundsResponse;
        expect(body.refunds).toBeDefined();
        expect(body.refunds!.length).toBeGreaterThan(0);
        expect(body.refunds![0].id).toBeDefined();
        expect(body.refunds![0].status).toBeDefined();
      });

      test("shouldReturnRefundsWhenCallContextIsProvided", async () => {
        const response = await client.refunds.getRefunds(config.merchantId, paymentId, {});

        expect(response.isSuccess).toBe(true);
        expect(response.status).toBe(200);

        const body = response.body as RefundsResponse;
        expect(body.refunds).toBeDefined();
        expect(body.refunds!.length).toBeGreaterThan(0);
        expect(body.refunds![0].id).toBeDefined();
        expect(body.refunds![0].status).toBeDefined();
      });

      test("shouldReturnRefundDetailsWhenPaymentIdIsValid", async () => {
        const response = await client.refunds.getRefunds(config.merchantId, paymentId);
        expect(response.isSuccess).toBe(true);

        const body = response.body as RefundsResponse;
        expect(body.refunds).toBeDefined();
        expect(body.refunds!.length).toBeGreaterThan(0);

        const refund = body.refunds![0];
        expect(refund.id).toBeDefined();
        expect(refund.status).toBeDefined();
        expect(refund.refundOutput).toBeDefined();
        expect(refund.statusOutput).toBeDefined();
      });

      test("shouldReturnMultipleRefundsIfExists", async () => {
        const response = await client.refunds.getRefunds(config.merchantId, paymentId);
        expect(response.isSuccess).toBe(true);

        const body = response.body as RefundsResponse;
        expect(body.refunds).toBeDefined();
        expect(body.refunds!.length).toBeGreaterThan(0);

        for (const refund of body.refunds!) {
          expect(refund.id).toBeDefined();
          expect(refund.status).toBeDefined();
        }
      });
    });

    describe("with invalid payment id", () => {
      test("shouldThrowReferenceException", async () => {
        const response = await client.refunds.getRefunds(config.merchantId, NON_EXISTING_PAYMENT_ID);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });
  });
});

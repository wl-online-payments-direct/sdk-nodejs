import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { CreatePaymentResponse } from "../../src/generated/model/domain/index.js";
import { CompletePaymentRequestBuilder } from "./builders/complete/CompletePaymentRequestBuilder";
import { CreatePaymentRequestBuilder } from "./builders/common/CreatePaymentRequestBuilder";

const NON_EXISTING_PAYMENT_ID = "9999999999_0";

describe("Complete", () => {
  describe("completePayment", () => {
    describe("with valid payment id", () => {
      test("shouldReturnErrorSinceRedirectPaymentFlow", async () => {
        const createResponse = await client.payments.createPayment(config.merchantId, new CreatePaymentRequestBuilder().withPayPalRedirectPaymentMethod().build());

        const paymentId = (createResponse.body as CreatePaymentResponse).payment!.id!;

        const response = await client.complete.completePayment(config.merchantId, paymentId, new CompletePaymentRequestBuilder().build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(500);
      });

      test("shouldReturnErrorSinceRedirectPaymentFlowWithCallContext", async () => {
        const createResponse = await client.payments.createPayment(config.merchantId, new CreatePaymentRequestBuilder().withPayPalRedirectPaymentMethod().build());

        const paymentId = (createResponse.body as CreatePaymentResponse).payment!.id!;

        const response = await client.complete.completePayment(config.merchantId, paymentId, new CompletePaymentRequestBuilder().build(), {
          idempotence: { key: `test-complete-${uuidv4()}` }
        });

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(500);
      });
    });

    describe("with invalid payment id", () => {
      test("shouldReturn404WhenPaymentIdDoesNotExist", async () => {
        const response = await client.complete.completePayment(config.merchantId, NON_EXISTING_PAYMENT_ID, new CompletePaymentRequestBuilder().build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });

    describe("with invalid input", () => {
      test("shouldThrowWhenOrderIsNull", async () => {
        const createResponse = await client.payments.createPayment(config.merchantId, new CreatePaymentRequestBuilder().withPayPalRedirectPaymentMethod().build());

        const paymentId = (createResponse.body as CreatePaymentResponse).payment!.id!;

        const request = new CompletePaymentRequestBuilder().withOrder(null).build();

        expect(() => client.complete.completePayment(config.merchantId, paymentId, request)).toThrow();
      });
    });
  });
});

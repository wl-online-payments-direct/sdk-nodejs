import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { CreatePaymentRequestBuilder } from "./builders/common/CreatePaymentRequestBuilder";
import { SubsequentPaymentRequestBuilder } from "./builders/subsequent/SubsequentPaymentRequestBuilder";
import { CreatePaymentResponse, SubsequentPaymentResponse } from "../../src/generated/model/domain/index.js";

const NON_EXISTING_PAYMENT_ID = "9999999999";

describe("SubsequentPayments", () => {
  describe("subsequentPayment", () => {
    let paymentId: string;
    beforeAll(async () => {
      const response = await client.payments.createPayment(config.merchantId, new CreatePaymentRequestBuilder().build(), {});
      paymentId = (response.body as CreatePaymentResponse).payment!.id!;
    });

    describe("with valid input", () => {
      test("shouldReturnPaymentIdWhenRequestIsValid", async () => {
        const response = await client.subsequent.subsequentPayment(config.merchantId, paymentId, new SubsequentPaymentRequestBuilder().build());

        expect(response.isSuccess).toBe(true);
        expect(response.body).toBeDefined();

        const body = response.body as SubsequentPaymentResponse;
        expect(body.payment).toBeDefined();
        expect(body.payment?.id).toBeTruthy();
        expect(body.payment?.status).toBeTruthy();
      });

      test("shouldReturnPaymentIdWhenCallContextIsProvided", async () => {
        const response = await client.subsequent.subsequentPayment(config.merchantId, paymentId, new SubsequentPaymentRequestBuilder().build(), {
          idempotence: { key: uuidv4() }
        });

        expect(response.isSuccess).toBe(true);
        expect(response.body).toBeDefined();

        const body = response.body as SubsequentPaymentResponse;
        expect(body.payment).toBeDefined();
        expect(body.payment?.id).toBeTruthy();
        expect(body.payment?.status).toBeTruthy();
      });
    });

    describe("with invalid amount", () => {
      test("shouldReturn400WhenAmountIsInvalid", async () => {
        const response = await client.subsequent.subsequentPayment(config.merchantId, paymentId, new SubsequentPaymentRequestBuilder().withAmount(-1000).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with invalid payment id", () => {
      test("shouldReturn404WhenPaymentIdDoesNotExist", async () => {
        const response = await client.subsequent.subsequentPayment(config.merchantId, NON_EXISTING_PAYMENT_ID, new SubsequentPaymentRequestBuilder().build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });
  });
});

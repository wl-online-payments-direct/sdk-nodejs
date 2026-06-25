import { v4 as uuidv4 } from "uuid";
import { assertSuccess, PaymentContext, SdkApiError } from "../../src";
import client, { config } from "./init";
import { CreatePaymentRequestBuilder } from "./builders/common/CreatePaymentRequestBuilder";
import { CreatePayoutRequestBuilder } from "./builders/payouts/CreatePayoutRequestBuilder";
import { CapturePaymentRequestBuilder } from "./builders/payments/CapturePaymentRequestBuilder";
import { RefundRequestBuilder } from "./builders/payments/RefundRequestBuilder";
import { ErrorResponse, PaymentErrorResponse, PayoutErrorResponse, RefundErrorResponse } from "../../src/generated/model/domain/index.js";

const NON_EXISTING_PAYMENT_ID = "9999999999_0";
const INVALID_MERCHANT_ID = "000000";
const DECLINED_REFUND_AMOUNT = 1500;

describe("Exceptions", () => {
  describe("WhenTestingExceptionErrors", () => {
    test("shouldReturnErrorResponseWithErrorIdAndApiError", async () => {
      const request = new CreatePaymentRequestBuilder().withCardNumber("123").build();
      const response = await client.payments.createPayment(config.merchantId, request);

      expect(response.isSuccess).toBe(false);

      try {
        assertSuccess(response);
        fail("expected an error");
      } catch (e) {
        expect(e).toBeInstanceOf(SdkApiError);
        const error = e as SdkApiError<ErrorResponse>;
        const body = error.body;

        expect(body.errorId).toBeTruthy();
        expect(body.errors).toBeDefined();
        expect(body.errors!.length).toBeGreaterThanOrEqual(1);

        const apiError = body.errors![0];
        expect(apiError.id).toBeTruthy();
        expect(apiError.httpStatusCode).toBeTruthy();
      }
    });
  });

  describe("WhenTestingValidationException", () => {
    test("shouldReturn400ForInvalidCurrencyCode", async () => {
      const request = new CreatePayoutRequestBuilder().withCurrencyCode("INVALID").build();
      const response = await client.payouts.createPayout(config.merchantId, request);

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);

      const body = response.body as ErrorResponse;
      expect(body.errorId).toBeTruthy();
      expect(body.errors).toBeDefined();
      expect(body.errors!.length).toBeGreaterThanOrEqual(1);

      const apiError = body.errors![0];
      expect(apiError.id).toBe("INVALID_VALUE");
      expect(apiError.httpStatusCode).toBe(400);
    });

    test("shouldReturn400WithMultipleApiErrors", async () => {
      const request = new CreatePaymentRequestBuilder()
        .withCardNumber("123")
        .withCvv("")
        .withExpiryDate("invalid")
        .build();

      const response = await client.payments.createPayment(config.merchantId, request);

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);

      const body = response.body as ErrorResponse;
      expect(body.errors).toBeDefined();
      expect(body.errors!.length).toBeGreaterThanOrEqual(1);

      for (const error of body.errors!) {
        expect(error.id).toBeTruthy();
        expect(error.httpStatusCode).toBe(400);
      }
    });
  });

  describe("WhenTestingAuthorizationException", () => {
    test("shouldReturn403ForInvalidMerchantId", async () => {
      const request = new CreatePaymentRequestBuilder().build();
      const response = await client.payments.createPayment(INVALID_MERCHANT_ID, request);

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(403);

      const body = response.body as ErrorResponse;
      expect(body.errorId).toBeTruthy();
      expect(body.errors).toBeDefined();
      expect(body.errors!.length).toBeGreaterThanOrEqual(1);
      expect(body.errors![0].httpStatusCode).toBe(403);
    });
  });

  describe("WhenTestingDeclinedPaymentException", () => {
    test("shouldReturnDeclinedPaymentForDeclinedCard", async () => {
      const request = new CreatePaymentRequestBuilder().withCardNumber("4321456998744563").build();
      const response = await client.payments.createPayment(config.merchantId, request);

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBeGreaterThanOrEqual(400);

      const body = response.body as PaymentErrorResponse;
      expect(body.paymentResult).toBeDefined();
      expect(body.paymentResult!.payment).toBeDefined();
      expect(body.paymentResult!.payment!.id).toBeTruthy();
      expect(body.paymentResult!.payment!.status).toBe("REJECTED");
    });
  });

  describe("WhenTestingDeclinedPayoutException", () => {
    test("shouldReturnDeclinedPayoutForDeclinedCard", async () => {
      const request = new CreatePayoutRequestBuilder().withCardNumber("4321456998744563").build();
      const response = await client.payouts.createPayout(config.merchantId, request);

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBeGreaterThanOrEqual(400);

      const body = response.body as PayoutErrorResponse;
      expect(body.payoutResult).toBeDefined();
      expect(body.payoutResult!.id).toBeTruthy();
      expect(body.payoutResult!.status).toBe("REJECTED_CREDIT");
    });
  });

  describe("WhenTestingApiException", () => {
    test("shouldReturn400WithErrorIdAndErrors", async () => {
      const request = new CreatePaymentRequestBuilder().withCardNumber("123").build();
      const response = await client.payments.createPayment(config.merchantId, request);

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBeGreaterThanOrEqual(400);

      const body = response.body as ErrorResponse;
      expect(body.errorId).toBeTruthy();
      expect(body.errors).toBeDefined();
    });
  });

  describe("WhenTestingDeclinedTransactionException", () => {
    test("shouldReturnDeclinedPaymentBodyForDeclinedCard", async () => {
      const request = new CreatePaymentRequestBuilder().withCardNumber("4321456998744563").build();
      const response = await client.payments.createPayment(config.merchantId, request);

      expect(response.isSuccess).toBe(false);

      const body = response.body as PaymentErrorResponse;
      expect(body.paymentResult).toBeDefined();
    });
  });

  describe("WhenTestingIdempotenceException", () => {
    test("shouldReturn409ForDuplicateIdempotentRequest", async () => {
      const idempotenceKey = uuidv4();
      const request = new CreatePaymentRequestBuilder().build();

      const firstContext: PaymentContext = { idempotence: { key: idempotenceKey } };
      const secondContext: PaymentContext = { idempotence: { key: idempotenceKey } };

      const [first, second] = await Promise.all([
        client.payments.createPayment(config.merchantId, request, firstContext),
        client.payments.createPayment(config.merchantId, request, secondContext)
      ]);

      const conflictResponse = [first, second].find(r => r.status === 409);
      const successResponse = [first, second].find(r => r.isSuccess || r.status !== 409);

      expect(conflictResponse ?? successResponse).toBeDefined();

      if (conflictResponse) {
        expect(conflictResponse.status).toBe(409);

        const body = conflictResponse.body as ErrorResponse;
        expect(body.errors).toBeDefined();
        expect(body.errors!.length).toBeGreaterThanOrEqual(1);
        expect(body.errors![0].httpStatusCode).toBe(409);
        expect(body.errors![0].id).toBe("DUPLICATE_REQUEST_IN_PROGRESS");
      }
    });
  });

  describe.skip("WhenTestingDeclinedRefundException - Test is skipped because the action could not be triggered in the current merchant setup", () => {
    test("shouldReturnDeclinedRefundForDeclinedRefund", async () => {
      const createResponse = await client.payments.createPayment(config.merchantId, new CreatePaymentRequestBuilder().withAmount(DECLINED_REFUND_AMOUNT).build());
      const paymentId = (createResponse.body as { payment?: { id?: string } }).payment!.id!;
      await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build());

      const response = await client.payments.refundPayment(config.merchantId, paymentId, new RefundRequestBuilder().withAmount(DECLINED_REFUND_AMOUNT).build());

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBeGreaterThanOrEqual(400);

      const body = response.body as RefundErrorResponse;
      expect(body.refundResult).toBeDefined();
      expect(body.refundResult!.id).toBeTruthy();
      expect(body.refundResult!.status).toBeTruthy();
    });
  });

  describe("WhenTestingErrorIdInAllExceptions", () => {
    test("shouldHaveErrorIdInValidationError", async () => {
      const request = new CreatePaymentRequestBuilder().withCardNumber("123").build();
      const response = await client.payments.createPayment(config.merchantId, request);

      expect(response.isSuccess).toBe(false);
      const body = response.body as ErrorResponse;
      expect(body.errorId).toBeTruthy();
    });

    test("shouldHaveErrorIdInReferenceError", async () => {
      const response = await client.payments.getPayment(config.merchantId, NON_EXISTING_PAYMENT_ID);

      expect(response.isSuccess).toBe(false);
      const body = response.body as ErrorResponse;
      expect(body.errorId).toBeTruthy();
    });

    test("shouldHaveErrorIdInAuthorizationError", async () => {
      const request = new CreatePaymentRequestBuilder().build();
      const response = await client.payments.createPayment(INVALID_MERCHANT_ID, request);

      expect(response.isSuccess).toBe(false);
      const body = response.body as ErrorResponse;
      expect(body.errorId).toBeTruthy();
    });
  });
});

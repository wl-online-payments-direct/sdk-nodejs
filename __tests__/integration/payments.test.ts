import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { PaymentContext } from "../../src";
import { CreatePaymentRequestBuilder } from "./builders/common/CreatePaymentRequestBuilder";
import { CancelPaymentRequestBuilder } from "./builders/payments/CancelPaymentRequestBuilder";
import { CapturePaymentRequestBuilder } from "./builders/payments/CapturePaymentRequestBuilder";
import { RefundRequestBuilder } from "./builders/payments/RefundRequestBuilder";
import {
  CancelPaymentResponse,
  CaptureResponse,
  CreatePaymentResponse,
  PaymentDetailsResponse,
  PaymentResponse,
  RefundErrorResponse,
  RefundResponse
} from "../../src/generated/model/domain/index.js";

const NON_EXISTING_PAYMENT_ID = "9999999999_0";

async function createPaymentAndGetId(amount = 1000, currencyCode = "EUR"): Promise<string> {
  const response = await client.payments.createPayment(
    config.merchantId,
    new CreatePaymentRequestBuilder()
      .withAmount(amount)
      .withCurrencyCode(currencyCode)
      .build(),
    {}
  );

  expect(response.isSuccess).toBe(true);
  expect(response.body).not.toBeNull();

  const createPaymentResponse = response.body as CreatePaymentResponse;
  const id = createPaymentResponse.payment?.id;

  if (!id) {
    throw new Error("createPaymentResponse.payment.id is missing");
  }

  return id;
}

describe("Payments", () => {
  describe("Create", () => {
    test("shouldReturnCreatedPaymentWhenInputIsValid", async () => {
      const request = new CreatePaymentRequestBuilder().build();
      const response = await client.payments.createPayment(config.merchantId, request, {});

      expect(response.isSuccess).toBe(true);

      const body = response.body as CreatePaymentResponse;

      expect(body.payment).toBeDefined();
      expect(body.payment!.id).toBeTruthy();
      expect(body.payment!.status).toBeTruthy();
    });

    test("shouldReturnIdempotentPaymentWhenIdempotenceKeyIsProvided", async () => {
      const request = new CreatePaymentRequestBuilder().build();
      const paymentContext: PaymentContext = { idempotence: { key: uuidv4() } };

      const firstResponse = await client.payments.createPayment(config.merchantId, request, paymentContext);
      expect(firstResponse.isSuccess).toBe(true);

      const firstBody = firstResponse.body as CreatePaymentResponse;
      expect(firstBody.payment!.id).toBeTruthy();
      expect(firstBody.payment!.status).toBeTruthy();

      expect(paymentContext.idempotence?.requestTimestamp).toBeFalsy();

      const secondResponse = await client.payments.createPayment(config.merchantId, request, paymentContext);
      expect(secondResponse.isSuccess).toBe(true);

      const secondBody = secondResponse.body as CreatePaymentResponse;
      expect(secondBody.payment!.id).toBe(firstBody.payment!.id);
      expect(paymentContext.idempotence?.requestTimestamp).toBeTruthy();
    });

    test("shouldReturn400WhenCardNumberIsInvalid", async () => {
      const request = new CreatePaymentRequestBuilder().withCardNumber("123").build();
      const response = await client.payments.createPayment(config.merchantId, request, {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturnErrorResponseWhenCardIsDeclined", async () => {
      const request = new CreatePaymentRequestBuilder().withCardNumber("4321456998744563").build();
      const response = await client.payments.createPayment(config.merchantId, request, {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(402);
    });
  });

  describe("WithAutoCapture", () => {
    test("shouldReturnCreatedPaymentWithAutoCapture", async () => {
      const request = new CreatePaymentRequestBuilder().withAutoCapture(true).build();
      const response = await client.payments.createPayment(config.merchantId, request, {});

      expect(response.isSuccess).toBe(true);

      const body = response.body as CreatePaymentResponse;
      expect(body.payment).toBeDefined();
      expect(body.payment!.id).toBeTruthy();
      expect(body.payment!.status).toBeTruthy();
    });
  });

  describe("Get", () => {
    test("shouldReturnPaymentWhenPaymentIdExists", async () => {
      const paymentId = await createPaymentAndGetId();
      const response = await client.payments.getPayment(config.merchantId, paymentId, {});
      expect(response.isSuccess).toBe(true);

      const body = response.body as PaymentResponse;
      expect(body.id).toBeTruthy();
      expect(body.id).toBe(paymentId);
      expect(body.status).toBeTruthy();
    });

    test("shouldReturnPaymentDetailsWhenPaymentIdExists", async () => {
      const paymentId = await createPaymentAndGetId();
      const response = await client.payments.getPaymentDetails(config.merchantId, paymentId, {});
      expect(response.isSuccess).toBe(true);

      const body = response.body as PaymentDetailsResponse;
      expect(body.id).toBeTruthy();
      expect(body.id).toBe(paymentId);
      expect(body.paymentOutput).toBeDefined();
      expect(body.status).toBeTruthy();
    });

    test("shouldReturn404WhenPaymentIdDoesNotExist", async () => {
      const response = await client.payments.getPayment(config.merchantId, NON_EXISTING_PAYMENT_ID, {});
      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(404);
    });

    test("shouldReturn404ForPaymentDetailsWhenPaymentIdDoesNotExist", async () => {
      const response = await client.payments.getPaymentDetails(config.merchantId, NON_EXISTING_PAYMENT_ID, {});
      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(404);
    });
  });

  describe("Cancel", () => {
    test("shouldReturnCancelledPaymentWhenRequestIsValid", async () => {
      const paymentId = await createPaymentAndGetId();
      const response = await client.payments.cancelPayment(config.merchantId, paymentId, new CancelPaymentRequestBuilder().build(), {});
      expect(response.isSuccess).toBe(true);

      const body = response.body as CancelPaymentResponse;
      expect(body.payment!.id).toBeTruthy();
      expect(body.payment!.id!.split("_")[0]).toBe(paymentId.split("_")[0]);
      expect(body.payment!.status).toBeTruthy();
    });

    test("shouldReturnCancelledPaymentWhenPartialAmountIsCancelled", async () => {
      const paymentId = await createPaymentAndGetId(800, "EUR");
      const response = await client.payments.cancelPayment(
        config.merchantId,
        paymentId,
        new CancelPaymentRequestBuilder()
          .withAmount(300)
          .withCurrencyCode("EUR")
          .withIsFinal(false)
          .build(),
        {}
      );

      expect(response.isSuccess).toBe(true);

      const body = response.body as CancelPaymentResponse;
      expect(body.payment!.id).toBeTruthy();
      expect(body.payment!.id!.split("_")[0]).toBe(paymentId.split("_")[0]);
      expect(body.payment!.status).toBeTruthy();
    });

    test("shouldReturnCancelledPaymentWhenTwoPartialAmountsAreCancelled", async () => {
      const paymentId = await createPaymentAndGetId(800, "EUR");

      const firstResponse = await client.payments.cancelPayment(
        config.merchantId,
        paymentId,
        new CancelPaymentRequestBuilder()
          .withAmount(300)
          .withCurrencyCode("EUR")
          .withIsFinal(false)
          .build(),
        {}
      );

      expect(firstResponse.isSuccess).toBe(true);
      expect((firstResponse.body as CancelPaymentResponse).payment!.id).toBeTruthy();
      expect((firstResponse.body as CancelPaymentResponse).payment!.id!.split("_")[0]).toBe(paymentId.split("_")[0]);

      const secondResponse = await client.payments.cancelPayment(
        config.merchantId,
        paymentId,
        new CancelPaymentRequestBuilder()
          .withAmount(500)
          .withCurrencyCode("EUR")
          .withIsFinal(true)
          .build(),
        {}
      );

      expect(secondResponse.isSuccess).toBe(true);
      expect((secondResponse.body as CancelPaymentResponse).payment!.id).toBeTruthy();
      expect((secondResponse.body as CancelPaymentResponse).payment!.id!.split("_")[0]).toBe(paymentId.split("_")[0]);
    });

    test("shouldReturn400WhenSecondPartialCancelAmountExceedsRemaining", async () => {
      const paymentId = await createPaymentAndGetId(800, "EUR");

      await client.payments.cancelPayment(
        config.merchantId,
        paymentId,
        new CancelPaymentRequestBuilder()
          .withAmount(300)
          .withCurrencyCode("EUR")
          .withIsFinal(false)
          .build(),
        {}
      );

      const response = await client.payments.cancelPayment(
        config.merchantId,
        paymentId,
        new CancelPaymentRequestBuilder()
          .withAmount(600)
          .withCurrencyCode("EUR")
          .withIsFinal(false)
          .build(),
        {}
      );

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn404WhenCancelPaymentIdDoesNotExist", async () => {
      const response = await client.payments.cancelPayment(config.merchantId, NON_EXISTING_PAYMENT_ID, new CancelPaymentRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(404);
    });

    test("shouldReturn400WhenCancelledAfterCapture", async () => {
      const paymentId = await createPaymentAndGetId();
      await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});

      const response = await client.payments.cancelPayment(config.merchantId, paymentId, new CancelPaymentRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenPartialCancelAfterPartialCaptureExceedsRemaining", async () => {
      const paymentId = await createPaymentAndGetId(800, "EUR");
      await client.payments.capturePayment(
        config.merchantId,
        paymentId,
        new CapturePaymentRequestBuilder()
          .withAmount(600)
          .withIsFinal(false)
          .build(),
        {}
      );

      const response = await client.payments.cancelPayment(
        config.merchantId,
        paymentId,
        new CancelPaymentRequestBuilder()
          .withAmount(400)
          .withCurrencyCode("EUR")
          .withIsFinal(false)
          .build(),
        {}
      );

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenCancelledAfterRefund", async () => {
      const paymentId = await createPaymentAndGetId();
      await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});
      await client.payments.refundPayment(config.merchantId, paymentId, new RefundRequestBuilder().build(), {});

      const response = await client.payments.cancelPayment(config.merchantId, paymentId, new CancelPaymentRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenCancelledAfterPreviousCancel", async () => {
      const paymentId = await createPaymentAndGetId();
      await client.payments.cancelPayment(config.merchantId, paymentId, new CancelPaymentRequestBuilder().build(), {});

      const response = await client.payments.cancelPayment(config.merchantId, paymentId, new CancelPaymentRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });
  });

  describe("Capture", () => {
    test("shouldReturnCapturedPaymentWhenRequestIsValid", async () => {
      const paymentId = await createPaymentAndGetId();
      const response = await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});
      expect(response.isSuccess).toBe(true);

      const body = response.body as CaptureResponse;
      expect(body.id).toBeTruthy();
      expect(body.status).toBeTruthy();
    });

    test("shouldReturnCapturedPaymentWhenPartialAmountIsCaptured", async () => {
      const paymentId = await createPaymentAndGetId(800, "EUR");
      const response = await client.payments.capturePayment(
        config.merchantId,
        paymentId,
        new CapturePaymentRequestBuilder()
          .withAmount(300)
          .withIsFinal(false)
          .build(),
        {}
      );

      expect(response.isSuccess).toBe(true);
      const body = response.body as CaptureResponse;
      expect(body.id).toBeTruthy();
      expect(body.status).toBeTruthy();
    });

    test("shouldReturnCapturedPaymentWhenTwoPartialAmountsAreCaptured", async () => {
      const paymentId = await createPaymentAndGetId(800, "EUR");

      const firstResponse = await client.payments.capturePayment(
        config.merchantId,
        paymentId,
        new CapturePaymentRequestBuilder()
          .withAmount(300)
          .withIsFinal(false)
          .build(),
        {}
      );

      expect(firstResponse.isSuccess).toBe(true);
      expect((firstResponse.body as CaptureResponse).id).toBeTruthy();

      const secondResponse = await client.payments.capturePayment(
        config.merchantId,
        paymentId,
        new CapturePaymentRequestBuilder()
          .withAmount(500)
          .withIsFinal(true)
          .build(),
        {}
      );

      expect(secondResponse.isSuccess).toBe(true);
      expect((secondResponse.body as CaptureResponse).id).toBeTruthy();
    });

    test("shouldReturn400WhenSecondPartialCaptureAmountExceedsRemaining", async () => {
      const paymentId = await createPaymentAndGetId(800, "EUR");

      await client.payments.capturePayment(
        config.merchantId,
        paymentId,
        new CapturePaymentRequestBuilder()
          .withAmount(300)
          .withIsFinal(false)
          .build(),
        {}
      );

      const response = await client.payments.capturePayment(
        config.merchantId,
        paymentId,
        new CapturePaymentRequestBuilder()
          .withAmount(600)
          .withIsFinal(false)
          .build(),
        {}
      );

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturnCapturedPaymentWhenCapturedAfterPartialCancel", async () => {
      const paymentId = await createPaymentAndGetId(800, "EUR");

      await client.payments.cancelPayment(
        config.merchantId,
        paymentId,
        new CancelPaymentRequestBuilder()
          .withAmount(600)
          .withCurrencyCode("EUR")
          .withIsFinal(false)
          .build(),
        {}
      );

      const response = await client.payments.capturePayment(
        config.merchantId,
        paymentId,
        new CapturePaymentRequestBuilder()
          .withAmount(200)
          .withIsFinal(true)
          .build(),
        {}
      );

      expect(response.isSuccess).toBe(true);
      const body = response.body as CaptureResponse;
      expect(body.id).toBeTruthy();
      expect(body.status).toBeTruthy();
    });

    test("shouldReturn404WhenCapturePaymentIdDoesNotExist", async () => {
      const response = await client.payments.capturePayment(config.merchantId, NON_EXISTING_PAYMENT_ID, new CapturePaymentRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(404);
    });

    test("shouldReturn400WhenCapturedAfterPreviousCapture", async () => {
      const paymentId = await createPaymentAndGetId();
      await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});

      const response = await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});
      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenCapturedAfterCancel", async () => {
      const paymentId = await createPaymentAndGetId();
      await client.payments.cancelPayment(config.merchantId, paymentId, new CancelPaymentRequestBuilder().build(), {});

      const response = await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});
      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenCapturedAfterRefund", async () => {
      const paymentId = await createPaymentAndGetId();
      await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});
      await client.payments.refundPayment(config.merchantId, paymentId, new RefundRequestBuilder().build(), {});

      const response = await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});
      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });
  });

  describe("Refund", () => {
    test("shouldReturnRefundWithIdAndStatusWhenRequestIsValid", async () => {
      const paymentId = await createPaymentAndGetId();
      await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});

      const response = await client.payments.refundPayment(config.merchantId, paymentId, new RefundRequestBuilder().build(), {});
      expect(response.isSuccess).toBe(true);
      const body = response.body as RefundResponse;
      expect(body.id).toBeTruthy();
      expect(body.status).toBeTruthy();
    });

    test("shouldReturnNonRejectedStatusWhenTwoPartialRefundsAreMade", async () => {
      const paymentId = await createPaymentAndGetId(1500, "EUR");
      await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});

      await client.payments.refundPayment(
        config.merchantId,
        paymentId,
        new RefundRequestBuilder()
          .withAmount(300)
          .withCurrencyCode("EUR")
          .withIsFinal(false)
          .build(),
        {}
      );

      const response = await client.payments.refundPayment(
        config.merchantId,
        paymentId,
        new RefundRequestBuilder()
          .withAmount(400)
          .withCurrencyCode("EUR")
          .withIsFinal(false)
          .build(),
        {}
      );

      expect(response.isSuccess).toBe(true);

      const body = response.body as RefundResponse;
      expect(body.id).toBeTruthy();
      expect(body.status).toBe("REFUND_REQUESTED");
    });

    test("shouldReturnActionNotAllowedWhenTotalRefundExceedsCapture", async () => {
      const paymentId = await createPaymentAndGetId(800, "EUR");
      await client.payments.capturePayment(
        config.merchantId,
        paymentId,
        new CapturePaymentRequestBuilder()
          .withAmount(400)
          .withIsFinal(true)
          .build(),
        {}
      );

      const response = await client.payments.refundPayment(
        config.merchantId,
        paymentId,
        new RefundRequestBuilder()
          .withAmount(600)
          .withCurrencyCode("EUR")
          .build(),
        {}
      );

      expect(response.isSuccess).toBe(false);

      expect(response.body).toBeDefined();
      const refundErrorResponse = response.body as RefundErrorResponse;
      expect(refundErrorResponse.errors).toBeDefined();
      expect(refundErrorResponse.errors).toBeTruthy();
      expect(refundErrorResponse.errors![0]).toBeDefined();
      expect(refundErrorResponse.errors![0].message).toEqual("ACTION_NOT_ALLOWED_ON_TRANSACTION");
    });

    test("shouldReturnActionNotAllowedWhenSingleRefundExceedsCapture", async () => {
      const paymentId = await createPaymentAndGetId(800, "EUR");
      await client.payments.capturePayment(
        config.merchantId,
        paymentId,
        new CapturePaymentRequestBuilder()
          .withAmount(300)
          .withIsFinal(true)
          .build(),
        {}
      );

      const response = await client.payments.refundPayment(
        config.merchantId,
        paymentId,
        new RefundRequestBuilder()
          .withAmount(600)
          .withCurrencyCode("EUR")
          .build(),
        {}
      );

      expect(response.isSuccess).toBe(false);

      expect(response.body).toBeDefined();
      const refundErrorResponse = response.body as RefundErrorResponse;
      expect(refundErrorResponse.errors).toBeDefined();
      expect(refundErrorResponse.errors).toBeTruthy();
      expect(refundErrorResponse.errors![0]).toBeDefined();
      expect(refundErrorResponse.errors![0].message).toEqual("ACTION_NOT_ALLOWED_ON_TRANSACTION");
    });

    test("shouldReturn404WhenRefundPaymentIdDoesNotExist", async () => {
      const response = await client.payments.refundPayment(config.merchantId, NON_EXISTING_PAYMENT_ID, new RefundRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(404);
    });

    test("shouldReturn400WhenRefundedWithoutCapture", async () => {
      const paymentId = await createPaymentAndGetId();
      const response = await client.payments.refundPayment(config.merchantId, paymentId, new RefundRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenRefundedAfterCancel", async () => {
      const paymentId = await createPaymentAndGetId();
      await client.payments.cancelPayment(config.merchantId, paymentId, new CancelPaymentRequestBuilder().build(), {});

      const response = await client.payments.refundPayment(config.merchantId, paymentId, new RefundRequestBuilder().build(), {});
      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturnActionNotAllowedWhenRefundedAfterPreviousFullRefund", async () => {
      const paymentId = await createPaymentAndGetId();
      await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});

      const firstResponse = await client.payments.refundPayment(config.merchantId, paymentId, new RefundRequestBuilder().build(), {});
      expect(firstResponse.isSuccess).toBe(true);
      expect((firstResponse.body as RefundResponse).status).toBe("REFUND_REQUESTED");

      const secondResponse = await client.payments.refundPayment(config.merchantId, paymentId, new RefundRequestBuilder().build(), {});

      expect(secondResponse.isSuccess).toBe(false);
      expect(secondResponse.body).toBeDefined();
      const refundErrorResponse = secondResponse.body as RefundErrorResponse;
      expect(refundErrorResponse.errors).toBeDefined();
      expect(refundErrorResponse.errors).toBeTruthy();
      expect(refundErrorResponse.errors![0]).toBeDefined();
      expect(refundErrorResponse.errors![0].message).toEqual("ACTION_NOT_ALLOWED_ON_TRANSACTION");
    });
  });
});

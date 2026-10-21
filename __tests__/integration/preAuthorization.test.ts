import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { PaymentContext } from "../../src";
import { CreatePaymentRequestBuilder } from "./builders/common/CreatePaymentRequestBuilder";
import { CancelPaymentRequestBuilder } from "./builders/payments/CancelPaymentRequestBuilder";
import { CapturePaymentRequestBuilder } from "./builders/payments/CapturePaymentRequestBuilder";
import { IncrementAuthorizationRequestBuilder } from "./builders/preAuthorization/IncrementAuthorizationRequestBuilder";
import { UpdateAuthorizationAdditionalDataRequestBuilder } from "./builders/preAuthorization/UpdateAuthorizationAdditionalDataRequestBuilder";
import {
  AddAuthorizationDetailsResponse,
  CaptureResponse,
  CreatePaymentResponse,
  IncrementAuthorizationResponse,
  PaymentResponse
} from "../../src/generated/model/domain/index.js";

const NON_EXISTING_PAYMENT_ID = "9999999999_0";
const CURRENCY_CODE = "EUR";
const PAYMENT_AMOUNT = 1000;
const INCREMENTED_AMOUNT = 1500;
const MASTERCARD_CARD_NUMBER = "5137009801943438";
const MASTERCARD_PAYMENT_PRODUCT_ID = 3;

async function createPaymentAndGetId(builder: CreatePaymentRequestBuilder): Promise<string> {
  const response = await client.payments.createPayment(
    config.merchantId,
    builder
      .withAmount(PAYMENT_AMOUNT)
      .withCurrencyCode(CURRENCY_CODE)
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

function createPreAuthorizedPaymentAndGetId(): Promise<string> {
  return createPaymentAndGetId(new CreatePaymentRequestBuilder().withAuthorizationMode("PRE_AUTHORIZATION"));
}

function createMastercardPaymentAndGetId(): Promise<string> {
  return createPaymentAndGetId(new CreatePaymentRequestBuilder().withCardNumber(MASTERCARD_CARD_NUMBER).withPaymentProductId(MASTERCARD_PAYMENT_PRODUCT_ID));
}

function createPreAuthorizedMastercardPaymentAndGetId(): Promise<string> {
  return createPaymentAndGetId(
    new CreatePaymentRequestBuilder()
      .withAuthorizationMode("PRE_AUTHORIZATION")
      .withCardNumber(MASTERCARD_CARD_NUMBER)
      .withPaymentProductId(MASTERCARD_PAYMENT_PRODUCT_ID)
  );
}

describe("PreAuthorization", () => {
  describe("IncrementAuthorization", () => {
    test("shouldReturnIncrementedPaymentWhenPaymentIsPreAuthorized", async () => {
      const paymentId = await createPreAuthorizedMastercardPaymentAndGetId();
      const request = new IncrementAuthorizationRequestBuilder().withAmount(INCREMENTED_AMOUNT).build();

      const response = await client.preAuthorization.incrementAuthorization(config.merchantId, paymentId, request, {});
      expect(response.isSuccess).toBe(true);

      const body = response.body as IncrementAuthorizationResponse;
      expect(body.payment).toBeDefined();
      expect(body.payment!.id).toBeTruthy();
      expect(body.payment!.status).toBe("PENDING_CAPTURE");

      const paymentResponse = await client.payments.getPayment(config.merchantId, paymentId, {});
      expect(paymentResponse.isSuccess).toBe(true);

      const payment = paymentResponse.body as PaymentResponse;
      expect(payment).toBeDefined();
      expect(payment.status).toBe("PENDING_CAPTURE");
      expect(payment.paymentOutput).toBeDefined();
      expect(payment.paymentOutput!.amountOfMoney).toBeDefined();
      expect(payment.paymentOutput!.amountOfMoney!.amount).toBe(INCREMENTED_AMOUNT);
    });

    test("shouldReturnIncrementedPaymentWhenIdempotenceKeyIsProvided", async () => {
      const paymentId = await createPreAuthorizedMastercardPaymentAndGetId();
      const request = new IncrementAuthorizationRequestBuilder().withAmount(INCREMENTED_AMOUNT).build();
      const paymentContext: PaymentContext = { idempotence: { key: uuidv4() } };

      const response = await client.preAuthorization.incrementAuthorization(config.merchantId, paymentId, request, paymentContext);
      expect(response.isSuccess).toBe(true);

      const body = response.body as IncrementAuthorizationResponse;
      expect(body.payment).toBeDefined();
      expect(body.payment!.id).toBeTruthy();
      expect(body.payment!.status).toBe("PENDING_CAPTURE");

      const paymentResponse = await client.payments.getPayment(config.merchantId, paymentId, {});
      expect(paymentResponse.isSuccess).toBe(true);

      const payment = paymentResponse.body as PaymentResponse;
      expect(payment).toBeDefined();
      expect(payment.status).toBe("PENDING_CAPTURE");
      expect(payment.paymentOutput).toBeDefined();
      expect(payment.paymentOutput!.amountOfMoney).toBeDefined();
      expect(payment.paymentOutput!.amountOfMoney!.amount).toBe(INCREMENTED_AMOUNT);
    });

    test("shouldReturnCumulativeAmountWhenPaymentIsIncrementedTwice", async () => {
      const paymentId = await createPreAuthorizedMastercardPaymentAndGetId();

      const firstResponse = await client.preAuthorization.incrementAuthorization(
        config.merchantId,
        paymentId,
        new IncrementAuthorizationRequestBuilder().withAmount(1300).build(),
        {}
      );
      expect(firstResponse.isSuccess).toBe(true);

      const secondResponse = await client.preAuthorization.incrementAuthorization(
        config.merchantId,
        paymentId,
        new IncrementAuthorizationRequestBuilder().withAmount(INCREMENTED_AMOUNT).build(),
        {}
      );
      expect(secondResponse.isSuccess).toBe(true);

      const paymentResponse = await client.payments.getPayment(config.merchantId, paymentId, {});
      expect(paymentResponse.isSuccess).toBe(true);

      const payment = paymentResponse.body as PaymentResponse;
      expect(payment).toBeDefined();
      expect(payment.status).toBe("PENDING_CAPTURE");
      expect(payment.paymentOutput).toBeDefined();
      expect(payment.paymentOutput!.amountOfMoney).toBeDefined();
      expect(payment.paymentOutput!.amountOfMoney!.amount).toBe(INCREMENTED_AMOUNT);
    });

    test("shouldReturnCapturedPaymentWhenIncrementedAmountIsCaptured", async () => {
      const paymentId = await createPreAuthorizedMastercardPaymentAndGetId();

      await client.preAuthorization.incrementAuthorization(config.merchantId, paymentId, new IncrementAuthorizationRequestBuilder().withAmount(INCREMENTED_AMOUNT).build(), {});

      const captureRequest = new CapturePaymentRequestBuilder()
        .withAmount(INCREMENTED_AMOUNT)
        .withIsFinal(true)
        .build();

      const response = await client.payments.capturePayment(config.merchantId, paymentId, captureRequest, {});
      expect(response.isSuccess).toBe(true);

      const body = response.body as CaptureResponse;
      expect(body.id).toBeTruthy();
      expect(body.status).toBe("CAPTURE_REQUESTED");
    });

    test("shouldReturn404WhenPaymentIdDoesNotExist", async () => {
      const response = await client.preAuthorization.incrementAuthorization(config.merchantId, NON_EXISTING_PAYMENT_ID, new IncrementAuthorizationRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(404);
    });

    test("shouldReturn400WhenAmountOfMoneyIsMissing", async () => {
      const paymentId = await createPreAuthorizedMastercardPaymentAndGetId();

      const response = await client.preAuthorization.incrementAuthorization(config.merchantId, paymentId, {}, {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenAmountIsZero", async () => {
      const paymentId = await createPreAuthorizedMastercardPaymentAndGetId();

      const response = await client.preAuthorization.incrementAuthorization(config.merchantId, paymentId, new IncrementAuthorizationRequestBuilder().withAmount(0).build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenCurrencyIsDifferent", async () => {
      const paymentId = await createPreAuthorizedMastercardPaymentAndGetId();

      const response = await client.preAuthorization.incrementAuthorization(
        config.merchantId,
        paymentId,
        new IncrementAuthorizationRequestBuilder().withCurrencyCode("USD").build(),
        {}
      );

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenPaymentIsFinalAuthorization", async () => {
      const paymentId = await createMastercardPaymentAndGetId();

      const response = await client.preAuthorization.incrementAuthorization(config.merchantId, paymentId, new IncrementAuthorizationRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenIncrementedAfterCapture", async () => {
      const paymentId = await createPreAuthorizedMastercardPaymentAndGetId();
      await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});

      const response = await client.preAuthorization.incrementAuthorization(config.merchantId, paymentId, new IncrementAuthorizationRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenIncrementedAfterCancel", async () => {
      const paymentId = await createPreAuthorizedMastercardPaymentAndGetId();
      await client.payments.cancelPayment(config.merchantId, paymentId, new CancelPaymentRequestBuilder().build(), {});

      const response = await client.preAuthorization.incrementAuthorization(config.merchantId, paymentId, new IncrementAuthorizationRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });
  });

  describe("AddAuthorizationDetails", () => {
    test("shouldReturnPaymentWhenFullCarRentalDataIsProvided", async () => {
      const paymentId = await createPreAuthorizedPaymentAndGetId();

      const response = await client.preAuthorization.addAuthorizationDetails(config.merchantId, paymentId, new UpdateAuthorizationAdditionalDataRequestBuilder().build(), {});
      expect(response.isSuccess).toBe(true);

      const body = response.body as AddAuthorizationDetailsResponse;
      expect(body.payment).toBeDefined();
      expect(body.payment!.id).toBeTruthy();
      expect(body.payment!.status).toBe("PENDING_CAPTURE");
    });

    test("shouldReturnPaymentWhenMinimalCarRentalDataIsProvided", async () => {
      const paymentId = await createPreAuthorizedPaymentAndGetId();
      const request = new UpdateAuthorizationAdditionalDataRequestBuilder().withMinimalCarRentalData().build();

      const response = await client.preAuthorization.addAuthorizationDetails(config.merchantId, paymentId, request, {});
      expect(response.isSuccess).toBe(true);

      const body = response.body as AddAuthorizationDetailsResponse;
      expect(body.payment).toBeDefined();
      expect(body.payment!.id).toBeTruthy();
      expect(body.payment!.status).toBe("PENDING_CAPTURE");
    });

    test("shouldReturnPaymentWhenIdempotenceKeyIsProvided", async () => {
      const paymentId = await createPreAuthorizedPaymentAndGetId();
      const paymentContext: PaymentContext = { idempotence: { key: uuidv4() } };

      const response = await client.preAuthorization.addAuthorizationDetails(
        config.merchantId,
        paymentId,
        new UpdateAuthorizationAdditionalDataRequestBuilder().build(),
        paymentContext
      );
      expect(response.isSuccess).toBe(true);

      const body = response.body as AddAuthorizationDetailsResponse;
      expect(body.payment).toBeDefined();
      expect(body.payment!.id).toBeTruthy();
      expect(body.payment!.status).toBe("PENDING_CAPTURE");
    });

    test("shouldReturnCapturedPaymentWhenCapturedAfterAddingDetails", async () => {
      const paymentId = await createPreAuthorizedPaymentAndGetId();

      await client.preAuthorization.addAuthorizationDetails(config.merchantId, paymentId, new UpdateAuthorizationAdditionalDataRequestBuilder().build(), {});

      const response = await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});
      expect(response.isSuccess).toBe(true);

      const body = response.body as CaptureResponse;
      expect(body.id).toBeTruthy();
      expect(body.status).toBe("CAPTURE_REQUESTED");
    });

    test("shouldReturn404WhenPaymentIdDoesNotExist", async () => {
      const response = await client.preAuthorization.addAuthorizationDetails(
        config.merchantId,
        NON_EXISTING_PAYMENT_ID,
        new UpdateAuthorizationAdditionalDataRequestBuilder().build(),
        {}
      );

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(404);
    });

    test("shouldReturn400WhenCarRentalDataIsMissing", async () => {
      const paymentId = await createPreAuthorizedPaymentAndGetId();

      const response = await client.preAuthorization.addAuthorizationDetails(config.merchantId, paymentId, {}, {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenCarRentalDataIsInvalid", async () => {
      const paymentId = await createPreAuthorizedPaymentAndGetId();
      const request = new UpdateAuthorizationAdditionalDataRequestBuilder().withChargesCategory("invalid").build();

      const response = await client.preAuthorization.addAuthorizationDetails(config.merchantId, paymentId, request, {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenDetailsAreAddedAfterCapture", async () => {
      const paymentId = await createPreAuthorizedPaymentAndGetId();
      await client.payments.capturePayment(config.merchantId, paymentId, new CapturePaymentRequestBuilder().build(), {});

      const response = await client.preAuthorization.addAuthorizationDetails(config.merchantId, paymentId, new UpdateAuthorizationAdditionalDataRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });

    test("shouldReturn400WhenDetailsAreAddedAfterCancel", async () => {
      const paymentId = await createPreAuthorizedPaymentAndGetId();
      await client.payments.cancelPayment(config.merchantId, paymentId, new CancelPaymentRequestBuilder().build(), {});

      const response = await client.preAuthorization.addAuthorizationDetails(config.merchantId, paymentId, new UpdateAuthorizationAdditionalDataRequestBuilder().build(), {});

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(400);
    });
  });
});

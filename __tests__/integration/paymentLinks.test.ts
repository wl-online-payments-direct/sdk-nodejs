import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { PaymentLinkResponse } from "../../src/generated/model/domain/index.js";
import { CreatePaymentLinkRequestBuilder } from "./builders/paymentLinks/CreatePaymentLinkRequestBuilder";
import { PaymentContext } from "../../src";

const UNKNOWN_PAYMENT_LINK_ID = "00000000-0000-0000-0000-000000000000";
const INVALID_PAYMENT_LINK_ID = "invalid-id";

describe("Payment links", () => {
  describe("createPaymentLink", () => {
    describe("with valid input", () => {
      test("shouldReturnCreatedPaymentLinkWhenInputIsValid", async () => {
        const response = await client.paymentLinks.createPaymentLink(config.merchantId, new CreatePaymentLinkRequestBuilder().build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentLinkResponse;
        expect(body.paymentLinkId).toBeDefined();
        expect(body.redirectionUrl).toBeDefined();
        expect(body.status).toBeDefined();
      });

      test("shouldReturnCreatedPaymentLinkWhenCallContextIsProvided", async () => {
        const callContext: PaymentContext = { idempotence: { key: `test-payment-link-${uuidv4()}` } };
        const response = await client.paymentLinks.createPaymentLink(config.merchantId, new CreatePaymentLinkRequestBuilder().build(), callContext);

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentLinkResponse;
        expect(body.paymentLinkId).toBeDefined();
        expect(body.redirectionUrl).toBeDefined();
        expect(body.status).toBeDefined();
      });

      test("shouldReturnCreatedPaymentLinkWithQrCodeBase64WhenDisplayQRCodeIsTrue", async () => {
        const response = await client.paymentLinks.createPaymentLink(config.merchantId, new CreatePaymentLinkRequestBuilder().withDisplayQRCode(true).build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentLinkResponse;
        expect(body.paymentLinkId).toBeDefined();
        expect(body.qrCodeBase64).toBeDefined();
      });

      test("shouldReturnCreatedPaymentLinkWithIsReusableLinkSetToTrueWhenIsReusableLinkIsTrue", async () => {
        const response = await client.paymentLinks.createPaymentLink(config.merchantId, new CreatePaymentLinkRequestBuilder().withIsReusableLink(true).build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentLinkResponse;
        expect(body.isReusableLink).toBe(true);
      });
    });

    describe("with invalid input", () => {
      test("shouldReturn400WhenAmountIsNegative", async () => {
        const response = await client.paymentLinks.createPaymentLink(config.merchantId, new CreatePaymentLinkRequestBuilder().withAmount(-1000).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });

      test("shouldReturn400WhenExpirationDateIsInThePast", async () => {
        const pastDate = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
        const response = await client.paymentLinks.createPaymentLink(config.merchantId, new CreatePaymentLinkRequestBuilder().withExpirationDate(pastDate).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });
  });

  describe("getPaymentLinkById", () => {
    describe("with valid payment link id", () => {
      let paymentLinkId: string;

      beforeAll(async () => {
        const createResponse = await client.paymentLinks.createPaymentLink(config.merchantId, new CreatePaymentLinkRequestBuilder().build());
        paymentLinkId = (createResponse.body as PaymentLinkResponse).paymentLinkId!;
      });

      test("shouldReturnPaymentLinkWhenPaymentLinkIdIsValid", async () => {
        const response = await client.paymentLinks.getPaymentLinkById(config.merchantId, paymentLinkId);

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentLinkResponse;
        expect(body.paymentLinkId).toBe(paymentLinkId);
        expect(body.status).toBeDefined();
      });
    });

    describe("with invalid payment link id", () => {
      test("shouldReturn404WhenPaymentLinkIdDoesNotExist", async () => {
        const response = await client.paymentLinks.getPaymentLinkById(config.merchantId, UNKNOWN_PAYMENT_LINK_ID);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });

      test("shouldReturn400WhenPaymentLinkIdFormatIsInvalid", async () => {
        const response = await client.paymentLinks.getPaymentLinkById(config.merchantId, INVALID_PAYMENT_LINK_ID);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });
  });

  describe("cancelPaymentLinkById", () => {
    describe("with valid payment link id", () => {
      let paymentLinkId: string;

      beforeAll(async () => {
        const createResponse = await client.paymentLinks.createPaymentLink(config.merchantId, new CreatePaymentLinkRequestBuilder().build());
        paymentLinkId = (createResponse.body as PaymentLinkResponse).paymentLinkId!;
      });

      test("shouldCancelPaymentLinkWhenPaymentLinkIdIsValid", async () => {
        const response = await client.paymentLinks.cancelPaymentLinkById(config.merchantId, paymentLinkId);

        expect(response.isSuccess).toBe(true);

        const getResponse = await client.paymentLinks.getPaymentLinkById(config.merchantId, paymentLinkId);
        const paymentLink = getResponse.body as PaymentLinkResponse;
        expect(paymentLink.paymentLinkEvents).toBeDefined();
        expect(paymentLink.paymentLinkEvents![1].type).toBe("CANCELLED");
      });
    });

    describe("with invalid payment link id", () => {
      test("shouldReturn404WhenPaymentLinkIdDoesNotExist", async () => {
        const response = await client.paymentLinks.cancelPaymentLinkById(config.merchantId, UNKNOWN_PAYMENT_LINK_ID);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });

      test("shouldReturn400WhenPaymentLinkIdFormatIsInvalid", async () => {
        const response = await client.paymentLinks.cancelPaymentLinkById(config.merchantId, INVALID_PAYMENT_LINK_ID);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("after previous cancel", () => {
      test("shouldReturn409WhenCancellingAlreadyCancelledPaymentLink", async () => {
        const createResponse = await client.paymentLinks.createPaymentLink(config.merchantId, new CreatePaymentLinkRequestBuilder().build(), {});
        const paymentLinkId = (createResponse.body as PaymentLinkResponse).paymentLinkId!;

        await client.paymentLinks.cancelPaymentLinkById(config.merchantId, paymentLinkId);

        const response = await client.paymentLinks.cancelPaymentLinkById(config.merchantId, paymentLinkId);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(409);
      });
    });
  });
});

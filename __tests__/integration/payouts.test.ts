import { randomUUID } from "crypto";
import client, { config } from "./init";
import { PaymentContext } from "../../src";
import { ErrorResponse, PayoutErrorResponse, PayoutResponse } from "../../src/generated/model/domain/index.js";
import { CreatePayoutRequestBuilder } from "./builders/payouts/CreatePayoutRequestBuilder";

const NON_EXISTING_PAYOUT_ID = "9999999999_0";

describe("Payouts", () => {
  describe("createPayout", () => {
    describe("with valid card input", () => {
      test("shouldReturnCreatedPayoutWhenInputIsValid", async () => {
        const request = new CreatePayoutRequestBuilder().build();
        const response = await client.payouts.createPayout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);

        const body = response.body as PayoutResponse;
        expect(body.id).toBeTruthy();
        expect(body.status).toBeDefined();
        expect(body.payoutOutput).toBeDefined();
        expect(body.payoutOutput?.amountOfMoney).toBeDefined();
        expect(body.payoutOutput?.amountOfMoney?.amount).toBe(request.amountOfMoney?.amount);
        expect(body.payoutOutput?.amountOfMoney?.currencyCode).toBe(request.amountOfMoney?.currencyCode);
      });

      test("shouldReturnCreatedPayoutWhenCallContextIsProvided", async () => {
        const request = new CreatePayoutRequestBuilder().build();
        const callContext: PaymentContext = { idempotence: { key: `test-payout-${randomUUID()}` } };
        const response = await client.payouts.createPayout(config.merchantId, request, callContext);

        expect(response.isSuccess).toBe(true);

        const body = response.body as PayoutResponse;
        expect(body.id).toBeTruthy();
        expect(body.status).toBeDefined();
        expect(body.payoutOutput).toBeDefined();
        expect(body.payoutOutput?.amountOfMoney).toBeDefined();
        expect(body.payoutOutput?.amountOfMoney?.amount).toBe(request.amountOfMoney?.amount);
        expect(body.payoutOutput?.amountOfMoney?.currencyCode).toBe(request.amountOfMoney?.currencyCode);
      });
    });

    describe("with invalid amount", () => {
      test("shouldReturn400WhenAmountIsInvalid", async () => {
        const response = await client.payouts.createPayout(
          config.merchantId,
          new CreatePayoutRequestBuilder()
            .withAmount(-1000)
            .withCurrencyCode("EUR")
            .build()
        );

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);

        const body = response.body as PayoutErrorResponse;
        expect(body.errorId).toBeDefined();
        expect(body.errors).toBeDefined();
        expect(body.errors!.length).toBeGreaterThan(0);
        expect(body.errors![0].id).toBe("INVALID_VALUE");
        expect(body.errors![0].httpStatusCode).toBe(400);
      });
    });

    describe("with invalid currency code", () => {
      test("shouldReturn400WhenCurrencyCodeIsInvalid", async () => {
        const response = await client.payouts.createPayout(
          config.merchantId,
          new CreatePayoutRequestBuilder()
            .withAmount(1000)
            .withCurrencyCode("INVALID")
            .build()
        );

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);

        const body = response.body as PayoutErrorResponse;
        expect(body.errorId).toBeDefined();
        expect(body.errors).toBeDefined();
        expect(body.errors!.length).toBeGreaterThan(0);
        expect(body.errors![0].id).toBe("INVALID_VALUE");
        expect(body.errors![0].httpStatusCode).toBe(400);
      });
    });

    describe("with invalid card number", () => {
      test("shouldReturn400WhenCardNumberIsInvalid", async () => {
        const response = await client.payouts.createPayout(config.merchantId, new CreatePayoutRequestBuilder().withCardNumber("123").build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);

        const body = response.body as PayoutErrorResponse;
        expect(body.errorId).toBeDefined();
        expect(body.errors).toBeDefined();
        expect(body.errors!.length).toBeGreaterThan(0);
        expect(body.errors![0].id).toBe("INVALID_VALUE");
        expect(body.errors![0].httpStatusCode).toBe(400);
      });
    });
  });

  describe("getPayout", () => {
    describe("with existing payout id", () => {
      let payoutId: string;
      beforeAll(async () => {
        const r = await client.payouts.createPayout(config.merchantId, new CreatePayoutRequestBuilder().build());
        payoutId = (r.body as PayoutResponse).id!;
      });

      test("shouldReturnPayoutWhenPayoutIdIsValid", async () => {
        const response = await client.payouts.getPayout(config.merchantId, payoutId, {});

        expect(response.isSuccess).toBe(true);

        const body = response.body as PayoutResponse;
        expect(body.id).toBeTruthy();
        expect(body.id).toBe(payoutId);
        expect(body.status).toBeTruthy();
        expect(body.status).toBe("ACCOUNT_CREDITED");
        expect(body.payoutOutput).toBeDefined();
        expect(body.statusOutput).toBeDefined();
        expect(body.statusOutput?.statusCategory).toBe("REFUNDED");
        expect(body.statusOutput?.statusCode).toBe(8);
      });
    });

    describe("with invalid payout id", () => {
      test("shouldReturn404WhenPayoutIdDoesNotExist", async () => {
        const response = await client.payouts.getPayout(config.merchantId, NON_EXISTING_PAYOUT_ID);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);

        const body = response.body as ErrorResponse;
        expect(body.errorId).toBeDefined();
        expect(body.errors).toBeDefined();
        expect(body.errors!.length).toBeGreaterThan(0);
      });
    });
  });
});

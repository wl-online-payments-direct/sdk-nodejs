import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { CalculateSurchargeResponse, CurrencyConversionResponse, GetIINDetailsResponse, TestConnection } from "../../src/generated/model/domain/index.js";
import { GetIINDetailsRequestBuilder } from "./builders/services/GetIINDetailsRequestBuilder";
import { CalculateSurchargeRequestBuilder } from "./builders/services/CalculateSurchargeRequestBuilder";
import { CurrencyConversionRequestBuilder } from "./builders/services/CurrencyConversionRequestBuilder";

const INVALID_BIN = "123";

describe("Services", () => {
  describe("testConnection", () => {
    describe("with valid request", () => {
      test("shouldReturnTestConnectionWhenRequestIsValid", async () => {
        const response = await client.services.testConnection(config.merchantId);

        expect(response.isSuccess).toBe(true);
        expect(response.body).toBeDefined();

        const body = response.body as TestConnection;
        expect(body.result).toBeDefined();
      });

      test("shouldReturnTestConnectionWhenCallContextIsProvided", async () => {
        const response = await client.services.testConnection(config.merchantId, { idempotence: { key: `test-services-${uuidv4()}` } });

        expect(response.isSuccess).toBe(true);
        expect(response.body).toBeDefined();

        const body = response.body as TestConnection;
        expect(body.result).toBeDefined();
      });
    });
  });

  describe("getIINDetails", () => {
    describe("with valid card number", () => {
      test("shouldReturnIINDetailsWhenCardNumberIsValid", async () => {
        const response = await client.services.getIINDetails(config.merchantId, new GetIINDetailsRequestBuilder().build());

        expect(response.isSuccess).toBe(true);
        expect(response.body).toBeDefined();

        const body = response.body as GetIINDetailsResponse;
        expect(body.cardType).toBeDefined();
        expect(body.paymentProductId).toBeDefined();
        expect(body.cardScheme).toBeDefined();
      });
    });

    describe("with invalid card number", () => {
      test("shouldReturn400WhenCardNumberIsInvalid", async () => {
        const response = await client.services.getIINDetails(config.merchantId, new GetIINDetailsRequestBuilder().withBin(INVALID_BIN).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });
  });

  describe("getDccRateInquiry", () => {
    describe.skip("with valid request", () => {
      test.skip("shouldReturnCurrencyConversionResponseWhenRequestIsValid - Test is skipped because the Currency Conversion feature is not enabled for the test merchant", async () => {
        const response = await client.services.getDccRateInquiry(config.merchantId, new CurrencyConversionRequestBuilder().withCardNumber("4012000033330026").build());

        expect(response.isSuccess).toBe(true);
        expect(response.body).toBeDefined();

        const body = response.body as CurrencyConversionResponse;
        expect(body.result).toBeDefined();
      });
    });

    describe("with missing card source and transaction", () => {
      test("shouldReturn400WhenCardSourceAndTransactionAreMissing", async () => {
        const response = await client.services.getDccRateInquiry(config.merchantId, new CurrencyConversionRequestBuilder().build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with invalid amount", () => {
      test("shouldReturn400WhenAmountIsInvalid", async () => {
        const response = await client.services.getDccRateInquiry(config.merchantId, new CurrencyConversionRequestBuilder().withAmount(-1000).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });
  });

  describe("surchargeCalculation", () => {
    describe("with valid request", () => {
      test.skip("shouldReturnSurchargeCalculationResponseWhenRequestIsValid - Test is skipped because the Surcharge Calculation feature is not enabled for the test merchant", async () => {
        const response = await client.services.surchargeCalculation(config.merchantId, new CalculateSurchargeRequestBuilder().withCardNumber("5425233430109903").build());

        expect(response.isSuccess).toBe(true);
        expect(response.body).toBeDefined();

        const body = response.body as CalculateSurchargeResponse;
        expect(body.surcharges).toBeDefined();
      });
    });

    describe("with missing card source", () => {
      test("shouldReturn400WhenCardSourceIsMissing", async () => {
        const response = await client.services.surchargeCalculation(config.merchantId, new CalculateSurchargeRequestBuilder().build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with invalid amount", () => {
      test("shouldReturn400WhenAmountIsInvalid", async () => {
        const response = await client.services.surchargeCalculation(config.merchantId, new CalculateSurchargeRequestBuilder().withAmount(-1000).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });
  });
});

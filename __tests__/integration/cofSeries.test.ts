import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { CreatedTokenResponse, CreatePaymentResponse, ImportCofSeriesResponse } from "../../src/generated/model/domain/index.js";
import { ImportCofSeriesRequestBuilder } from "./builders/cofSeries/ImportCofSeriesRequestBuilder";
import { CreateTokenRequestBuilder } from "./builders/common/CreateTokenRequestBuilder";
import { CreatePaymentRequestBuilder } from "./builders/common/CreatePaymentRequestBuilder";

describe("CofSeries", () => {
  describe("importCofSeries", () => {
    describe("with valid input", () => {
      test.skip("shouldReturnImportCofSeriesResponse - Test is skipped because the Import COF Series feature is not enabled for the test merchant", async () => {
        const response = await client.cofSeries.importCofSeries(config.merchantId, new ImportCofSeriesRequestBuilder().build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as ImportCofSeriesResponse;
        expect(body.paymentId).toBeDefined();
      });

      test.skip("shouldReturnImportCofSeriesResponseWithCallContext - Test is skipped because the Import COF Series feature is not enabled for the test merchant", async () => {
        const response = await client.cofSeries.importCofSeries(config.merchantId, new ImportCofSeriesRequestBuilder().build(), {
          idempotence: { key: `test-cof-series-${uuidv4()}` }
        });

        expect(response.isSuccess).toBe(true);

        const body = response.body as ImportCofSeriesResponse;
        expect(body.paymentId).toBeDefined();
      });
    });

    describe("with valid token id", () => {
      let tokenId: string;

      beforeAll(async () => {
        const createResponse = await client.tokens.createToken(config.merchantId, new CreateTokenRequestBuilder().build());
        tokenId = (createResponse.body as CreatedTokenResponse).token!;
      });

      test.skip("shouldReturnImportCofSeriesResponse - Test is skipped because the Import COF Series feature is not enabled for the test merchant", async () => {
        const response = await client.cofSeries.importCofSeries(config.merchantId, new ImportCofSeriesRequestBuilder().withTokenId(tokenId).build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as ImportCofSeriesResponse;
        expect(body.paymentId).toBeDefined();
      });
    });

    describe("with invalid input", () => {
      test("shouldThrowValidationException", () => {
        const request = new ImportCofSeriesRequestBuilder().withSchemeReferenceData(null).build();

        expect(() => client.cofSeries.importCofSeries(config.merchantId, request)).toThrow();
      });
    });

    describe("with valid transactionLinkIdentifier", () => {
      let paymentId: string;

      beforeAll(async () => {
        const response = await client.payments.createPayment(config.merchantId, new CreatePaymentRequestBuilder().build());
        paymentId = (response.body as CreatePaymentResponse).payment!.id!;
      });

      test.skip("shouldReturnImportCofSeriesResponseWithTransactionLinkIdentifier - Test is skipped because the Import COF Series feature is not enabled for the test merchant", async () => {
        const request = new ImportCofSeriesRequestBuilder().withTransactionLinkIdentifier(paymentId).build();
        const response = await client.cofSeries.importCofSeries(config.merchantId, request);

        expect(response.isSuccess).toBe(true);

        const body = response.body as ImportCofSeriesResponse;
        expect(body.paymentId).toBeDefined();
      });
    });
  });
});

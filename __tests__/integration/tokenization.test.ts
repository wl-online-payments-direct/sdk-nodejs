import client, { config } from "./init";
import { newTokenizationClient } from "../../src/generated/tokenization/index.js";
import { CreateCertificateResponse, CreatedTokenResponse, DetokenizationResponse } from "../../src/generated/model/domain/index.js";
import { CsrRequestBuilder } from "./builders/tokenization/CsrRequestBuilder";
import { GetCardDataByTokensParamsBuilder } from "./builders/tokenization/GetCardDataByTokensParamsBuilder";
import { GetCardDataByPaymentsParamsBuilder } from "./builders/tokenization/GetCardDataByPaymentsParamsBuilder";
import { CreateTokenRequestBuilder } from "./builders/common/CreateTokenRequestBuilder";

const tokenizationClient = newTokenizationClient(client.context);

const INVALID_TOKEN_ID = "non-existent-token-xyz";
const INVALID_PAYMENT_ID = "non-existent-payment";

describe("Tokenization", () => {
  describe("createCertificate", () => {
    describe("with valid input", () => {
      test.skip("shouldReturnCertificateResponse - Test is skipped because the Tokenization endpoint features are not enabled for the test merchant", async () => {
        const response = await tokenizationClient.createCertificate(config.merchantId, new CsrRequestBuilder().build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as CreateCertificateResponse;
        expect(body.certificateId).toBeDefined();
        expect(body.signedCertificate).toBeDefined();
      });

      test.skip("shouldReturnCertificateResponseWithCallContext - Test is skipped because the Tokenization endpoint features are not enabled for the test merchant", async () => {
        const response = await tokenizationClient.createCertificate(config.merchantId, new CsrRequestBuilder().build(), {});

        expect(response.isSuccess).toBe(true);

        const body = response.body as CreateCertificateResponse;
        expect(body.certificateId).toBeDefined();
        expect(body.signedCertificate).toBeDefined();
      });
    });

    describe("with invalid input", () => {
      test.skip("shouldThrowValidationException - Test is skipped because the Tokenization endpoint features are not enabled for the test merchant", async () => {
        await expect(tokenizationClient.createCertificate(config.merchantId, new CsrRequestBuilder().withCsr(null).build())).rejects.toThrow();
      });
    });
  });

  describe("getCardDataByTokens", () => {
    describe("with valid tokens", () => {
      let tokenId: string;

      beforeAll(async () => {
        const createResponse = await client.tokens.createToken(config.merchantId, new CreateTokenRequestBuilder().build());
        tokenId = (createResponse.body as CreatedTokenResponse).token!;
      });

      test.skip("shouldReturnDetokenizedCardData - Test is skipped because the Tokenization endpoint features are not enabled for the test merchant", async () => {
        const response = await tokenizationClient.getCardDataByTokens(config.merchantId, new GetCardDataByTokensParamsBuilder().withTokens([tokenId]).build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as DetokenizationResponse;
        expect(body.tokens).toBeDefined();
      });
    });

    describe("with non-existent tokens", () => {
      test.skip("shouldThrowReferenceException - Test is skipped because the Tokenization endpoint features are not enabled for the test merchant", async () => {
        const response = await tokenizationClient.getCardDataByTokens(config.merchantId, new GetCardDataByTokensParamsBuilder().withTokens([INVALID_TOKEN_ID]).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });

    describe("with invalid tokens", () => {
      test.skip("shouldThrowValidationException - Test is skipped because the Tokenization endpoint features are not enabled for the test merchant", async () => {
        const response = await tokenizationClient.getCardDataByTokens(config.merchantId, new GetCardDataByTokensParamsBuilder().withTokens(null).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });
  });

  describe("getCardDataByPayments", () => {
    describe("with valid payment IDs", () => {
      test.skip("shouldReturnDetokenizedCardData - Test is skipped because the Tokenization endpoint features are not enabled for the test merchant", async () => {
        const response = await tokenizationClient.getCardDataByPayments(config.merchantId, new GetCardDataByPaymentsParamsBuilder().withPayments(["valid_payment_id"]).build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as DetokenizationResponse;
        expect(body.tokens).toBeDefined();
      });
    });

    describe("with non-existent payment IDs", () => {
      test.skip("shouldThrowReferenceException - Test is skipped because the Tokenization endpoint features are not enabled for the test merchant", async () => {
        const response = await tokenizationClient.getCardDataByPayments(config.merchantId, new GetCardDataByPaymentsParamsBuilder().withPayments([INVALID_PAYMENT_ID]).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });

    describe("with invalid payment IDs", () => {
      test.skip("shouldThrowValidationException - Test is skipped because the Tokenization endpoint features are not enabled for the test merchant", async () => {
        const response = await tokenizationClient.getCardDataByPayments(config.merchantId, new GetCardDataByPaymentsParamsBuilder().withPayments(null).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });
  });
});

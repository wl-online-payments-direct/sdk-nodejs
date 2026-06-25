import client, { config } from "./init";
import { PaymentContext } from "../../src";
import { CreateHostedTokenizationResponse, GetHostedTokenizationResponse } from "../../src/generated/model/domain/index.js";
import { CreateHostedTokenizationRequestBuilder } from "./builders/hostedTokenization/CreateHostedTokenizationRequestBuilder";

const INVALID_TOKENIZATION_ID = "invalid_id_12345";

describe("Hosted tokenization", () => {
  describe("createHostedTokenization", () => {
    describe("with valid input", () => {
      test("shouldReturnHostedTokenizationIdAndUrl", async () => {
        const response = await client.hostedTokenization.createHostedTokenization(config.merchantId, new CreateHostedTokenizationRequestBuilder().build());
        expect(response.isSuccess).toBe(true);

        const body = response.body as CreateHostedTokenizationResponse;
        expect(body.hostedTokenizationId).toBeDefined();
        expect(body.hostedTokenizationUrl).toBeDefined();
      });

      test("shouldReturnHostedTokenizationIdAndUrlWithCallContext", async () => {
        const callContext: PaymentContext = {};
        const response = await client.hostedTokenization.createHostedTokenization(config.merchantId, new CreateHostedTokenizationRequestBuilder().build(), callContext);

        expect(response.isSuccess).toBe(true);

        const body = response.body as CreateHostedTokenizationResponse;
        expect(body.hostedTokenizationId).toBeDefined();
        expect(body.hostedTokenizationUrl).toBeDefined();
      });
    });

    describe("with invalid locale", () => {
      test("shouldReturnErrorResponseForInvalidLocale", async () => {
        const request = new CreateHostedTokenizationRequestBuilder().withLocale("invalid_locale").build();
        const response = await client.hostedTokenization.createHostedTokenization(config.merchantId, request);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with tokens", () => {
      describe("with single invalid token", () => {
        test("shouldReturnSessionWithSingleInvalidToken", async () => {
          const request = new CreateHostedTokenizationRequestBuilder().withToken("firstInvalidToken").build();
          const response = await client.hostedTokenization.createHostedTokenization(config.merchantId, request);

          expect(response.isSuccess).toBe(true);
          const body = response.body as CreateHostedTokenizationResponse;
          expect(body.hostedTokenizationId).toBeDefined();
          expect(body.hostedTokenizationUrl).toBeDefined();
          expect(body.invalidTokens).toBeDefined();
          expect(body.invalidTokens).toHaveLength(1);
          expect(body.invalidTokens).toContain("firstInvalidToken");
        });
      });

      describe("with multiple invalid tokens", () => {
        test("shouldReturnSessionWithMultipleInvalidTokens", async () => {
          const request = new CreateHostedTokenizationRequestBuilder().withTokens("firstInvalidToken", "secondInvalidToken").build();
          const response = await client.hostedTokenization.createHostedTokenization(config.merchantId, request);

          expect(response.isSuccess).toBe(true);
          const body = response.body as CreateHostedTokenizationResponse;
          expect(body.hostedTokenizationId).toBeDefined();
          expect(body.hostedTokenizationUrl).toBeDefined();
          expect(body.invalidTokens).toBeDefined();
          expect(body.invalidTokens).toHaveLength(2);
          expect(body.invalidTokens).toContain("firstInvalidToken");
          expect(body.invalidTokens).toContain("secondInvalidToken");
        });
      });

      describe("with chained tokens", () => {
        test("shouldSupportChainedTokenAddition", async () => {
          const request = new CreateHostedTokenizationRequestBuilder()
            .withToken("firstChainedToken")
            .withToken("secondChainedToken")
            .withToken("thirdChainedToken")
            .build();

          const response = await client.hostedTokenization.createHostedTokenization(config.merchantId, request);

          expect(response.isSuccess).toBe(true);
          const body = response.body as CreateHostedTokenizationResponse;
          expect(body.hostedTokenizationId).toBeDefined();
          expect(body.hostedTokenizationUrl).toBeDefined();
          expect(body.invalidTokens).toBeDefined();
          expect(body.invalidTokens).toHaveLength(3);
          expect(body.invalidTokens).toContain("firstChainedToken");
          expect(body.invalidTokens).toContain("secondChainedToken");
          expect(body.invalidTokens).toContain("thirdChainedToken");
        });
      });

      describe("with empty token list", () => {
        test("shouldHandleEmptyTokenList", async () => {
          const request = new CreateHostedTokenizationRequestBuilder().withTokens().build();
          const response = await client.hostedTokenization.createHostedTokenization(config.merchantId, request);

          expect(response.isSuccess).toBe(true);
          const body = response.body as CreateHostedTokenizationResponse;
          expect(body.hostedTokenizationId).toBeDefined();
          expect(body.hostedTokenizationUrl).toBeDefined();
          expect(body.invalidTokens).toHaveLength(0);
        });
      });

      describe("with tokens containing special characters", () => {
        test("shouldHandleTokensWithSpecialCharacters", async () => {
          const request = new CreateHostedTokenizationRequestBuilder().withTokens("token-with-dashes", "token_with_underscores", "token.with.dots").build();

          const response = await client.hostedTokenization.createHostedTokenization(config.merchantId, request);

          expect(response.isSuccess).toBe(true);
          const body = response.body as CreateHostedTokenizationResponse;
          expect(body.hostedTokenizationId).toBeDefined();
          expect(body.hostedTokenizationUrl).toBeDefined();
          expect(body.invalidTokens).toBeDefined();
          expect(body.invalidTokens).toHaveLength(3);
        });
      });

      describe("with large number of tokens", () => {
        test("shouldHandleTenInvalidTokens", async () => {
          const request = new CreateHostedTokenizationRequestBuilder()
            .withTokens("firstToken", "secondToken", "thirdToken", "fourthToken", "fifthToken", "sixthToken", "seventhToken", "eighthToken", "ninthToken", "tenthToken")
            .build();

          const response = await client.hostedTokenization.createHostedTokenization(config.merchantId, request);

          expect(response.isSuccess).toBe(true);
          const body = response.body as CreateHostedTokenizationResponse;
          expect(body.hostedTokenizationId).toBeDefined();
          expect(body.hostedTokenizationUrl).toBeDefined();
          expect(body.invalidTokens).toBeDefined();
          expect(body.invalidTokens).toHaveLength(10);
        });
      });

      describe("with duplicate tokens", () => {
        test("shouldHandleDuplicateTokens", async () => {
          const request = new CreateHostedTokenizationRequestBuilder().withTokens("duplicateToken", "duplicateToken", "uniqueToken").build();

          const response = await client.hostedTokenization.createHostedTokenization(config.merchantId, request);

          expect(response.isSuccess).toBe(true);
          const body = response.body as CreateHostedTokenizationResponse;
          expect(body.hostedTokenizationId).toBeDefined();
          expect(body.hostedTokenizationUrl).toBeDefined();
          expect(body.invalidTokens).toBeDefined();
          expect(body.invalidTokens).not.toHaveLength(0);
        });
      });
    });
  });

  describe("getHostedTokenization", () => {
    describe("with valid hosted tokenization id", () => {
      let hostedTokenizationId: string;

      beforeAll(async () => {
        const createResponse = await client.hostedTokenization.createHostedTokenization(config.merchantId, new CreateHostedTokenizationRequestBuilder().build());
        hostedTokenizationId = (createResponse.body as CreateHostedTokenizationResponse).hostedTokenizationId!;
      });

      test("shouldReturnHostedTokenizationWhenHostedTokenizationIdIsValid", async () => {
        const response = await client.hostedTokenization.getHostedTokenization(config.merchantId, hostedTokenizationId);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetHostedTokenizationResponse;
        expect(body).toBeDefined();
      });
    });

    describe("with invalid hosted tokenization id", () => {
      test("shouldThrowReferenceException", async () => {
        const response = await client.hostedTokenization.getHostedTokenization(config.merchantId, INVALID_TOKENIZATION_ID);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });
  });
});

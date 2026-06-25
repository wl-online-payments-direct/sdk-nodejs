import client, { config } from "./init";
import { PaymentContext } from "../../src";
import { CreatedTokenResponse, TokenResponse } from "../../src/generated/model/domain/index.js";
import { CreateTokenRequestBuilder } from "./builders/common/CreateTokenRequestBuilder";

const INVALID_TOKEN_ID = "invalid_token_12345";
const EXPECTED_CARDHOLDER_NAME = "John Doe";
const EXPECTED_EXPIRY_DATE = "1230";

describe("Tokens", () => {
  describe("createToken", () => {
    describe("with valid input", () => {
      test("shouldReturnCreatedTokenWhenInputIsValid", async () => {
        const response = await client.tokens.createToken(config.merchantId, new CreateTokenRequestBuilder().build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as CreatedTokenResponse;
        expect(body.token).toBeDefined();
        expect(body.isNewToken).toBeDefined();
        expect(body.card).toBeDefined();
        expect(body.card!.cardholderName).toBe(EXPECTED_CARDHOLDER_NAME);
        expect(body.card!.expiryDate).toBe(EXPECTED_EXPIRY_DATE);
        expect(body.card!.cardNumber).toBeDefined();
      });

      test("shouldReturnCreatedTokenWhenCallContextIsProvided", async () => {
        const callContext: PaymentContext = {};
        const response = await client.tokens.createToken(config.merchantId, new CreateTokenRequestBuilder().build(), callContext);

        expect(response.isSuccess).toBe(true);

        const body = response.body as CreatedTokenResponse;
        expect(body.token).toBeDefined();
        expect(body.isNewToken).toBeDefined();
        expect(body.card).toBeDefined();
        expect(body.card!.cardholderName).toBe(EXPECTED_CARDHOLDER_NAME);
        expect(body.card!.expiryDate).toBe(EXPECTED_EXPIRY_DATE);
        expect(body.card!.cardNumber).toBeDefined();
      });
    });

    describe("with invalid card number", () => {
      test("shouldThrowValidationException", async () => {
        const response = await client.tokens.createToken(config.merchantId, new CreateTokenRequestBuilder().withCardNumber("1234567890123456").build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with invalid expiry date", () => {
      test("shouldThrowValidationException", async () => {
        const response = await client.tokens.createToken(config.merchantId, new CreateTokenRequestBuilder().withExpiryDate("0000").build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with invalid cvv", () => {
      test("shouldThrowValidationException", async () => {
        const response = await client.tokens.createToken(config.merchantId, new CreateTokenRequestBuilder().withCvv("12345678").build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });
  });

  describe("getToken", () => {
    describe("with valid token id", () => {
      let tokenId: string;

      beforeAll(async () => {
        const createResponse = await client.tokens.createToken(config.merchantId, new CreateTokenRequestBuilder().build());
        tokenId = (createResponse.body as CreatedTokenResponse).token!;
      });

      test("shouldReturnTokenWhenTokenIdIsValid", async () => {
        const response = await client.tokens.getToken(config.merchantId, tokenId);

        expect(response.isSuccess).toBe(true);

        const body = response.body as TokenResponse;
        expect(body.id).toBeDefined();
        expect(body.id).toBe(tokenId);
        expect(body.paymentProductId).toBeDefined();
        expect(body.card).toBeDefined();
        expect(body.card!.data).toBeDefined();
        expect(body.card!.data!.cardWithoutCvv).toBeDefined();
        expect(body.card!.data!.cardWithoutCvv!.cardNumber).toBeDefined();
      });
    });

    describe("with invalid token id", () => {
      test("shouldThrowReferenceException", async () => {
        const response = await client.tokens.getToken(config.merchantId, INVALID_TOKEN_ID);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });
  });

  describe("deleteToken", () => {
    describe("with valid token id", () => {
      test("shouldDeleteToken", async () => {
        const createResponse = await client.tokens.createToken(config.merchantId, new CreateTokenRequestBuilder().build());
        const tokenId = (createResponse.body as CreatedTokenResponse).token!;

        await client.tokens.deleteToken(config.merchantId, tokenId);

        const getResponse = await client.tokens.getToken(config.merchantId, tokenId);
        expect(getResponse.isSuccess).toBe(false);
      });
    });

    describe("with invalid token id", () => {
      test("shouldThrowReferenceException", async () => {
        const response = await client.tokens.deleteToken(config.merchantId, INVALID_TOKEN_ID);

        expect(response.isSuccess).toBe(false);
      });
    });
  });
});

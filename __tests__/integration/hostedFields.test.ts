import client, { config } from "./init";
import { PaymentContext } from "../../src";
import { CreateHostedFieldsSessionResponse, CreatedTokenResponse, GetHostedFieldsSessionResponse } from "../../src/generated/model/domain/index.js";
import { CreateHostedFieldsSessionRequestBuilder } from "./builders/hostedFields/CreateHostedFieldsSessionRequestBuilder";
import { CreateTokenRequestBuilder } from "./builders/common/CreateTokenRequestBuilder";

describe("Hosted fields", () => {
  describe("createHostedFieldsSession", () => {
    describe("with valid input", () => {
      test("shouldReturnSessionDataWithSessionId", async () => {
        const request = new CreateHostedFieldsSessionRequestBuilder().build();
        const response = await client.hostedFields.createHostedFieldsSession(config.merchantId, request);

        expect(response.isSuccess).toBe(true);

        const body = response.body as CreateHostedFieldsSessionResponse;
        expect(body.sessionData).toBeDefined();
        expect(body.sessionData!.hostedFieldsSessionId).toBeDefined();
        expect(body.sdkUrl).toBeDefined();
        expect(body.sdkSri).toBeDefined();
      });

      test("shouldReturnSessionDataWithSessionIdAndCallContext", async () => {
        const callContext: PaymentContext = {};
        const request = new CreateHostedFieldsSessionRequestBuilder().build();
        const response = await client.hostedFields.createHostedFieldsSession(config.merchantId, request, callContext);

        expect(response.isSuccess).toBe(true);

        const body = response.body as CreateHostedFieldsSessionResponse;
        expect(body.sessionData).toBeDefined();
        expect(body.sessionData!.hostedFieldsSessionId).toBeDefined();
        expect(body.sdkUrl).toBeDefined();
        expect(body.sdkSri).toBeDefined();
      });
    });

    describe("with missing locale", () => {
      test("shouldThrowValidationException", () => {
        const request = new CreateHostedFieldsSessionRequestBuilder().withLocale(null).build();

        expect(() => client.hostedFields.createHostedFieldsSession(config.merchantId, request)).toThrow("is not of a type(s) string");
      });
    });

    describe("with empty locale", () => {
      test("shouldReturn400WhenLocaleIsEmpty", async () => {
        const request = new CreateHostedFieldsSessionRequestBuilder().withLocale("").build();
        const response = await client.hostedFields.createHostedFieldsSession(config.merchantId, request);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with invalid locale format", () => {
      test("shouldThrowApiException", async () => {
        const request = new CreateHostedFieldsSessionRequestBuilder().withLocale("invalid-locale").build();
        const response = await client.hostedFields.createHostedFieldsSession(config.merchantId, request);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(422);
      });
    });

    describe("with tokens", () => {
      let tokenId: string;

      beforeAll(async () => {
        const response = await client.tokens.createToken(config.merchantId, new CreateTokenRequestBuilder().build());
        tokenId = (response.body as CreatedTokenResponse).token!;
      });

      test("shouldReturnSessionDataWithTokens", async () => {
        const request = new CreateHostedFieldsSessionRequestBuilder().withTokens([tokenId]).build();
        const response = await client.hostedFields.createHostedFieldsSession(config.merchantId, request);

        expect(response.isSuccess).toBe(true);

        const body = response.body as CreateHostedFieldsSessionResponse;
        expect(body.sessionData).toBeDefined();
        expect(body.sessionData!.hostedFieldsSessionId).toBeDefined();
      });
    });
  });

  describe("getHostedFieldsSession", () => {
    describe("with valid session id", () => {
      test("shouldReturnSessionWithSessionId", async () => {
        const createResponse = await client.hostedFields.createHostedFieldsSession(config.merchantId, new CreateHostedFieldsSessionRequestBuilder().build());
        const sessionId = (createResponse.body as CreateHostedFieldsSessionResponse).sessionData!.hostedFieldsSessionId!;

        const response = await client.hostedFields.getHostedFieldsSession(config.merchantId, sessionId);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetHostedFieldsSessionResponse;
        expect(body.sessionId).toBeDefined();
      });
    });

    describe("with invalid session id", () => {
      test("shouldReturn404WhenSessionIdIsInvalid", async () => {
        const response = await client.hostedFields.getHostedFieldsSession(config.merchantId, "invalid-session-id");

        expect(response.isSuccess).toBe(false);
      });
    });
  });
});

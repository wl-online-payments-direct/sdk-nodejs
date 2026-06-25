import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { SessionRequestBuilder } from "./builders/sessions/SessionRequestBuilder";
import { CreateTokenRequestBuilder } from "./builders/common/CreateTokenRequestBuilder";
import { CreatedTokenResponse, SessionResponse } from "../../src/generated/model/domain/index.js";

describe("Sessions", () => {
  describe("createSession", () => {
    describe("with valid input", () => {
      test("shouldReturnClientSessionIdWhenRequestIsValid", async () => {
        const response = await client.sessions.createSession(config.merchantId, new SessionRequestBuilder().build());

        expect(response.isSuccess).toBe(true);
        expect(response.body).toBeDefined();

        const body = response.body as SessionResponse;
        expect(body.clientSessionId).toBeTruthy();
        expect(body.assetUrl).toBeTruthy();
        expect(body.clientApiUrl).toBeTruthy();
      });

      test("shouldReturnClientSessionIdWhenCallContextIsProvided", async () => {
        const response = await client.sessions.createSession(config.merchantId, new SessionRequestBuilder().build(), {
          idempotence: { key: uuidv4() }
        });

        expect(response.isSuccess).toBe(true);
        expect(response.body).toBeDefined();

        const body = response.body as SessionResponse;
        expect(body.clientSessionId).toBeTruthy();
        expect(body.assetUrl).toBeTruthy();
        expect(body.clientApiUrl).toBeTruthy();
      });
    });

    describe("with valid token", () => {
      let tokenId: string;
      beforeAll(async () => {
        const response = await client.tokens.createToken(config.merchantId, new CreateTokenRequestBuilder().build());
        tokenId = (response.body as CreatedTokenResponse).token!;
      });

      test("shouldReturnSessionWithValidTokenWhenTokenIsValid", async () => {
        const response = await client.sessions.createSession(config.merchantId, new SessionRequestBuilder().withToken(tokenId).build());

        expect(response.isSuccess).toBe(true);
        expect(response.body).toBeDefined();

        const body = response.body as SessionResponse;
        expect(body.clientSessionId).toBeTruthy();
        expect(body.invalidTokens).not.toContain(tokenId);
      });
    });

    describe("with too many tokens", () => {
      test("shouldReturn400WhenTooManyTokensAreProvided", async () => {
        const tokens = Array.from({ length: 11 }, (_, i) => `token-${i}`);
        const response = await client.sessions.createSession(config.merchantId, new SessionRequestBuilder().withTokens(tokens).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with invalid token values", () => {
      test("shouldReturnSessionWithInvalidTokensWhenTokensAreInvalid", async () => {
        const response = await client.sessions.createSession(config.merchantId, new SessionRequestBuilder().withTokens(["65468465464646", "654646464", "easgudasdas"]).build());

        expect(response.isSuccess).toBe(true);
        expect(response.body).toBeDefined();

        const body = response.body as SessionResponse;
        expect(body.clientSessionId).toBeTruthy();
        expect(body.invalidTokens).toBeDefined();
        expect(body.invalidTokens!.length).toBeGreaterThan(0);
      });
    });
  });
});

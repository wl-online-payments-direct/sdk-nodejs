import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { CreateMandateResponse, GetMandateResponse } from "../../src/generated/model/domain/index.js";
import { CreateMandateRequestBuilder } from "./builders/mandates/CreateMandateRequestBuilder";
import { RevokeMandateRequestBuilder } from "./builders/mandates/RevokeMandateRequestBuilder";
import { PaymentContext } from "../../src";

const INVALID_IBAN = "INVALID";
const INVALID_MANDATE_REFERENCE = "INVALID123456";

describe("Mandates", () => {
  describe("createMandate", () => {
    describe("with valid input", () => {
      test("shouldCreateMandateAndReturnUniqueMandateReference", async () => {
        const response = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as CreateMandateResponse;
        expect(body.mandate).toBeDefined();
        expect(body.mandate?.uniqueMandateReference).toBeDefined();
      });

      test("shouldCreateMandateWithCallContext", async () => {
        const callContext: PaymentContext = { idempotence: { key: `test-mandates-${uuidv4()}` } };
        const response = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build(), callContext);

        expect(response.isSuccess).toBe(true);

        const body = response.body as CreateMandateResponse;
        expect(body.mandate).toBeDefined();
        expect(body.mandate?.uniqueMandateReference).toBeDefined();
      });
    });

    describe("with invalid IBAN", () => {
      test("shouldThrowValidationException", async () => {
        const response = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().withCustomerIban(INVALID_IBAN).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });
  });

  describe("getMandate", () => {
    describe("with valid mandate reference", () => {
      test("shouldReturnMandateWhenMandateReferenceIsValid", async () => {
        const createResponse = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build());
        const uniqueMandateReference = (createResponse.body as CreateMandateResponse).mandate!.uniqueMandateReference!;

        const response = await client.mandates.getMandate(config.merchantId, uniqueMandateReference);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetMandateResponse;
        expect(body.mandate).toBeDefined();
        expect(body.mandate?.uniqueMandateReference).toBeDefined();
      });
    });

    describe("with invalid mandate reference", () => {
      test("shouldThrowReferenceException", async () => {
        const response = await client.mandates.getMandate(config.merchantId, INVALID_MANDATE_REFERENCE);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });
  });

  describe("blockMandate", () => {
    describe("with valid mandate reference", () => {
      test("shouldBlockMandateAndReturnUniqueMandateReference", async () => {
        const createResponse = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build());
        const uniqueMandateReference = (createResponse.body as CreateMandateResponse).mandate!.uniqueMandateReference!;

        const response = await client.mandates.blockMandate(config.merchantId, uniqueMandateReference);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetMandateResponse;
        expect(body.mandate).toBeDefined();
        expect(body.mandate?.uniqueMandateReference).toBeDefined();
      });
    });

    describe("with already blocked mandate", () => {
      test("shouldThrowValidationException", async () => {
        const createResponse = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build());
        const uniqueMandateReference = (createResponse.body as CreateMandateResponse).mandate!.uniqueMandateReference!;

        await client.mandates.blockMandate(config.merchantId, uniqueMandateReference);

        const response = await client.mandates.blockMandate(config.merchantId, uniqueMandateReference);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with revoked mandate", () => {
      test("shouldThrowValidationException", async () => {
        const createResponse = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build());
        const uniqueMandateReference = (createResponse.body as CreateMandateResponse).mandate!.uniqueMandateReference!;

        await client.mandates.revokeMandate(config.merchantId, uniqueMandateReference, new RevokeMandateRequestBuilder().build());

        const response = await client.mandates.blockMandate(config.merchantId, uniqueMandateReference);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with invalid mandate reference", () => {
      test("shouldThrowReferenceException", async () => {
        const response = await client.mandates.blockMandate(config.merchantId, INVALID_MANDATE_REFERENCE);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });
  });

  describe("unblockMandate", () => {
    describe("with blocked mandate", () => {
      test("shouldUnblockMandateAndReturnUniqueMandateReference", async () => {
        const createResponse = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build());
        const uniqueMandateReference = (createResponse.body as CreateMandateResponse).mandate!.uniqueMandateReference!;

        await client.mandates.blockMandate(config.merchantId, uniqueMandateReference);

        const response = await client.mandates.unblockMandate(config.merchantId, uniqueMandateReference);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetMandateResponse;
        expect(body.mandate).toBeDefined();
        expect(body.mandate?.uniqueMandateReference).toBeDefined();
      });
    });

    describe("with not blocked mandate", () => {
      test("shouldThrowValidationException", async () => {
        const createResponse = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build());
        const uniqueMandateReference = (createResponse.body as CreateMandateResponse).mandate!.uniqueMandateReference!;

        const response = await client.mandates.unblockMandate(config.merchantId, uniqueMandateReference);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with revoked mandate", () => {
      test("shouldThrowValidationException", async () => {
        const createResponse = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build());
        const uniqueMandateReference = (createResponse.body as CreateMandateResponse).mandate!.uniqueMandateReference!;

        await client.mandates.revokeMandate(config.merchantId, uniqueMandateReference, new RevokeMandateRequestBuilder().build());

        const response = await client.mandates.unblockMandate(config.merchantId, uniqueMandateReference);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with invalid mandate reference", () => {
      test("shouldThrowReferenceException", async () => {
        const response = await client.mandates.unblockMandate(config.merchantId, INVALID_MANDATE_REFERENCE);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });
  });

  describe("revokeMandate", () => {
    describe("with valid mandate", () => {
      test("shouldRevokeMandateAndReturnUniqueMandateReference", async () => {
        const createResponse = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build());
        const uniqueMandateReference = (createResponse.body as CreateMandateResponse).mandate!.uniqueMandateReference!;

        const response = await client.mandates.revokeMandate(config.merchantId, uniqueMandateReference, new RevokeMandateRequestBuilder().build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetMandateResponse;
        expect(body.mandate).toBeDefined();
        expect(body.mandate?.uniqueMandateReference).toBeDefined();
      });
    });

    describe("with blocked mandate", () => {
      test("shouldRevokeBlockedMandateAndReturnUniqueMandateReference", async () => {
        const createResponse = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build());
        const uniqueMandateReference = (createResponse.body as CreateMandateResponse).mandate!.uniqueMandateReference!;

        await client.mandates.blockMandate(config.merchantId, uniqueMandateReference);

        const response = await client.mandates.revokeMandate(config.merchantId, uniqueMandateReference, new RevokeMandateRequestBuilder().build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetMandateResponse;
        expect(body.mandate).toBeDefined();
        expect(body.mandate?.uniqueMandateReference).toBeDefined();
      });
    });

    describe("with unblocked mandate", () => {
      test("shouldRevokeUnblockedMandateAndReturnUniqueMandateReference", async () => {
        const createResponse = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build());
        const uniqueMandateReference = (createResponse.body as CreateMandateResponse).mandate!.uniqueMandateReference!;

        await client.mandates.blockMandate(config.merchantId, uniqueMandateReference);
        await client.mandates.unblockMandate(config.merchantId, uniqueMandateReference);

        const response = await client.mandates.revokeMandate(config.merchantId, uniqueMandateReference, new RevokeMandateRequestBuilder().build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetMandateResponse;
        expect(body.mandate).toBeDefined();
        expect(body.mandate?.uniqueMandateReference).toBeDefined();
      });
    });

    describe("with already revoked mandate", () => {
      test("shouldThrowValidationException", async () => {
        const createResponse = await client.mandates.createMandate(config.merchantId, new CreateMandateRequestBuilder().build());
        const uniqueMandateReference = (createResponse.body as CreateMandateResponse).mandate!.uniqueMandateReference!;

        await client.mandates.revokeMandate(config.merchantId, uniqueMandateReference, new RevokeMandateRequestBuilder().build());

        const response = await client.mandates.revokeMandate(config.merchantId, uniqueMandateReference, new RevokeMandateRequestBuilder().build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with invalid mandate reference", () => {
      test("shouldThrowValidationException", async () => {
        const response = await client.mandates.revokeMandate(config.merchantId, INVALID_MANDATE_REFERENCE, new RevokeMandateRequestBuilder().build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });
  });
});

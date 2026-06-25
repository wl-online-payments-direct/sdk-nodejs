import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { ErrorResponse, GetBatchStatusResponse, SubmitBatchResponse } from "../../src/generated/model/domain/index.js";
import { PaymentContext } from "../../src";
import { SubmitBatchRequestBodyBuilder } from "./builders/merchantBatch/SubmitBatchRequestBodyBuilder";
import { CreatePaymentRequestBuilder } from "./builders/common/CreatePaymentRequestBuilder";

const NON_EXISTING_BATCH_REFERENCE = "non-existing-batch-reference";

async function submitBatchAndGetReference(): Promise<string> {
  const createPaymentRequest = new CreatePaymentRequestBuilder().build();
  const createPaymentRequests = [createPaymentRequest];

  const request = new SubmitBatchRequestBodyBuilder()
    .withCreatePaymentRequests(createPaymentRequests)
    .withOperationType("CreatePayment")
    .withItemCount(1)
    .build();

  const response = await client.merchantBatch.submitBatch(config.merchantId, request);

  const ref = (response.body as SubmitBatchResponse).merchantBatchReference;

  if (!ref) {
    throw new Error("submitBatchResponse.merchantBatchReference is missing");
  }

  return ref;
}

describe("MerchantBatch", () => {
  describe("submitBatch", () => {
    describe("with valid input", () => {
      test("shouldReturnMerchantBatchReferenceWhenBatchIsValid", async () => {
        const createPaymentRequest = new CreatePaymentRequestBuilder().build();
        const createPaymentRequests = [createPaymentRequest];

        const request = new SubmitBatchRequestBodyBuilder()
          .withCreatePaymentRequests(createPaymentRequests)
          .withOperationType("CreatePayment")
          .withItemCount(1)
          .build();

        const response = await client.merchantBatch.submitBatch(config.merchantId, request);

        expect(response.isSuccess).toBe(true);

        const body = response.body as SubmitBatchResponse;
        expect(body.merchantBatchReference).toBeDefined();
        expect(body.merchantBatchReference).toBe(request.header!.merchantBatchReference);
        expect(body.totalCount).toBe(1);
      });

      test("shouldReturnMerchantBatchReferenceWhenCallContextIsProvided", async () => {
        const createPaymentRequest = new CreatePaymentRequestBuilder().build();
        const createPaymentRequests = [createPaymentRequest];

        const request = new SubmitBatchRequestBodyBuilder()
          .withCreatePaymentRequests(createPaymentRequests)
          .withOperationType("CreatePayment")
          .withItemCount(1)
          .build();

        const callContext: PaymentContext = { idempotence: { key: `test-batch-${uuidv4()}` } };
        const response = await client.merchantBatch.submitBatch(config.merchantId, request, callContext);

        expect(response.isSuccess).toBe(true);

        const body = response.body as SubmitBatchResponse;
        expect(body.merchantBatchReference).toBeDefined();
        expect(body.merchantBatchReference).toBe(request.header!.merchantBatchReference);
        expect(body.totalCount).toBe(1);
      });
    });

    describe("with empty merchant batch reference", () => {
      test("shouldReturn400WhenMerchantBatchReferenceIsEmpty", async () => {
        const createPaymentRequest = new CreatePaymentRequestBuilder().build();
        const createPaymentRequests = [createPaymentRequest];

        const request = new SubmitBatchRequestBodyBuilder()
          .withMerchantBatchReference("")
          .withCreatePaymentRequests(createPaymentRequests)
          .withOperationType("CreatePayment")
          .withItemCount(1)
          .build();

        const response = await client.merchantBatch.submitBatch(config.merchantId, request);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);

        const body = response.body as ErrorResponse;
        expect(body.errorId).toBeDefined();
        expect(body.errors).toBeDefined();
        expect(body.errors!.length).toBeGreaterThan(0);
      });
    });
  });

  describe("processBatch", () => {
    describe("with valid batch reference", () => {
      let merchantBatchReference: string;

      beforeAll(async () => {
        merchantBatchReference = await submitBatchAndGetReference();
      });

      test("shouldProcessBatchSuccessfullyWhenBatchReferenceIsValid", async () => {
        const response = await client.merchantBatch.processBatch(config.merchantId, merchantBatchReference);

        expect(response.isSuccess).toBe(true);

        const statusResponse = await client.merchantBatch.getBatchStatus(config.merchantId, merchantBatchReference);

        expect(statusResponse.isSuccess).toBe(true);

        const statusBody = statusResponse.body as GetBatchStatusResponse;
        expect(statusBody.status).toBeDefined();
      });
    });

    describe("with invalid batch reference", () => {
      test("shouldReturn404WhenBatchReferenceDoesNotExist", async () => {
        const response = await client.merchantBatch.processBatch(config.merchantId, NON_EXISTING_BATCH_REFERENCE);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);

        const body = response.body as ErrorResponse;
        expect(body.errorId).toBeDefined();
        expect(body.errors).toBeDefined();
        expect(body.errors!.length).toBeGreaterThan(0);
      });
    });
  });

  describe("getBatchStatus", () => {
    describe("with valid batch reference", () => {
      let merchantBatchReference: string;

      beforeAll(async () => {
        merchantBatchReference = await submitBatchAndGetReference();
      });

      test("shouldReturnBatchStatusWhenBatchReferenceIsValid", async () => {
        const response = await client.merchantBatch.getBatchStatus(config.merchantId, merchantBatchReference);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetBatchStatusResponse;
        expect(body.merchantBatchReference).toBeDefined();
        expect(body.merchantBatchReference).toBe(merchantBatchReference);
        expect(body.itemCount).toBe(1);
        expect(body.operationType).toBeDefined();
        expect(body.status).toBeDefined();
      });
    });

    describe("with invalid batch reference", () => {
      test("shouldReturn404WhenBatchReferenceDoesNotExist", async () => {
        const response = await client.merchantBatch.getBatchStatus(config.merchantId, NON_EXISTING_BATCH_REFERENCE);

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

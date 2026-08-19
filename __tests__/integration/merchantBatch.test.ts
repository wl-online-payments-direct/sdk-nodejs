import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { CreatePaymentRequest, ErrorResponse, GetBatchStatusResponse, PaymentsReportResponse, SubmitBatchResponse } from "../../src/generated/model/domain";
import { PaymentContext } from "../../src";
import { SubmitBatchRequestBodyBuilder } from "./builders/merchantBatch/SubmitBatchRequestBodyBuilder";
import { CreatePaymentRequestBuilder } from "./builders/common/CreatePaymentRequestBuilder";
import { GetPaymentsReportParamsBuilder } from "./builders/merchantBatch/GetPaymentsReportParamsBuilder";

const NON_EXISTING_BATCH_REFERENCE = "non-existing-batch-reference";
const INVALID_CURSOR = "invalid-cursor-value";
const CURSOR_VALUE = "cursor-value";
const LIMIT_BELOW_MINIMUM = 0;
const LIMIT_ABOVE_MAXIMUM = 1001;

async function submitBatchAndGetReference(
  createPaymentRequests: CreatePaymentRequest[] = [new CreatePaymentRequestBuilder().build()],
  operationType = "CreatePayment",
  itemCount = createPaymentRequests.length
): Promise<string> {
  const request = new SubmitBatchRequestBodyBuilder()
    .withCreatePaymentRequests(createPaymentRequests)
    .withOperationType(operationType)
    .withItemCount(itemCount)
    .build();

  const response = await client.merchantBatch.submitBatch(config.merchantId, request);

  const ref = (response.body as SubmitBatchResponse).merchantBatchReference;

  if (!ref) {
    throw new Error("submitBatchResponse.merchantBatchReference is missing");
  }

  return ref;
}

async function submitAndProcessBatchAndGetReference(createPaymentRequests?: CreatePaymentRequest[], operationType?: string, itemCount?: number): Promise<string> {
  const merchantBatchReference = await submitBatchAndGetReference(createPaymentRequests, operationType, itemCount);

  await client.merchantBatch.processBatch(config.merchantId, merchantBatchReference);

  return merchantBatchReference;
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

  describe("getPaymentsReport", () => {
    describe("with valid batch reference", () => {
      test("shouldReturnPaymentsReportWhenBatchReferenceIsValid", async () => {
        const merchantBatchReference = await submitAndProcessBatchAndGetReference();

        const response = await client.merchantBatch.getPaymentsReport(config.merchantId, merchantBatchReference, new GetPaymentsReportParamsBuilder().build());

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentsReportResponse;
        expect(body.payments).toBeDefined();
        expect(body.pagination).toBeDefined();
      });

      test("shouldReturnPaymentsReportWhenCursorAndLimitAreProvided", async () => {
        const merchantBatchReference = await submitAndProcessBatchAndGetReference();

        const firstPageParams = new GetPaymentsReportParamsBuilder().withLimit(1).build();
        const firstPageResponse = await client.merchantBatch.getPaymentsReport(config.merchantId, merchantBatchReference, firstPageParams);

        expect(firstPageResponse.isSuccess).toBe(true);
        const firstPageBody = firstPageResponse.body as PaymentsReportResponse;
        expect(firstPageBody.payments).toBeDefined();
        expect(firstPageBody.pagination).toBeDefined();

        const secondPageParamsBuilder = new GetPaymentsReportParamsBuilder().withLimit(1);
        if (firstPageBody.pagination?.nextCursor) {
          secondPageParamsBuilder.withCursor(firstPageBody.pagination.nextCursor);
        }
        const secondPageResponse = await client.merchantBatch.getPaymentsReport(config.merchantId, merchantBatchReference, secondPageParamsBuilder.build());

        expect(secondPageResponse.isSuccess).toBe(true);
        const secondPageBody = secondPageResponse.body as PaymentsReportResponse;
        expect(secondPageBody.payments).toBeDefined();
        expect(secondPageBody.pagination).toBeDefined();
      });

      test("shouldReturnPaymentsReportWhenCallContextIsProvided", async () => {
        const merchantBatchReference = await submitAndProcessBatchAndGetReference();

        const params = {
          ...new GetPaymentsReportParamsBuilder().build(),
          idempotence: { key: `test-merchant-batch-${uuidv4()}` }
        };

        const response = await client.merchantBatch.getPaymentsReport(config.merchantId, merchantBatchReference, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentsReportResponse;
        expect(body.payments).toBeDefined();
        expect(body.pagination).toBeDefined();
      });
    });

    describe("with optional query parameters", () => {
      test("shouldVerifyGetPaymentsReportParams", () => {
        const params = new GetPaymentsReportParamsBuilder()
          .withCursor(CURSOR_VALUE)
          .withLimit(50)
          .build();

        expect(params.cursor).toBe(CURSOR_VALUE);
        expect(params.limit).toBe(50);
      });
    });

    describe("with invalid batch reference", () => {
      test("shouldReturn404WhenBatchReferenceDoesNotExist", async () => {
        const response = await client.merchantBatch.getPaymentsReport(config.merchantId, NON_EXISTING_BATCH_REFERENCE, new GetPaymentsReportParamsBuilder().build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });

    describe("with invalid query parameters", () => {
      test("shouldReturn400WhenCursorIsInvalid", async () => {
        const merchantBatchReference = await submitBatchAndGetReference();

        const params = new GetPaymentsReportParamsBuilder().withCursor(INVALID_CURSOR).build();
        const response = await client.merchantBatch.getPaymentsReport(config.merchantId, merchantBatchReference, params);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });

      test("shouldReturn400WhenLimitIsBelowMinimum", async () => {
        const merchantBatchReference = await submitBatchAndGetReference();

        const params = new GetPaymentsReportParamsBuilder().withLimit(LIMIT_BELOW_MINIMUM).build();
        const response = await client.merchantBatch.getPaymentsReport(config.merchantId, merchantBatchReference, params);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });

      test("shouldReturn400WhenLimitIsAboveMaximum", async () => {
        const merchantBatchReference = await submitBatchAndGetReference();

        const params = new GetPaymentsReportParamsBuilder().withLimit(LIMIT_ABOVE_MAXIMUM).build();
        const response = await client.merchantBatch.getPaymentsReport(config.merchantId, merchantBatchReference, params);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });
  });
});

import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { GetPaymentProductGroupsResponse, PaymentProductGroup } from "../../src/generated/model/domain/index.js";
import { GetProductGroupParamsBuilder } from "./builders/productGroups/GetProductGroupParamsBuilder";
import { GetProductGroupsParamsBuilder } from "./builders/productGroups/GetProductGroupsParamsBuilder";

const VALID_PAYMENT_PRODUCT_GROUP_ID = "cards";
const INVALID_PAYMENT_PRODUCT_GROUP_ID = "invalid-group-id";
const COUNTRY_CODE = "NL";
const CURRENCY_CODE = "EUR";

describe("Product groups", () => {
  describe("getProductGroups", () => {
    describe("with valid request", () => {
      test("shouldReturnProductGroupsWhenRequestIsValid", async () => {
        const response = await client.productGroups.getProductGroups(
          config.merchantId,
          new GetProductGroupsParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductGroupsResponse;
        expect(body.paymentProductGroups).toBeDefined();
        expect(body.paymentProductGroups!.length).toBeGreaterThan(0);
        expect(body.paymentProductGroups![0]).toBeDefined();
      });

      test("shouldReturnProductGroupsWhenCallContextIsProvided", async () => {
        const response = await client.productGroups.getProductGroups(config.merchantId, {
          ...new GetProductGroupsParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .build(),
          idempotence: { key: uuidv4() }
        });

        expect(response.isSuccess).toBe(true);
        expect(response.status).toBe(200);

        const body = response.body as GetPaymentProductGroupsResponse;
        expect(body.paymentProductGroups).toBeDefined();
        expect(body.paymentProductGroups!.length).toBeGreaterThan(0);
        expect(body.paymentProductGroups![0]).toBeDefined();
      });
    });

    describe("with optional parameters", () => {
      test("shouldReturnProductGroupsWithAmount", async () => {
        const response = await client.productGroups.getProductGroups(
          config.merchantId,
          new GetProductGroupsParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .withAmount(1000)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductGroupsResponse;
        expect(body.paymentProductGroups).toBeDefined();
      });

      test("shouldReturnProductGroupsWithIsRecurring", async () => {
        const response = await client.productGroups.getProductGroups(
          config.merchantId,
          new GetProductGroupsParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .withIsRecurring(true)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductGroupsResponse;
        expect(body.paymentProductGroups).toBeDefined();
      });

      test("shouldReturnProductGroupsWithAddHide", async () => {
        const params = new GetProductGroupsParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .addHide("fields")
          .addHide("accountsOnFile")
          .build();

        const response = await client.productGroups.getProductGroups(config.merchantId, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductGroupsResponse;
        expect(body.paymentProductGroups).toBeDefined();
        expect(params.hide).toBeDefined();
        expect(params.hide!.length).toBe(2);
        expect(params.hide).toContain("fields");
        expect(params.hide).toContain("accountsOnFile");
      });

      test("shouldReturnProductGroupsWithHideList", async () => {
        const hideFields = ["fields", "translations"];
        const params = new GetProductGroupsParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .withHide(hideFields)
          .build();

        const response = await client.productGroups.getProductGroups(config.merchantId, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductGroupsResponse;
        expect(body.paymentProductGroups).toBeDefined();
        expect(params.hide).toEqual(hideFields);
      });

      test("shouldSkipNullHideElementInGetProductGroupsParams", async () => {
        const params = new GetProductGroupsParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .addHide("fields")
          .addHide((null as unknown) as string)
          .build();

        const response = await client.productGroups.getProductGroups(config.merchantId, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductGroupsResponse;
        expect(body.paymentProductGroups).toBeDefined();
        expect(params.hide!.length).toBe(2);
        expect(params.hide).toContain(null);
      });
    });

    describe("with missing country code", () => {
      test("shouldReturn400WhenCountryCodeIsMissing", async () => {
        const response = await client.productGroups.getProductGroups(config.merchantId, new GetProductGroupsParamsBuilder().withCurrencyCode(CURRENCY_CODE).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with parameter verification", () => {
      test("shouldVerifyGetProductGroupsParams", () => {
        const params = new GetProductGroupsParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .withAmount(1000)
          .withIsRecurring(true)
          .build();

        expect(params.countryCode).toBe(COUNTRY_CODE);
        expect(params.currencyCode).toBe(CURRENCY_CODE);
        expect(params.amount).toBe(1000);
        expect(params.isRecurring).toBe(true);
      });
    });
  });

  describe("getProductGroup", () => {
    describe("with valid payment product group id", () => {
      test("shouldReturnProductGroupWhenIdIsValid", async () => {
        const response = await client.productGroups.getProductGroup(
          config.merchantId,
          VALID_PAYMENT_PRODUCT_GROUP_ID,
          new GetProductGroupParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProductGroup;
        expect(body.id).toBeDefined();
        expect(body.id!.toLowerCase()).toBe(VALID_PAYMENT_PRODUCT_GROUP_ID);
      });

      test("shouldReturnProductGroupWithAmount", async () => {
        const response = await client.productGroups.getProductGroup(
          config.merchantId,
          VALID_PAYMENT_PRODUCT_GROUP_ID,
          new GetProductGroupParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .withAmount(2500)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProductGroup;
        expect(body.id).toBeDefined();
        expect(body.id!.toLowerCase()).toBe(VALID_PAYMENT_PRODUCT_GROUP_ID);
      });

      test("shouldReturnProductGroupWithIsRecurring", async () => {
        const response = await client.productGroups.getProductGroup(
          config.merchantId,
          VALID_PAYMENT_PRODUCT_GROUP_ID,
          new GetProductGroupParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .withIsRecurring(true)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProductGroup;
        expect(body.id).toBeDefined();
        expect(body.id!.toLowerCase()).toBe(VALID_PAYMENT_PRODUCT_GROUP_ID);
      });

      test("shouldReturnProductGroupWithAddHide", async () => {
        const params = new GetProductGroupParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .addHide("accountsOnFile")
          .build();

        const response = await client.productGroups.getProductGroup(config.merchantId, VALID_PAYMENT_PRODUCT_GROUP_ID, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProductGroup;
        expect(body.id).toBeDefined();
        expect(body.id!.toLowerCase()).toBe(VALID_PAYMENT_PRODUCT_GROUP_ID);
        expect(params.hide).toBeDefined();
        expect(params.hide!.length).toBe(1);
        expect(params.hide).toContain("accountsOnFile");
      });

      test("shouldReturnProductGroupWithHideList", async () => {
        const hideFields = ["fields"];
        const params = new GetProductGroupParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .withHide(hideFields)
          .build();

        const response = await client.productGroups.getProductGroup(config.merchantId, VALID_PAYMENT_PRODUCT_GROUP_ID, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProductGroup;
        expect(body.id).toBeDefined();
        expect(body.id!.toLowerCase()).toBe(VALID_PAYMENT_PRODUCT_GROUP_ID);
        expect(params.hide).toEqual(hideFields);
      });

      test("shouldSkipNullHideElementInGetProductGroupParams", async () => {
        const params = new GetProductGroupParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .addHide("accountsOnFile")
          .addHide((null as unknown) as string)
          .build();

        const response = await client.productGroups.getProductGroup(config.merchantId, VALID_PAYMENT_PRODUCT_GROUP_ID, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProductGroup;
        expect(body.id).toBeDefined();
        expect(params.hide!.length).toBe(2);
        expect(params.hide).toContain(null);
      });
    });

    describe("with parameter verification", () => {
      test("shouldVerifyGetProductGroupParams", () => {
        const params = new GetProductGroupParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .withAmount(2500)
          .withIsRecurring(false)
          .build();

        expect(params.countryCode).toBe(COUNTRY_CODE);
        expect(params.currencyCode).toBe(CURRENCY_CODE);
        expect(params.amount).toBe(2500);
        expect(params.isRecurring).toBe(false);
      });
    });

    describe("with invalid payment product group id", () => {
      test("shouldReturn404WhenPaymentProductGroupIdIsInvalid", async () => {
        const response = await client.productGroups.getProductGroup(
          config.merchantId,
          INVALID_PAYMENT_PRODUCT_GROUP_ID,
          new GetProductGroupParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .build()
        );

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });
  });
});

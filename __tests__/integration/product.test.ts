import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { GetPaymentProductsResponse, PaymentProduct, PaymentProductNetworksResponse, ProductDirectory } from "../../src/generated/model/domain/index.js";
import { GetPaymentProductParamsBuilder } from "./builders/products/GetPaymentProductParamsBuilder";
import { GetPaymentProductsParamsBuilder } from "./builders/products/GetPaymentProductsParamsBuilder";
import { GetPaymentProductNetworksParamsBuilder } from "./builders/products/GetPaymentProductNetworksParamsBuilder";
import { GetProductDirectoryParamsBuilder } from "./builders/products/GetProductDirectoryParamsBuilder";
import { PaymentProductSessionRequestBuilder } from "./builders/products/PaymentProductSessionRequestBuilder";

const VALID_PAYMENT_PRODUCT_ID = 1;
const VALID_PAYMENT_PRODUCT_NETWORKS_ID = 302;
const VALID_PAYMENT_PRODUCT_DIRECTORY_ID = 809;
const INVALID_PAYMENT_PRODUCT_ID = -1;
const COUNTRY_CODE = "NL";
const CURRENCY_CODE = "EUR";

describe("Products", () => {
  describe("getPaymentProducts", () => {
    describe("with valid request", () => {
      test("shouldReturnPaymentProductsWhenRequestIsValid", async () => {
        const response = await client.products.getPaymentProducts(
          config.merchantId,
          new GetPaymentProductsParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductsResponse;
        expect(body.paymentProducts).toBeDefined();
        expect(body.paymentProducts!.length).toBeGreaterThan(0);
        expect(body.paymentProducts![0]).toBeDefined();
        expect(body.paymentProducts![0].id).toBeGreaterThan(0);
      });

      test("shouldReturnPaymentProductsWhenCallContextIsProvided", async () => {
        const response = await client.products.getPaymentProducts(config.merchantId, {
          ...new GetPaymentProductsParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .build(),
          idempotence: { key: uuidv4() }
        });

        expect(response.isSuccess).toBe(true);
        expect(response.status).toBe(200);

        const body = response.body as GetPaymentProductsResponse;
        expect(body.paymentProducts).toBeDefined();
        expect(body.paymentProducts!.length).toBeGreaterThan(0);
        expect(body.paymentProducts![0]).toBeDefined();
        expect(body.paymentProducts![0].id).toBeGreaterThan(0);
      });
    });

    describe("with optional parameters", () => {
      test("shouldReturnPaymentProductsWithLocale", async () => {
        const response = await client.products.getPaymentProducts(
          config.merchantId,
          new GetPaymentProductsParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .withLocale("en_US")
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductsResponse;
        expect(body.paymentProducts).toBeDefined();
        expect(body.paymentProducts!.length).toBeGreaterThan(0);
        expect(body.paymentProducts![0]).toBeDefined();
        expect(body.paymentProducts![0].id).toBeGreaterThan(0);
      });

      test("shouldReturnPaymentProductsWithAmount", async () => {
        const response = await client.products.getPaymentProducts(
          config.merchantId,
          new GetPaymentProductsParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .withAmount(1000)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductsResponse;
        expect(body.paymentProducts).toBeDefined();
        expect(body.paymentProducts!.length).toBeGreaterThan(0);
        expect(body.paymentProducts![0]).toBeDefined();
        expect(body.paymentProducts![0].id).toBeGreaterThan(0);
      });

      test("shouldReturnPaymentProductsWithIsRecurring", async () => {
        const response = await client.products.getPaymentProducts(
          config.merchantId,
          new GetPaymentProductsParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .withIsRecurring(true)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductsResponse;
        expect(body.paymentProducts).toBeDefined();
        expect(body.paymentProducts!.length).toBeGreaterThan(0);
        expect(body.paymentProducts![0]).toBeDefined();
        expect(body.paymentProducts![0].id).toBeGreaterThan(0);
      });

      test("shouldReturnPaymentProductsWithHide", async () => {
        const params = new GetPaymentProductsParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .addHide("fields")
          .addHide("accountsOnFile")
          .build();

        const response = await client.products.getPaymentProducts(config.merchantId, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductsResponse;
        expect(body.paymentProducts).toBeDefined();
        expect(params.hide).toBeDefined();
        expect(params.hide!.length).toBe(2);
        expect(params.hide).toContain("fields");
        expect(params.hide).toContain("accountsOnFile");
      });

      test("shouldReturnPaymentProductsWithHideList", async () => {
        const hideFields = ["fields", "translations"];
        const params = new GetPaymentProductsParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .withHide(hideFields)
          .build();

        const response = await client.products.getPaymentProducts(config.merchantId, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductsResponse;
        expect(body.paymentProducts).toBeDefined();
        expect(params.hide).toEqual(hideFields);
      });
    });

    describe("with parameter verification", () => {
      test("shouldVerifyGetPaymentProductsParams", () => {
        const params = new GetPaymentProductsParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .withLocale("en_US")
          .withAmount(1000)
          .withIsRecurring(true)
          .build();

        expect(params.countryCode).toBe(COUNTRY_CODE);
        expect(params.currencyCode).toBe(CURRENCY_CODE);
        expect(params.locale).toBe("en_US");
        expect(params.amount).toBe(1000);
        expect(params.isRecurring).toBe(true);
      });
    });

    describe("with missing country code", () => {
      test("shouldReturn400WhenCountryCodeIsMissing", async () => {
        const response = await client.products.getPaymentProducts(config.merchantId, new GetPaymentProductsParamsBuilder().withCurrencyCode(CURRENCY_CODE).build());

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });

    describe("with operationType", () => {
      test("shouldReturnPaymentProductsWithOperationType", async () => {
        const params = new GetPaymentProductsParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .withOperationType("Authorization")
          .build();

        const response = await client.products.getPaymentProducts(config.merchantId, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPaymentProductsResponse;
        expect(body.paymentProducts).toBeDefined();
        expect(body.paymentProducts!.length).toBeGreaterThan(0);
        expect(body.paymentProducts![0].id).toBeGreaterThan(0);
        expect(params.operationType).toBe("Authorization");
      });
    });
  });

  describe("getPaymentProduct", () => {
    describe("with valid payment product id", () => {
      test("shouldReturnPaymentProductWhenIdIsValid", async () => {
        const response = await client.products.getPaymentProduct(
          config.merchantId,
          VALID_PAYMENT_PRODUCT_ID,
          new GetPaymentProductParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProduct;
        expect(body.id).toBeDefined();
        expect(body.id).toBe(VALID_PAYMENT_PRODUCT_ID);
      });

      test("shouldReturnPaymentProductWithLocale", async () => {
        const response = await client.products.getPaymentProduct(
          config.merchantId,
          VALID_PAYMENT_PRODUCT_ID,
          new GetPaymentProductParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .withLocale("nl_NL")
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProduct;
        expect(body.id).toBeDefined();
        expect(body.id).toBe(VALID_PAYMENT_PRODUCT_ID);
      });

      test("shouldReturnPaymentProductWithAmount", async () => {
        const response = await client.products.getPaymentProduct(
          config.merchantId,
          VALID_PAYMENT_PRODUCT_ID,
          new GetPaymentProductParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .withAmount(2500)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProduct;
        expect(body.id).toBeDefined();
        expect(body.id).toBe(VALID_PAYMENT_PRODUCT_ID);
      });

      test("shouldReturnPaymentProductWithIsRecurring", async () => {
        const response = await client.products.getPaymentProduct(
          config.merchantId,
          VALID_PAYMENT_PRODUCT_ID,
          new GetPaymentProductParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .withIsRecurring(false)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProduct;
        expect(body.id).toBeDefined();
        expect(body.id).toBe(VALID_PAYMENT_PRODUCT_ID);
      });

      test("shouldReturnPaymentProductWithHide", async () => {
        const params = new GetPaymentProductParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .addHide("accountsOnFile")
          .build();

        const response = await client.products.getPaymentProduct(config.merchantId, VALID_PAYMENT_PRODUCT_ID, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProduct;
        expect(body.id).toBeDefined();
        expect(body.id).toBe(VALID_PAYMENT_PRODUCT_ID);
        expect(params.hide).toBeDefined();
        expect(params.hide!.length).toBe(1);
        expect(params.hide).toContain("accountsOnFile");
      });

      test("shouldReturnPaymentProductWithHideList", async () => {
        const hideFields = ["fields"];
        const params = new GetPaymentProductParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .withHide(hideFields)
          .build();

        const response = await client.products.getPaymentProduct(config.merchantId, VALID_PAYMENT_PRODUCT_ID, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProduct;
        expect(body.id).toBeDefined();
        expect(body.id).toBe(VALID_PAYMENT_PRODUCT_ID);
        expect(params.hide).toEqual(hideFields);
      });
    });

    describe("with parameter verification", () => {
      test("shouldVerifyGetPaymentProductParams", () => {
        const params = new GetPaymentProductParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .withLocale("nl_NL")
          .withAmount(2500)
          .withIsRecurring(false)
          .build();

        expect(params.countryCode).toBe(COUNTRY_CODE);
        expect(params.currencyCode).toBe(CURRENCY_CODE);
        expect(params.locale).toBe("nl_NL");
        expect(params.amount).toBe(2500);
        expect(params.isRecurring).toBe(false);
      });
    });

    describe("with invalid payment product id", () => {
      test("shouldReturn404WhenPaymentProductIdIsInvalid", async () => {
        const response = await client.products.getPaymentProduct(
          config.merchantId,
          INVALID_PAYMENT_PRODUCT_ID,
          new GetPaymentProductParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .build()
        );

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });

    describe("with operationType", () => {
      test("shouldReturnPaymentProductWithOperationType", async () => {
        const params = new GetPaymentProductParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .withOperationType("Authorization")
          .build();

        const response = await client.products.getPaymentProduct(config.merchantId, VALID_PAYMENT_PRODUCT_ID, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProduct;
        expect(body.id).toBe(VALID_PAYMENT_PRODUCT_ID);
        expect(params.operationType).toBe("Authorization");
      });
    });
  });

  describe("getPaymentProductNetworks", () => {
    describe("with valid payment product id", () => {
      test("shouldReturnPaymentProductNetworksWhenIdIsValid", async () => {
        const response = await client.products.getPaymentProductNetworks(
          config.merchantId,
          VALID_PAYMENT_PRODUCT_NETWORKS_ID,
          new GetPaymentProductNetworksParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProductNetworksResponse;
        expect(body.networks).toBeDefined();
        expect(body.networks!.length).toBeGreaterThan(0);
        expect(body.networks![0]).toBeDefined();
      });

      test("shouldReturnPaymentProductNetworksWithAmount", async () => {
        const response = await client.products.getPaymentProductNetworks(
          config.merchantId,
          VALID_PAYMENT_PRODUCT_NETWORKS_ID,
          new GetPaymentProductNetworksParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .withAmount(3000)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProductNetworksResponse;
        expect(body.networks).toBeDefined();
      });

      test("shouldReturnPaymentProductNetworksWithIsRecurring", async () => {
        const response = await client.products.getPaymentProductNetworks(
          config.merchantId,
          VALID_PAYMENT_PRODUCT_NETWORKS_ID,
          new GetPaymentProductNetworksParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .withIsRecurring(true)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as PaymentProductNetworksResponse;
        expect(body.networks).toBeDefined();
      });
    });

    describe("with parameter verification", () => {
      test("shouldVerifyGetPaymentProductNetworksParams", () => {
        const params = new GetPaymentProductNetworksParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .withAmount(3000)
          .withIsRecurring(true)
          .build();

        expect(params.countryCode).toBe(COUNTRY_CODE);
        expect(params.currencyCode).toBe(CURRENCY_CODE);
        expect(params.amount).toBe(3000);
        expect(params.isRecurring).toBe(true);
      });
    });

    describe("with invalid payment product id", () => {
      test("shouldReturn404WhenPaymentProductNetworksIdIsInvalid", async () => {
        const response = await client.products.getPaymentProductNetworks(
          config.merchantId,
          INVALID_PAYMENT_PRODUCT_ID,
          new GetPaymentProductNetworksParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .build()
        );

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });
  });

  describe("getProductDirectory", () => {
    describe("with valid payment product id", () => {
      test.skip("shouldReturnProductDirectoryWhenIdIsValid - Test is skipped because no payment method supports directory fot the test merchant", async () => {
        const response = await client.products.getProductDirectory(
          config.merchantId,
          VALID_PAYMENT_PRODUCT_DIRECTORY_ID,
          new GetProductDirectoryParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .build()
        );

        expect(response.isSuccess).toBe(true);

        const body = response.body as ProductDirectory;
        expect(body.entries).toBeDefined();
        expect(body.entries!.length).toBeGreaterThan(0);
        expect(body.entries![0]).toBeDefined();
      });
    });

    describe("with invalid payment product id", () => {
      test("shouldReturn404WhenProductDirectoryIdIsInvalid", async () => {
        const response = await client.products.getProductDirectory(
          config.merchantId,
          INVALID_PAYMENT_PRODUCT_ID,
          new GetProductDirectoryParamsBuilder()
            .withCountryCode(COUNTRY_CODE)
            .withCurrencyCode(CURRENCY_CODE)
            .build()
        );

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(404);
      });
    });

    describe("with parameter verification", () => {
      test("shouldVerifyGetProductDirectoryParams", () => {
        const params = new GetProductDirectoryParamsBuilder()
          .withCountryCode(COUNTRY_CODE)
          .withCurrencyCode(CURRENCY_CODE)
          .build();

        expect(params.countryCode).toBe(COUNTRY_CODE);
        expect(params.currencyCode).toBe(CURRENCY_CODE);
      });
    });
  });

  describe("createPaymentProductSession", () => {
    describe("with invalid payment product id", () => {
      test("shouldReturn400WhenPaymentProductIdIsInvalid", async () => {
        const request = new PaymentProductSessionRequestBuilder().build();
        const response = await client.products.createPaymentProductSession(config.merchantId, INVALID_PAYMENT_PRODUCT_ID, request);

        expect(response.isSuccess).toBe(false);
        expect(response.status).toBe(400);
      });
    });
  });
});

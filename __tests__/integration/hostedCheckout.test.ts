import { v4 as uuidv4 } from "uuid";
import client, { config } from "./init";
import { CreateHostedCheckoutResponse, GetHostedCheckoutResponse } from "../../src/generated/model/domain/index.js";
import { CreateHostedCheckoutRequestBuilder } from "./builders/hostedCheckout/CreateHostedCheckoutRequestBuilder";

const NON_EXISTING_HOSTED_CHECKOUT_ID = "9999999999";

describe("Hosted checkout", () => {
  describe("createHostedCheckout", () => {
    describe("with card payment", () => {
      test("shouldReturnCreatedHostedCheckoutWhenInputIsValid", async () => {
        const response = await client.hostedCheckout.createHostedCheckout(
          config.merchantId,
          new CreateHostedCheckoutRequestBuilder()
            .withFirstName("John")
            .withSurname("Doe")
            .build()
        );
        expect(response.isSuccess).toBe(true);

        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });

      test("shouldReturnCreatedHostedCheckoutWhenCustomAmountIsProvided", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withAmount(9999)
          .withCurrencyCode("EUR")
          .withFirstName("Rich")
          .withSurname("Customer")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });

      test("shouldReturnCreatedHostedCheckoutWhenSessionTimeoutIsProvided", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withSessionTimeout(300)
          .withFirstName("Alex")
          .withSurname("Williams")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });

      test("shouldReturnHostedCheckoutWithCardAndFilters", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withFirstName("Bob")
          .withSurname("Johnson")
          .withAmount(2500)
          .withCurrencyCode("EUR")
          .withCountryCode("DE")
          .withLocale("de_DE")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });

      test("shouldReturnHostedCheckoutWithCallContext", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withFirstName("CallContext")
          .withSurname("Test")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request, {
          idempotence: { key: `test-hosted-checkout-${uuidv4()}` }
        });

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });

      test("shouldReturnHostedCheckoutWithCardAndCustomerDetails", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withAmount(5000)
          .withCurrencyCode("EUR")
          .withCountryCode("DE")
          .withLocale("en_GB")
          .withFirstName("Jane")
          .withSurname("Smith")
          .withEmailAddress("jane@example.com")
          .withPhoneNumber("+441234567890")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });

      test("shouldReturnHostedCheckoutWithDifferentLocales", async () => {
        const locales = ["en_US", "de_DE", "fr_FR", "es_ES", "it_IT", "nl_NL"];

        for (const locale of locales) {
          const request = new CreateHostedCheckoutRequestBuilder()
            .withLocale(locale)
            .withFirstName("Test")
            .withSurname("User")
            .build();

          const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

          expect(response.isSuccess).toBe(true);
          const body = response.body as CreateHostedCheckoutResponse;
          expect(body.hostedCheckoutId).toBeTruthy();
          expect(body.redirectUrl).toBeTruthy();
        }
      });

      test("shouldReturnHostedCheckoutWithBillingAddress", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withFirstName("John")
          .withSurname("Resident")
          .withCountryCode("US")
          .withCity("San Francisco")
          .withStreet("Main Street")
          .withHouseNumber("123")
          .withState("CA")
          .withZip("94102")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });

      test("shouldReturnHostedCheckoutWithClickToPay", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withCardClickToPay(true)
          .withFirstName("ClickToPay")
          .withSurname("Customer")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });

      test("shouldReturnHostedCheckoutWithGroupCards", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withCardGroupCards(true)
          .withFirstName("GroupCards")
          .withSurname("Customer")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });
    });

    describe("with recurring payments", () => {
      test("shouldReturnCreatedHostedCheckoutWhenIsRecurringIsTrue", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withIsRecurring(true)
          .withFirstName("Recurring")
          .withSurname("Customer")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });

      test("shouldCreateOneOffHostedCheckout", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withIsRecurring(false)
          .withFirstName("OneOff")
          .withSurname("Payment")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });
    });

    describe("with show result page", () => {
      test("shouldReturnCreatedHostedCheckoutWhenShowResultPageIsTrue", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withShowResultPage(true)
          .withFirstName("Visible")
          .withSurname("Result")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });

      test("shouldReturnCreatedHostedCheckoutWhenShowResultPageIsFalse", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withShowResultPage(false)
          .withFirstName("Silent")
          .withSurname("Payment")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });
    });

    describe("with tokenization", () => {
      test("shouldCreateHostedCheckoutWithNewUnscheduledCardOnFile", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withIsNewUnscheduledCardOnFileSeries(true)
          .withFirstName("Card")
          .withSurname("OnFile")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });

      test("shouldCreateHostedCheckoutWithoutTokenization", async () => {
        const request = new CreateHostedCheckoutRequestBuilder()
          .withIsNewUnscheduledCardOnFileSeries(false)
          .withFirstName("No")
          .withSurname("Token")
          .build();

        const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

        expect(response.isSuccess).toBe(true);
        const body = response.body as CreateHostedCheckoutResponse;
        expect(body.hostedCheckoutId).toBeTruthy();
        expect(body.redirectUrl).toBeTruthy();
      });
    });

    describe("with multiple checkouts", () => {
      test("shouldCreateMultipleHostedCheckouts", async () => {
        for (let i = 0; i < 3; i++) {
          const request = new CreateHostedCheckoutRequestBuilder()
            .withFirstName("Batch")
            .withSurname("Customer" + i)
            .build();

          const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

          expect(response.isSuccess).toBe(true);
          const body = response.body as CreateHostedCheckoutResponse;
          expect(body.hostedCheckoutId).toBeTruthy();
          expect(body.redirectUrl).toBeTruthy();
        }
      });

      test("shouldCreateCheckoutsWithDifferentAmounts", async () => {
        const amounts = [1000, 2500, 5000, 10000];

        for (const amount of amounts) {
          const request = new CreateHostedCheckoutRequestBuilder()
            .withAmount(amount)
            .withCurrencyCode("EUR")
            .withFirstName("Amount")
            .withSurname("Test")
            .build();

          const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

          expect(response.isSuccess).toBe(true);
          const body = response.body as CreateHostedCheckoutResponse;
          expect(body.hostedCheckoutId).toBeTruthy();
          expect(body.redirectUrl).toBeTruthy();
        }
      });

      test("shouldCreateCheckoutsWithDifferentCurrencies", async () => {
        const currencies = ["EUR", "GBP", "USD", "CHF", "SEK"];

        for (const currency of currencies) {
          const request = new CreateHostedCheckoutRequestBuilder()
            .withAmount(2000)
            .withCurrencyCode(currency)
            .withFirstName("Currency")
            .withSurname("Test")
            .build();

          const response = await client.hostedCheckout.createHostedCheckout(config.merchantId, request);

          expect(response.isSuccess).toBe(true);
          const body = response.body as CreateHostedCheckoutResponse;
          expect(body.hostedCheckoutId).toBeTruthy();
          expect(body.redirectUrl).toBeTruthy();
        }
      });
    });
  });

  describe("getHostedCheckout", () => {
    test("shouldReturnHostedCheckoutWhenHostedCheckoutIdIsValid", async () => {
      const createResponse = await client.hostedCheckout.createHostedCheckout(
        config.merchantId,
        new CreateHostedCheckoutRequestBuilder()
          .withFirstName("Status")
          .withSurname("Check")
          .build()
      );
      const hostedCheckoutId = (createResponse.body as CreateHostedCheckoutResponse).hostedCheckoutId!;

      const response = await client.hostedCheckout.getHostedCheckout(config.merchantId, hostedCheckoutId);
      expect(response.isSuccess).toBe(true);

      const body = response.body as GetHostedCheckoutResponse;
      expect(body.status).toBeTruthy();
    });

    test("shouldRetrieveCreatedHostedCheckout", async () => {
      const createRequest = new CreateHostedCheckoutRequestBuilder()
        .withAmount(7500)
        .withCurrencyCode("EUR")
        .withCountryCode("DE")
        .withLocale("en_GB")
        .withFirstName("Retrieve")
        .withSurname("Payment")
        .build();

      const createResponse = await client.hostedCheckout.createHostedCheckout(config.merchantId, createRequest);
      const hostedCheckoutId = (createResponse.body as CreateHostedCheckoutResponse).hostedCheckoutId!;

      const response = await client.hostedCheckout.getHostedCheckout(config.merchantId, hostedCheckoutId);

      expect(response.isSuccess).toBe(true);
      const body = response.body as GetHostedCheckoutResponse;
      expect(body.createdPaymentOutput).toBeDefined();
    });

    test("shouldReturn404WhenHostedCheckoutIdDoesNotExist", async () => {
      const response = await client.hostedCheckout.getHostedCheckout(config.merchantId, NON_EXISTING_HOSTED_CHECKOUT_ID);

      expect(response.isSuccess).toBe(false);
      expect(response.status).toBe(404);
    });
  });
});

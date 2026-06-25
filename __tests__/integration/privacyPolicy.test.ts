import client, { config } from "./init";
import { GetPrivacyPolicyResponse } from "../../src/generated/model/domain/index.js";
import { GetPrivacyPolicyParamsBuilder } from "./builders/privacyPolicy/GetPrivacyPolicyParamsBuilder";

describe("PrivacyPolicy", () => {
  describe("getPrivacyPolicy", () => {
    describe("with valid input", () => {
      test("shouldReturnGetPrivacyPolicyResponse", async () => {
        const params = new GetPrivacyPolicyParamsBuilder().build();
        const response = await client.privacyPolicy.getPrivacyPolicy(config.merchantId, params);

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPrivacyPolicyResponse;
        expect(body.htmlContent).toBeDefined();
      });

      test("shouldReturnGetPrivacyPolicyResponseWithCallContext", async () => {
        const params = new GetPrivacyPolicyParamsBuilder().build();
        const response = await client.privacyPolicy.getPrivacyPolicy(config.merchantId, { ...params, idempotence: { key: "test-privacy-policy-call-context" } });

        expect(response.isSuccess).toBe(true);

        const body = response.body as GetPrivacyPolicyResponse;
        expect(body.htmlContent).toBeDefined();
      });

      test("shouldReturnPrivacyPolicyForSpecificPaymentProduct", async () => {
        const params = new GetPrivacyPolicyParamsBuilder().withVisaProduct().build();
        const response = await client.privacyPolicy.getPrivacyPolicy(config.merchantId, params);

        expect(response.isSuccess).toBe(true);
        expect(params.paymentProductId).toBe(1);

        const body = response.body as GetPrivacyPolicyResponse;
        expect(body.htmlContent).toBeDefined();
      });
    });

    describe("with different locales", () => {
      test("shouldReturnPrivacyPolicyForEnglishLocale", async () => {
        const params = new GetPrivacyPolicyParamsBuilder().withEnglishLocale().build();
        const response = await client.privacyPolicy.getPrivacyPolicy(config.merchantId, params);

        expect(response.isSuccess).toBe(true);
        expect(params.locale).toBe("en_US");

        const body = response.body as GetPrivacyPolicyResponse;
        expect(body.htmlContent).toBeDefined();
      });

      test("shouldReturnPrivacyPolicyForDutchLocale", async () => {
        const params = new GetPrivacyPolicyParamsBuilder().withDutchLocale().build();
        const response = await client.privacyPolicy.getPrivacyPolicy(config.merchantId, params);

        expect(response.isSuccess).toBe(true);
        expect(params.locale).toBe("nl_NL");

        const body = response.body as GetPrivacyPolicyResponse;
        expect(body.htmlContent).toBeDefined();
      });

      test("shouldReturnPrivacyPolicyForFrenchLocale", async () => {
        const params = new GetPrivacyPolicyParamsBuilder().withFrenchLocale().build();
        const response = await client.privacyPolicy.getPrivacyPolicy(config.merchantId, params);

        expect(response.isSuccess).toBe(true);
        expect(params.locale).toBe("fr_FR");

        const body = response.body as GetPrivacyPolicyResponse;
        expect(body.htmlContent).toBeDefined();
      });

      test("shouldReturnPrivacyPolicyForGermanLocale", async () => {
        const params = new GetPrivacyPolicyParamsBuilder().withGermanLocale().build();
        const response = await client.privacyPolicy.getPrivacyPolicy(config.merchantId, params);

        expect(response.isSuccess).toBe(true);
        expect(params.locale).toBe("de_DE");

        const body = response.body as GetPrivacyPolicyResponse;
        expect(body.htmlContent).toBeDefined();
      });
    });

    describe("with different payment products", () => {
      test("shouldReturnPrivacyPolicyForVisa", async () => {
        const params = new GetPrivacyPolicyParamsBuilder().withVisaProduct().build();
        const response = await client.privacyPolicy.getPrivacyPolicy(config.merchantId, params);

        expect(response.isSuccess).toBe(true);
        expect(params.paymentProductId).toBe(1);

        const body = response.body as GetPrivacyPolicyResponse;
        expect(body.htmlContent).toBeDefined();
      });

      test("shouldReturnPrivacyPolicyForAmericanExpress", async () => {
        const params = new GetPrivacyPolicyParamsBuilder().withAmericanExpressProduct().build();
        const response = await client.privacyPolicy.getPrivacyPolicy(config.merchantId, params);

        expect(response.isSuccess).toBe(true);
        expect(params.paymentProductId).toBe(2);

        const body = response.body as GetPrivacyPolicyResponse;
        expect(body.htmlContent).toBeDefined();
      });

      test("shouldReturnPrivacyPolicyForMasterCard", async () => {
        const params = new GetPrivacyPolicyParamsBuilder().withMasterCardProduct().build();
        const response = await client.privacyPolicy.getPrivacyPolicy(config.merchantId, params);

        expect(response.isSuccess).toBe(true);
        expect(params.paymentProductId).toBe(3);

        const body = response.body as GetPrivacyPolicyResponse;
        expect(body.htmlContent).toBeDefined();
      });
    });

    describe("with combined parameters", () => {
      test("shouldReturnPrivacyPolicyForSpecificProductAndLocale", async () => {
        const params = new GetPrivacyPolicyParamsBuilder()
          .withVisaProduct()
          .withFrenchLocale()
          .build();
        const response = await client.privacyPolicy.getPrivacyPolicy(config.merchantId, params);

        expect(response.isSuccess).toBe(true);
        expect(params.paymentProductId).toBe(1);
        expect(params.locale).toBe("fr_FR");

        const body = response.body as GetPrivacyPolicyResponse;
        expect(body.htmlContent).toBeDefined();
      });

      test("shouldReturnPrivacyPolicyForAmexInGerman", async () => {
        const params = new GetPrivacyPolicyParamsBuilder()
          .withAmericanExpressProduct()
          .withGermanLocale()
          .build();

        const response = await client.privacyPolicy.getPrivacyPolicy(config.merchantId, params);

        expect(response.isSuccess).toBe(true);
        expect(params.paymentProductId).toBe(2);
        expect(params.locale).toBe("de_DE");

        const body = response.body as GetPrivacyPolicyResponse;
        expect(body.htmlContent).toBeDefined();
      });
    });
  });
});

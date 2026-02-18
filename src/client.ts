/*
 * This file was automatically generated.
 */
import { SdkContext } from "./model/index.js";
import { Client } from "./model/client.js";
import { newHostedCheckoutClient } from "./generated/hostedcheckout/index.js";
import { newHostedTokenizationClient } from "./generated/hostedtokenization/index.js";
import { newHostedFieldsClient } from "./generated/hostedfields/index.js";
import { newPaymentsClient } from "./generated/payments/index.js";
import { newCapturesClient } from "./generated/captures/index.js";
import { newRefundsClient } from "./generated/refunds/index.js";
import { newCompleteClient } from "./generated/complete/index.js";
import { newSubsequentClient } from "./generated/subsequent/index.js";
import { newProductGroupsClient } from "./generated/productgroups/index.js";
import { newProductsClient } from "./generated/products/index.js";
import { newServicesClient } from "./generated/services/index.js";
import { newWebhooksClient } from "./generated/webhooks/index.js";
import { newSessionsClient } from "./generated/sessions/index.js";
import { newTokensClient } from "./generated/tokens/index.js";
import { newCofSeriesClient } from "./generated/cofseries/index.js";
import { newTokenizationClient } from "./generated/tokenization/index.js";
import { newPayoutsClient } from "./generated/payouts/index.js";
import { newMandatesClient } from "./generated/mandates/index.js";
import { newPrivacyPolicyClient } from "./generated/privacypolicy/index.js";
import { newPaymentLinksClient } from "./generated/paymentlinks/index.js";

export function newClient(sdkContext: SdkContext): Client {
  return {
    hostedCheckout: newHostedCheckoutClient(sdkContext),
    hostedTokenization: newHostedTokenizationClient(sdkContext),
    hostedFields: newHostedFieldsClient(sdkContext),
    payments: newPaymentsClient(sdkContext),
    captures: newCapturesClient(sdkContext),
    refunds: newRefundsClient(sdkContext),
    complete: newCompleteClient(sdkContext),
    subsequent: newSubsequentClient(sdkContext),
    productGroups: newProductGroupsClient(sdkContext),
    products: newProductsClient(sdkContext),
    services: newServicesClient(sdkContext),
    webhooks: newWebhooksClient(sdkContext),
    sessions: newSessionsClient(sdkContext),
    tokens: newTokensClient(sdkContext),
    cofSeries: newCofSeriesClient(sdkContext),
    tokenization: newTokenizationClient(sdkContext),
    payouts: newPayoutsClient(sdkContext),
    mandates: newMandatesClient(sdkContext),
    privacyPolicy: newPrivacyPolicyClient(sdkContext),
    paymentLinks: newPaymentLinksClient(sdkContext),
    context: sdkContext
  };
}

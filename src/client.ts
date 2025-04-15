/*
 * This file was automatically generated.
 */
import { SdkContext } from "./model";
import { Client } from "./model/client";
import { newHostedCheckoutClient } from "./generated/hostedcheckout";
import { newHostedTokenizationClient } from "./generated/hostedtokenization";
import { newPaymentsClient } from "./generated/payments";
import { newCapturesClient } from "./generated/captures";
import { newRefundsClient } from "./generated/refunds";
import { newCompleteClient } from "./generated/complete";
import { newProductGroupsClient } from "./generated/productgroups";
import { newProductsClient } from "./generated/products";
import { newServicesClient } from "./generated/services";
import { newWebhooksClient } from "./generated/webhooks";
import { newSessionsClient } from "./generated/sessions";
import { newTokensClient } from "./generated/tokens";
import { newPayoutsClient } from "./generated/payouts";
import { newMandatesClient } from "./generated/mandates";
import { newPrivacyPolicyClient } from "./generated/privacypolicy";
import { newPaymentLinksClient } from "./generated/paymentlinks";

export function newClient(sdkContext: SdkContext): Client {
  return {
    hostedCheckout: newHostedCheckoutClient(sdkContext),
    hostedTokenization: newHostedTokenizationClient(sdkContext),
    payments: newPaymentsClient(sdkContext),
    captures: newCapturesClient(sdkContext),
    refunds: newRefundsClient(sdkContext),
    complete: newCompleteClient(sdkContext),
    productGroups: newProductGroupsClient(sdkContext),
    products: newProductsClient(sdkContext),
    services: newServicesClient(sdkContext),
    webhooks: newWebhooksClient(sdkContext),
    sessions: newSessionsClient(sdkContext),
    tokens: newTokensClient(sdkContext),
    payouts: newPayoutsClient(sdkContext),
    mandates: newMandatesClient(sdkContext),
    privacyPolicy: newPrivacyPolicyClient(sdkContext),
    paymentLinks: newPaymentLinksClient(sdkContext),
    context: sdkContext
  };
}

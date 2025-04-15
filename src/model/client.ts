/*
 * This file was automatically generated.
 */
import { SdkContext } from "./types";
import { HostedCheckoutClient } from "../generated/model/hostedcheckout";
import { HostedTokenizationClient } from "../generated/model/hostedtokenization";
import { PaymentsClient } from "../generated/model/payments";
import { CapturesClient } from "../generated/model/captures";
import { RefundsClient } from "../generated/model/refunds";
import { CompleteClient } from "../generated/model/complete";
import { ProductGroupsClient } from "../generated/model/productgroups";
import { ProductsClient } from "../generated/model/products";
import { ServicesClient } from "../generated/model/services";
import { WebhooksClient } from "../generated/model/webhooks";
import { SessionsClient } from "../generated/model/sessions";
import { TokensClient } from "../generated/model/tokens";
import { PayoutsClient } from "../generated/model/payouts";
import { MandatesClient } from "../generated/model/mandates";
import { PrivacyPolicyClient } from "../generated/model/privacypolicy";
import { PaymentLinksClient } from "../generated/model/paymentlinks";

export interface Client {
  readonly hostedCheckout: HostedCheckoutClient;
  readonly hostedTokenization: HostedTokenizationClient;
  readonly payments: PaymentsClient;
  readonly captures: CapturesClient;
  readonly refunds: RefundsClient;
  readonly complete: CompleteClient;
  readonly productGroups: ProductGroupsClient;
  readonly products: ProductsClient;
  readonly services: ServicesClient;
  readonly webhooks: WebhooksClient;
  readonly sessions: SessionsClient;
  readonly tokens: TokensClient;
  readonly payouts: PayoutsClient;
  readonly mandates: MandatesClient;
  readonly privacyPolicy: PrivacyPolicyClient;
  readonly paymentLinks: PaymentLinksClient;
  readonly context: SdkContext;
}

/*
 * This file was automatically generated.
 */
import { SdkContext } from "./types.js";
import { HostedCheckoutClient } from "../generated/model/hostedcheckout/index.js";
import { HostedTokenizationClient } from "../generated/model/hostedtokenization/index.js";
import { HostedFieldsClient } from "../generated/model/hostedfields/index.js";
import { PaymentsClient } from "../generated/model/payments/index.js";
import { CapturesClient } from "../generated/model/captures/index.js";
import { RefundsClient } from "../generated/model/refunds/index.js";
import { CompleteClient } from "../generated/model/complete/index.js";
import { SubsequentClient } from "../generated/model/subsequent/index.js";
import { ProductGroupsClient } from "../generated/model/productgroups/index.js";
import { ProductsClient } from "../generated/model/products/index.js";
import { ServicesClient } from "../generated/model/services/index.js";
import { WebhooksClient } from "../generated/model/webhooks/index.js";
import { SessionsClient } from "../generated/model/sessions/index.js";
import { TokensClient } from "../generated/model/tokens/index.js";
import { CofSeriesClient } from "../generated/model/cofseries/index.js";
import { TokenizationClient } from "../generated/model/tokenization/index.js";
import { PayoutsClient } from "../generated/model/payouts/index.js";
import { MandatesClient } from "../generated/model/mandates/index.js";
import { PrivacyPolicyClient } from "../generated/model/privacypolicy/index.js";
import { PaymentLinksClient } from "../generated/model/paymentlinks/index.js";

export interface Client {
  readonly hostedCheckout: HostedCheckoutClient;
  readonly hostedTokenization: HostedTokenizationClient;
  readonly hostedFields: HostedFieldsClient;
  readonly payments: PaymentsClient;
  readonly captures: CapturesClient;
  readonly refunds: RefundsClient;
  readonly complete: CompleteClient;
  readonly subsequent: SubsequentClient;
  readonly productGroups: ProductGroupsClient;
  readonly products: ProductsClient;
  readonly services: ServicesClient;
  readonly webhooks: WebhooksClient;
  readonly sessions: SessionsClient;
  readonly tokens: TokensClient;
  readonly cofSeries: CofSeriesClient;
  readonly tokenization: TokenizationClient;
  readonly payouts: PayoutsClient;
  readonly mandates: MandatesClient;
  readonly privacyPolicy: PrivacyPolicyClient;
  readonly paymentLinks: PaymentLinksClient;
  readonly context: SdkContext;
}

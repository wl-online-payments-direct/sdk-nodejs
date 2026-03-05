import { GetBatchStatusResponse, PaymentLinkResponse, PaymentResponse, PayoutResponse, RefundResponse, TokenResponse } from "../../generated/model/domain/index.js";

export interface WebhooksEvent {
  apiVersion?: string | null;
  created?: string | null;
  id?: string | null;
  merchantId?: string | null;
  type?: string | null;
  directBatch?: GetBatchStatusResponse | null;
  paymentLink?: PaymentLinkResponse | null;
  payment?: PaymentResponse | null;
  payout?: PayoutResponse | null;
  refund?: RefundResponse | null;
  token?: TokenResponse | null;
}

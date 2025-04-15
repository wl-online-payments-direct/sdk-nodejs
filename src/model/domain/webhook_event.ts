import { PaymentResponse, PayoutResponse, RefundResponse, TokenResponse } from "../../generated/model/domain";

export interface WebhooksEvent {
  apiVersion?: string | null;
  created?: string | null;
  id?: string | null;
  merchantId?: string | null;
  type?: string | null;
  payment?: PaymentResponse | null;
  payout?: PayoutResponse | null;
  refund?: RefundResponse | null;
  token?: TokenResponse | null;
}

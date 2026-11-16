/**
 * Stand-ins for your application's own types and persistence. The examples use them where your code must store or
 * read data; replace them with your own code.
 */

/**
 * The payment state of an order in your application.
 */
export type OrderPaymentState = "pending" | "authorized" | "paid" | "failed" | "cancelled" | "refunded" | "reversed";

/**
 * What the web layer must do after a create payment call: redirect the customer, or show the result.
 */
export type PaymentStep = { kind: "redirect"; redirectUrl: string } | { kind: "done"; state: OrderPaymentState };

export interface StoredHostedCheckout {
  hostedCheckoutId: string;
  returnMac: string;
}

/**
 * Stand-in for your database code.
 */
export interface OrderStore {
  /** The idempotence key of the create call of this order. Save it before the call, so a restart can reuse it. */
  saveIdempotenceKey(orderId: string, key: string): Promise<void>;
  getIdempotenceKey(orderId: string): Promise<string | undefined>;
  saveHostedCheckout(orderId: string, hostedCheckoutId: string, returnMac: string): Promise<void>;
  getHostedCheckout(orderId: string): Promise<StoredHostedCheckout>;
  savePaymentId(orderId: string, paymentId: string): Promise<void>;
  /** Undefined until a webhook or a return stored the payment ID. */
  getPaymentId(orderId: string): Promise<string | undefined>;
  saveState(orderId: string, state: OrderPaymentState): Promise<void>;
  saveRecurringPaymentId(customerId: string, initialPaymentId: string): Promise<void>;
  getRecurringPaymentId(customerId: string): Promise<string>;
}

/**
 * Browser values collected with JavaScript on the checkout page.
 */
export interface BrowserInfo {
  colorDepth: number;
  javaEnabled: boolean;
  screenHeight: number;
  screenWidth: number;
  timezoneOffsetUtcMinutes: number;
  locale: string;
}

/**
 * Card details as entered by the customer. Never log or store this object.
 */
export interface CardInput {
  number: string;
  holderName: string;
  /** MMYY, e.g. 1230 for December 2030. */
  expiryDate: string;
  cvv: string;
}

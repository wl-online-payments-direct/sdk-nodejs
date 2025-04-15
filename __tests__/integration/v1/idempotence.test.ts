/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { v4 as newUUID } from "uuid";
import { PaymentContext } from "../../../src/model";
import client, { config } from "../init";
import { CreatePaymentRequest, CreatePaymentResponse } from "../../../src/generated/model/domain";

/**
 * @group integration
 */
describe("Idempotence", () => {
  test("causes second request to be idempotent", async () => {
    const body: CreatePaymentRequest = {
      order: {
        amountOfMoney: {
          currencyCode: "EUR",
          amount: 100
        },
        customer: {
          locale: "en",
          billingAddress: {
            countryCode: "NL"
          }
        }
      },
      cardPaymentMethodSpecificInput: {
        paymentProductId: 1,
        isRecurring: false,
        threeDSecure: {
          skipAuthentication: true
        },
        card: {
          cardholderName: "Wile E. Coyote",
          cardNumber: "4330264936344675",
          expiryDate: "1230",
          cvv: "123"
        }
      }
    };

    const idempotenceKey = newUUID();
    const paymentContext: PaymentContext = {
      idempotence: {
        key: idempotenceKey
      }
    };

    const response = await client.payments.createPayment(config.merchantId, body, paymentContext);

    expect(response.body).toBeTruthy();
    expect(response.status).toBeTruthy();
    expect(idempotenceKey).toBe(paymentContext.idempotence?.key);
    expect(paymentContext.idempotence?.requestTimestamp).toBeFalsy();

    const paymentResponse = response.body as CreatePaymentResponse;
    const paymentId = paymentResponse.payment?.id;

    const response2 = await client.payments.createPayment(config.merchantId, body, paymentContext);

    expect(response2.status).toBe(response!.status);
    expect(response2.body).toBeTruthy();

    const paymentResponse2 = response.body as CreatePaymentResponse;
    expect(paymentId).toBe(paymentResponse2.payment?.id);
    expect(idempotenceKey).toBe(paymentContext.idempotence?.key);
    // the following line breaks and should be checked
    expect(paymentContext.idempotence?.requestTimestamp).toBeTruthy();
  });
});

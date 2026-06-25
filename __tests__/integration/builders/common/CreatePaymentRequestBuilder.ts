import { v4 as uuidv4 } from "uuid";
import { CreatePaymentRequest } from "../../../../src/generated/model/domain/index.js";

enum PaymentMethodType {
  CARD = "CARD",
  PAYPAL_REDIRECT = "PAYPAL_REDIRECT"
}

export class CreatePaymentRequestBuilder {
  private cardNumber = "4012000033330026";
  private cvv = "123";
  private expiryDate = "0530";
  private cardholderName = "Wile E. Coyote";

  private amount = 1000;
  private currencyCode = "EUR";

  private merchantReference = `Ref-${uuidv4()}`;
  private merchantCustomerId = "CUST-000001";

  private paymentMethodType = PaymentMethodType.CARD;
  private autoCapture = false;

  withCardNumber(cardNumber: string): this {
    this.cardNumber = cardNumber;
    return this;
  }

  withCvv(cvv: string): this {
    this.cvv = cvv;
    return this;
  }

  withExpiryDate(expiryDate: string): this {
    this.expiryDate = expiryDate;
    return this;
  }

  withCardholderName(cardholderName: string): this {
    this.cardholderName = cardholderName;
    return this;
  }

  withAmount(amount: number): this {
    this.amount = amount;
    return this;
  }

  withCurrencyCode(currencyCode: string): this {
    this.currencyCode = currencyCode;
    return this;
  }

  withMerchantReference(merchantReference: string): this {
    this.merchantReference = merchantReference;
    return this;
  }

  withMerchantCustomerId(merchantCustomerId: string): this {
    this.merchantCustomerId = merchantCustomerId;
    return this;
  }

  withCardPaymentMethod(): this {
    this.paymentMethodType = PaymentMethodType.CARD;
    return this;
  }

  withPayPalRedirectPaymentMethod(): this {
    this.paymentMethodType = PaymentMethodType.PAYPAL_REDIRECT;
    return this;
  }

  withAutoCapture(autoCapture: boolean): this {
    this.autoCapture = autoCapture;
    return this;
  }

  build(): CreatePaymentRequest {
    if (this.paymentMethodType === PaymentMethodType.CARD) {
      return {
        cardPaymentMethodSpecificInput: this.buildCardPaymentInput(),
        order: this.buildCardOrder()
      };
    }

    return {
      redirectPaymentMethodSpecificInput: this.buildRedirectPaymentInput(),
      order: this.buildPayPalOrder()
    };
  }

  private buildCardPaymentInput() {
    return {
      card: this.buildCard(),
      authorizationMode: "FINAL_AUTHORIZATION",
      transactionChannel: "ECOMMERCE",
      returnUrl: "https://example.com/return",
      paymentProductId: 1,
      ...(this.autoCapture && { autoCapture: { delayInMinutes: 10 } })
    };
  }

  private buildRedirectPaymentInput() {
    return {
      paymentProductId: 840
    };
  }

  private buildCard() {
    return {
      cardholderName: this.cardholderName,
      cardNumber: this.cardNumber,
      expiryDate: this.expiryDate,
      cvv: this.cvv
    };
  }

  private buildCardOrder() {
    return {
      amountOfMoney: this.buildAmountOfMoney(),
      customer: this.buildCustomer(),
      references: this.buildOrderReferences()
    };
  }

  private buildPayPalOrder() {
    return {
      amountOfMoney: this.buildAmountOfMoney(),
      references: {
        ...this.buildOrderReferences(),
        descriptor: "Applefruitcompany",
        merchantParameters: "SessionID=126548354&ShopperID=73541312"
      }
    };
  }

  private buildAmountOfMoney() {
    return {
      amount: this.amount,
      currencyCode: this.currencyCode
    };
  }

  private buildOrderReferences() {
    return {
      merchantReference: this.merchantReference
    };
  }

  private buildCustomer() {
    return {
      companyInformation: this.buildCompanyInformation(),
      merchantCustomerId: this.merchantCustomerId,
      account: this.buildCustomerAccount(),
      accountType: "existing",
      billingAddress: this.buildBillingAddress(),
      contactDetails: this.buildContactDetails(),
      device: this.buildCustomerDevice(),
      personalInformation: this.buildPersonalInformation()
    };
  }

  private buildCompanyInformation() {
    return { name: "CUST-000001" };
  }

  private buildCustomerAccount() {
    return {
      authentication: this.buildAuthentication(),
      changeDate: "20200101",
      changedDuringCheckout: true,
      createDate: "20100101",
      hadSuspiciousActivity: false,
      passwordChangeDate: "20200101",
      passwordChangedDuringCheckout: false,
      paymentAccountOnFile: this.buildPaymentAccountOnFile(),
      paymentActivity: this.buildPaymentActivity()
    };
  }

  private buildAuthentication() {
    return {
      method: "guest",
      utcTimestamp: "202309261631"
    };
  }

  private buildPaymentAccountOnFile() {
    return {
      createDate: "20100101",
      numberOfCardOnFileCreationAttemptsLast24Hours: 1
    };
  }

  private buildPaymentActivity() {
    return {
      numberOfPaymentAttemptsLast24Hours: 1,
      numberOfPaymentAttemptsLastYear: 0,
      numberOfPurchasesLast6Months: 0
    };
  }

  private buildBillingAddress() {
    return {
      countryCode: "BE",
      city: "Brussels",
      houseNumber: "3",
      state: "Flemish Brabant",
      street: "Da Vincilaan",
      zip: "1930",
      additionalInfo: "floor 9"
    };
  }

  private buildContactDetails() {
    return {
      emailAddress: "wile.e.coyote@acmelabs.com",
      phoneNumber: "+321234567890"
    };
  }

  private buildCustomerDevice() {
    return {
      acceptHeader: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      browserData: this.buildBrowserData(),
      ipAddress: "123.123.123.123",
      locale: "en_GB",
      userAgent: "Mozilla/5.0(WindowsNT10.0;Win64;x64)AppleWebKit/537.36(KHTML,likeGecko)Chrome/75.0.3770.142Safari/537.36",
      timezoneOffsetUtcMinutes: "-180"
    };
  }

  private buildBrowserData() {
    return {
      colorDepth: 99,
      javaEnabled: true,
      javaScriptEnabled: true,
      screenHeight: "768",
      screenWidth: "1024"
    };
  }

  private buildPersonalInformation() {
    return {
      name: this.buildPersonalName(),
      gender: "male",
      dateOfBirth: "19500101"
    };
  }

  private buildPersonalName() {
    return {
      title: "M.",
      firstName: "Wile",
      surname: "Coyote"
    };
  }
}

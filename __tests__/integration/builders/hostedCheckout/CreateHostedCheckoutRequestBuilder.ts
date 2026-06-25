import { v4 as uuidv4 } from "uuid";
import { CreateHostedCheckoutRequest } from "../../../../src/generated/model/domain/index.js";

export class CreateHostedCheckoutRequestBuilder {
  private amount = 1000;
  private currencyCode = "EUR";
  private merchantReference = `Ord-${uuidv4()}`;
  private merchantCustomerId = "CUST-000001";
  private locale = "en_US";
  private countryCode = "US";
  private returnUrl = "https://example.com/return";
  private sessionTimeout = 600;
  private showResultPage = true;
  private isRecurring?: boolean;
  private isNewUnscheduledCardOnFileSeries?: boolean;
  private tokens?: string;
  private allowedNumberOfPaymentAttempts?: number;
  private variant?: string;
  private firstName = "Test";
  private surname = "User";
  private title?: string;
  private emailAddress?: string;
  private phoneNumber?: string;
  private city?: string;
  private street?: string;
  private houseNumber?: string;
  private state?: string;
  private zip?: string;
  private cardClickToPay?: boolean;
  private cardGroupCards?: boolean;

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

  withLocale(locale: string): this {
    this.locale = locale;
    return this;
  }

  withCountryCode(countryCode: string): this {
    this.countryCode = countryCode;
    return this;
  }

  withReturnUrl(returnUrl: string): this {
    this.returnUrl = returnUrl;
    return this;
  }

  withSessionTimeout(sessionTimeout: number): this {
    this.sessionTimeout = sessionTimeout;
    return this;
  }

  withShowResultPage(showResultPage: boolean): this {
    this.showResultPage = showResultPage;
    return this;
  }

  withIsRecurring(isRecurring: boolean): this {
    this.isRecurring = isRecurring;
    return this;
  }

  withIsNewUnscheduledCardOnFileSeries(isNewUnscheduledCardOnFileSeries: boolean): this {
    this.isNewUnscheduledCardOnFileSeries = isNewUnscheduledCardOnFileSeries;
    return this;
  }

  withTokens(tokens: string): this {
    this.tokens = tokens;
    return this;
  }

  withAllowedNumberOfPaymentAttempts(allowedNumberOfPaymentAttempts: number): this {
    this.allowedNumberOfPaymentAttempts = allowedNumberOfPaymentAttempts;
    return this;
  }

  withVariant(variant: string): this {
    this.variant = variant;
    return this;
  }

  withFirstName(firstName: string): this {
    this.firstName = firstName;
    return this;
  }

  withSurname(surname: string): this {
    this.surname = surname;
    return this;
  }

  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  withEmailAddress(emailAddress: string): this {
    this.emailAddress = emailAddress;
    return this;
  }

  withPhoneNumber(phoneNumber: string): this {
    this.phoneNumber = phoneNumber;
    return this;
  }

  withCity(city: string): this {
    this.city = city;
    return this;
  }

  withStreet(street: string): this {
    this.street = street;
    return this;
  }

  withHouseNumber(houseNumber: string): this {
    this.houseNumber = houseNumber;
    return this;
  }

  withState(state: string): this {
    this.state = state;
    return this;
  }

  withZip(zip: string): this {
    this.zip = zip;
    return this;
  }

  withCardClickToPay(cardClickToPay: boolean): this {
    this.cardClickToPay = cardClickToPay;
    return this;
  }

  withCardGroupCards(cardGroupCards: boolean): this {
    this.cardGroupCards = cardGroupCards;
    return this;
  }

  build(): CreateHostedCheckoutRequest {
    const hostedCheckoutSpecificInput: NonNullable<CreateHostedCheckoutRequest["hostedCheckoutSpecificInput"]> = {
      locale: this.locale,
      returnUrl: this.returnUrl,
      sessionTimeout: this.sessionTimeout,
      showResultPage: this.showResultPage
    };

    if (this.isRecurring !== undefined) {
      hostedCheckoutSpecificInput.isRecurring = this.isRecurring;
    }

    if (this.isNewUnscheduledCardOnFileSeries !== undefined) {
      hostedCheckoutSpecificInput.isNewUnscheduledCardOnFileSeries = this.isNewUnscheduledCardOnFileSeries;
    }

    if (this.tokens !== undefined) {
      hostedCheckoutSpecificInput.tokens = this.tokens;
    }

    if (this.allowedNumberOfPaymentAttempts !== undefined) {
      hostedCheckoutSpecificInput.allowedNumberOfPaymentAttempts = this.allowedNumberOfPaymentAttempts;
    }

    if (this.variant !== undefined) {
      hostedCheckoutSpecificInput.variant = this.variant;
    }

    if (this.cardClickToPay !== undefined || this.cardGroupCards !== undefined) {
      hostedCheckoutSpecificInput.cardPaymentMethodSpecificInput = {
        ...(this.cardClickToPay !== undefined && { clickToPay: this.cardClickToPay }),
        ...(this.cardGroupCards !== undefined && { groupCards: this.cardGroupCards })
      };
    }

    const billingAddress: NonNullable<NonNullable<NonNullable<CreateHostedCheckoutRequest["order"]>["customer"]>["billingAddress"]> = {
      countryCode: this.countryCode
    };

    if (this.city !== undefined) {
      billingAddress.city = this.city;
    }
    if (this.street !== undefined) {
      billingAddress.street = this.street;
    }
    if (this.houseNumber !== undefined) {
      billingAddress.houseNumber = this.houseNumber;
    }
    if (this.state !== undefined) {
      billingAddress.state = this.state;
    }
    if (this.zip !== undefined) {
      billingAddress.zip = this.zip;
    }

    const customer: NonNullable<NonNullable<CreateHostedCheckoutRequest["order"]>["customer"]> = {
      merchantCustomerId: this.merchantCustomerId,
      billingAddress
    };

    if (this.firstName !== undefined || this.surname !== undefined) {
      customer.personalInformation = {
        name: {
          ...(this.firstName !== undefined && { firstName: this.firstName }),
          ...(this.surname !== undefined && { surname: this.surname }),
          ...(this.title !== undefined && { title: this.title })
        }
      };
    }

    if (this.emailAddress !== undefined || this.phoneNumber !== undefined) {
      customer.contactDetails = {
        ...(this.emailAddress !== undefined && { emailAddress: this.emailAddress }),
        ...(this.phoneNumber !== undefined && { phoneNumber: this.phoneNumber })
      };
    }

    return {
      hostedCheckoutSpecificInput,
      order: {
        amountOfMoney: {
          amount: this.amount,
          currencyCode: this.currencyCode
        },
        customer,
        references: {
          merchantReference: this.merchantReference
        }
      }
    };
  }
}

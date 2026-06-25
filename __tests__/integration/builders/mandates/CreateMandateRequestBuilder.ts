import { CreateMandateRequest } from "../../../../src/generated/model/domain/index.js";

function generateUniqueMandateReference(): string {
  return `mandate${Date.now()}`;
}

export class CreateMandateRequestBuilder {
  private alias = "Test Mandate";
  private customerIban = "BE45000253450589";
  private companyName = "BEL Labs";
  private emailAddress = "wile.e.coyote@acmelabs.com";
  private city = "Brussels";
  private countryCode = "BE";
  private houseNumber = "3";
  private street = "Da Vincilaan";
  private zip = "1930";
  private firstName = "Jane";
  private surname = "Doe";
  private title = "Mrs";
  private customerReference = "CUST123";
  private recurrenceType = "UNIQUE";
  private signatureType = "UNSIGNED";
  private returnUrl = "https://example-mandate-signing-url.com";
  private uniqueMandateReference = generateUniqueMandateReference();

  withAlias(alias: string): this {
    this.alias = alias;
    return this;
  }

  withCustomerIban(customerIban: string): this {
    this.customerIban = customerIban;
    return this;
  }

  withCompanyName(companyName: string): this {
    this.companyName = companyName;
    return this;
  }

  withEmailAddress(emailAddress: string): this {
    this.emailAddress = emailAddress;
    return this;
  }

  withCity(city: string): this {
    this.city = city;
    return this;
  }

  withCountryCode(countryCode: string): this {
    this.countryCode = countryCode;
    return this;
  }

  withHouseNumber(houseNumber: string): this {
    this.houseNumber = houseNumber;
    return this;
  }

  withStreet(street: string): this {
    this.street = street;
    return this;
  }

  withZip(zip: string): this {
    this.zip = zip;
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

  withCustomerReference(customerReference: string): this {
    this.customerReference = customerReference;
    return this;
  }

  withRecurrenceType(recurrenceType: string): this {
    this.recurrenceType = recurrenceType;
    return this;
  }

  withSignatureType(signatureType: string): this {
    this.signatureType = signatureType;
    return this;
  }

  withReturnUrl(returnUrl: string): this {
    this.returnUrl = returnUrl;
    return this;
  }

  withUniqueMandateReference(uniqueMandateReference: string): this {
    this.uniqueMandateReference = uniqueMandateReference;
    return this;
  }

  build(): CreateMandateRequest {
    return {
      alias: this.alias,
      customerReference: this.customerReference,
      recurrenceType: this.recurrenceType,
      signatureType: this.signatureType,
      returnUrl: this.returnUrl,
      uniqueMandateReference: this.uniqueMandateReference,
      customer: {
        companyName: this.companyName,
        bankAccountIban: { iban: this.customerIban },
        contactDetails: { emailAddress: this.emailAddress },
        mandateAddress: {
          city: this.city,
          countryCode: this.countryCode,
          houseNumber: this.houseNumber,
          street: this.street,
          zip: this.zip
        },
        personalInformation: {
          title: this.title,
          name: {
            firstName: this.firstName,
            surname: this.surname
          }
        }
      }
    };
  }
}

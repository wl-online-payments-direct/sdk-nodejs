import { CarRentalData, CarRentalPickupReturnData, UpdateAuthorizationAdditionalDataRequest } from "../../../../src/generated/model/domain/index.js";

export class UpdateAuthorizationAdditionalDataRequestBuilder {
  private chargesCategory = "gas";
  private minimal = false;

  withChargesCategory(chargesCategory: string): this {
    this.chargesCategory = chargesCategory;
    return this;
  }

  withMinimalCarRentalData(): this {
    this.minimal = true;
    return this;
  }

  build(): UpdateAuthorizationAdditionalDataRequest {
    return {
      carRentalData: this.minimal ? this.buildMinimalCarRentalData() : this.buildFullCarRentalData()
    };
  }

  private buildMinimalCarRentalData(): CarRentalData {
    return {
      agreementNumber: "A1234567",
      chargesAmount: 0,
      chargesCategory: this.chargesCategory,
      pickupDetails: this.buildPickupReturnDetails("2026-09-28T090000.000Z"),
      returnDetails: this.buildPickupReturnDetails("2026-09-30T090000.000Z"),
      rentalRateAmount: 1000,
      rentalRateType: "daily",
      renterName: "Wile E. Coyote"
    };
  }

  private buildFullCarRentalData(): CarRentalData {
    return {
      ...this.buildMinimalCarRentalData(),
      cardholderNotified: true,
      distanceMeasure: 250,
      distanceUnit: "kilometers",
      driverIdentificationNumber: "DRV123456",
      driverTaxNumber: "BE0123456789",
      taxExemptIndicator: false,
      tollFreeNumber: "0800123456",
      vehicle: {
        classId: "CDMR",
        identificationNumber: "VIN123456"
      }
    };
  }

  private buildPickupReturnDetails(date: string): CarRentalPickupReturnData {
    return {
      address: "Da Vincilaan 3",
      city: "Brussels",
      country: 56,
      date,
      location: "Brussels Airport",
      postcode: "1930",
      state: "Flemish Brabant"
    };
  }
}

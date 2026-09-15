const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "carRentalData" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/carRentalData"
        },
        { "type" : "null" }
      ]
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "carRentalData" : {
      "type" : "object",
      "properties" : {
        "agreementNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "cardholderNotified" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "chargesAmount" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "chargesCategory" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "distanceMeasure" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "distanceUnit" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "driverIdentificationNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "driverTaxNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "pickup" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/carRentalPickupReturnData"
            },
            { "type" : "null" }
          ]
        },
        "rentalRateAmount" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "rentalRateType" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "renterName" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "return" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/carRentalPickupReturnData"
            },
            { "type" : "null" }
          ]
        },
        "taxExemptIndicator" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "tollFreeNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "vehicle" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/carRentalVehicleData"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "carRentalPickupReturnData" : {
      "type" : "object",
      "properties" : {
        "address" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "city" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "country" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "date" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "location" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "postcode" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "state" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "carRentalVehicleData" : {
      "type" : "object",
      "properties" : {
        "classId" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "identificationNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    }
  }
}

export default schema;

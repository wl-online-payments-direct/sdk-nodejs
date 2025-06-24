const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : "object",
  "properties" : {
    "amountOfMoney" : {
      "$ref" : "#/definitions/amountOfMoney"
    },
    "cardSource" : {
      "$ref" : "#/definitions/cardSource"
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "amountOfMoney" : {
      "type" : "object",
      "properties" : {
        "amount" : {
          "type" : "integer"
        },
        "currencyCode" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "cardSource" : {
      "type" : "object",
      "properties" : {
        "card" : {
          "$ref" : "#/definitions/surchargeCalculationCard"
        },
        "encryptedCustomerInput" : {
          "type" : "string"
        },
        "hostedTokenizationId" : {
          "type" : "string"
        },
        "token" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "surchargeCalculationCard" : {
      "type" : "object",
      "properties" : {
        "cardNumber" : {
          "type" : "string"
        },
        "paymentProductId" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    }
  }
}

export default schema;

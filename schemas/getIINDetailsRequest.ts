const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : "object",
  "properties" : {
    "bin" : {
      "type" : "string"
    },
    "paymentContext" : {
      "$ref" : "#/definitions/paymentContext"
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
    "paymentContext" : {
      "type" : "object",
      "properties" : {
        "amountOfMoney" : {
          "$ref" : "#/definitions/amountOfMoney"
        },
        "countryCode" : {
          "type" : "string"
        },
        "isRecurring" : {
          "type" : "boolean"
        }
      },
      "additionalProperties" : false
    }
  }
}

export default schema;

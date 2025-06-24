const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : "object",
  "properties" : {
    "amountOfMoney" : {
      "$ref" : "#/definitions/amountOfMoney"
    },
    "captureId" : {
      "type" : "string"
    },
    "operationReferences" : {
      "$ref" : "#/definitions/operationPaymentReferences"
    },
    "references" : {
      "$ref" : "#/definitions/paymentReferences"
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
    "operationPaymentReferences" : {
      "type" : "object",
      "properties" : {
        "merchantReference" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "paymentReferences" : {
      "type" : "object",
      "properties" : {
        "merchantParameters" : {
          "type" : "string"
        },
        "merchantReference" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    }
  }
}

export default schema;

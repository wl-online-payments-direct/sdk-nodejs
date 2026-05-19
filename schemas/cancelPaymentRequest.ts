const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "amountOfMoney" : {
      "$ref" : "#/definitions/amountOfMoney"
    },
    "isFinal" : {
      "type" : "boolean"
    },
    "lineItemDetails" : {
      "type" : "array",
      "items" : {
        "$ref" : "#/definitions/lineItemDetail"
      },
      "uniqueItems" : false
    },
    "operationReferences" : {
      "$ref" : "#/definitions/operationPaymentReferences"
    },
    "shipping" : {
      "$ref" : "#/definitions/shippingDetail"
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
    "lineItemDetail" : {
      "type" : "object",
      "properties" : {
        "discountAmount" : {
          "type" : "integer"
        },
        "lineItemId" : {
          "type" : "string"
        },
        "quantity" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    },
    "operationPaymentReferences" : {
      "type" : "object",
      "properties" : {
        "merchantReference" : {
          "type" : "string"
        },
        "operationGroupReference" : {
          "type" : "string"
        },
        "structuredCreditorReference" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "shippingDetail" : {
      "type" : "object",
      "properties" : {
        "shippingCost" : {
          "type" : "integer"
        },
        "shippingCostTax" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    }
  }
}

export default schema;

const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "amount" : {
      "type" : "integer"
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
    "references" : {
      "$ref" : "#/definitions/paymentReferences"
    },
    "shipping" : {
      "$ref" : "#/definitions/shippingDetail"
    }
  },
  "additionalProperties" : false,
  "definitions" : {
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
        },
        "taxAmount" : {
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
        },
        "operationGroupReference" : {
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

const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "amountOfMoney" : {
      "$ref" : "#/definitions/amountOfMoney"
    },
    "captureId" : {
      "type" : "string"
    },
    "lineItemDetails" : {
      "type" : "array",
      "items" : {
        "$ref" : "#/definitions/lineItemDetail"
      },
      "uniqueItems" : false
    },
    "omnichannelRefundSpecificInput" : {
      "$ref" : "#/definitions/omnichannelRefundSpecificInput"
    },
    "operationReferences" : {
      "$ref" : "#/definitions/operationPaymentReferences"
    },
    "reason" : {
      "type" : "string"
    },
    "references" : {
      "$ref" : "#/definitions/paymentReferences"
    },
    "refundRedirectPaymentMethodSpecificInput" : {
      "$ref" : "#/definitions/refundRedirectPaymentMethodSpecificInput"
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
        "lineItemId" : {
          "type" : "string"
        },
        "quantity" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    },
    "omnichannelRefundSpecificInput" : {
      "type" : "object",
      "properties" : {
        "operatorId" : {
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
    "refundRedirectPaymentMethodSpecificInput" : {
      "type" : "object",
      "properties" : {
        "refundRedirectPaymentProduct900SpecificInput" : {
          "$ref" : "#/definitions/refundRedirectPaymentProduct900SpecificInput"
        }
      },
      "additionalProperties" : false
    },
    "refundRedirectPaymentProduct900SpecificInput" : {
      "type" : "object",
      "properties" : {
        "refundReason" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    }
  }
}

export default schema;

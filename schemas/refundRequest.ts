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
    }
  }
}

export default schema;

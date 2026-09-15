const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "amountOfMoney" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/amountOfMoney"
        },
        { "type" : "null" }
      ]
    },
    "captureId" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "isFinal" : {
      "anyOf" : [
        {
          "type" : "boolean"
        },
        { "type" : "null" }
      ]
    },
    "lineItemDetails" : {
      "anyOf" : [
        {
          "type" : "array",
          "items" : {
            "$ref" : "#/definitions/lineItemDetail"
          },
          "uniqueItems" : false
        },
        { "type" : "null" }
      ]
    },
    "omnichannelRefundSpecificInput" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/omnichannelRefundSpecificInput"
        },
        { "type" : "null" }
      ]
    },
    "operationReferences" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/operationPaymentReferences"
        },
        { "type" : "null" }
      ]
    },
    "reason" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "references" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/paymentReferences"
        },
        { "type" : "null" }
      ]
    },
    "refundRedirectPaymentMethodSpecificInput" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/refundRedirectPaymentMethodSpecificInput"
        },
        { "type" : "null" }
      ]
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "amountOfMoney" : {
      "type" : "object",
      "properties" : {
        "amount" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "currencyCode" : {
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
    "lineItemDetail" : {
      "type" : "object",
      "properties" : {
        "discountAmount" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "lineItemId" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "quantity" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "omnichannelRefundSpecificInput" : {
      "type" : "object",
      "properties" : {
        "operatorId" : {
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
    "operationPaymentReferences" : {
      "type" : "object",
      "properties" : {
        "merchantComment" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "merchantReconciliationReference" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "merchantReference" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "operationGroupReference" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "softDescriptor" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "structuredCreditorReference" : {
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
    "paymentReferences" : {
      "type" : "object",
      "properties" : {
        "merchantComment" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "merchantParameters" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "merchantReconciliationReference" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "merchantReference" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "operationGroupReference" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "softDescriptor" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "structuredCreditorReference" : {
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
    "refundRedirectPaymentMethodSpecificInput" : {
      "type" : "object",
      "properties" : {
        "refundRedirectPaymentProduct900SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/refundRedirectPaymentProduct900SpecificInput"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "refundRedirectPaymentProduct900SpecificInput" : {
      "type" : "object",
      "properties" : {
        "refundReason" : {
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

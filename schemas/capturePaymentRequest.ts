const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "amount" : {
      "anyOf" : [
        {
          "type" : "integer"
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
    "operationReferences" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/operationPaymentReferences"
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
    "shipping" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/shippingDetail"
        },
        { "type" : "null" }
      ]
    }
  },
  "additionalProperties" : false,
  "definitions" : {
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
    "shippingDetail" : {
      "type" : "object",
      "properties" : {
        "shippingCost" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "shippingCostTax" : {
          "anyOf" : [
            {
              "type" : "integer"
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

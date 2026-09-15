const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "cardSource" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/dccCardSource"
        },
        { "type" : "null" }
      ]
    },
    "transaction" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/transaction"
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
    "cardInfo" : {
      "type" : "object",
      "properties" : {
        "cardNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "paymentProductId" : {
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
    "dccCardSource" : {
      "type" : "object",
      "properties" : {
        "card" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/cardInfo"
            },
            { "type" : "null" }
          ]
        },
        "encryptedCustomerInput" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "hostedTokenizationId" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "token" : {
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
    "transaction" : {
      "type" : "object",
      "properties" : {
        "amount" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/amountOfMoney"
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

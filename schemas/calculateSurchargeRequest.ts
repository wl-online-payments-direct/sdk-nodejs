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
    "cardSource" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/cardSource"
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
    "cardSource" : {
      "type" : "object",
      "properties" : {
        "card" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/surchargeCalculationCard"
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
    "surchargeCalculationCard" : {
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
    }
  }
}

export default schema;

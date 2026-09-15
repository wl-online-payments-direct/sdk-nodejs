const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "card" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/tokenCardSpecificInput"
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
    "paymentProductId" : {
      "anyOf" : [
        {
          "type" : "integer"
        },
        { "type" : "null" }
      ]
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "card" : {
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
        "cardholderName" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "cvv" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "expiryDate" : {
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
    "tokenCardSpecificInput" : {
      "type" : "object",
      "properties" : {
        "data" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/tokenData"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "tokenData" : {
      "type" : "object",
      "properties" : {
        "card" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/card"
            },
            { "type" : "null" }
          ]
        },
        "cobrandSelectionIndicator" : {
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

const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "card" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/cardDataWithoutCvv"
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
    },
    "paymentProductId" : {
      "anyOf" : [
        {
          "type" : "integer"
        },
        { "type" : "null" }
      ]
    },
    "schemeReferenceData" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "tokenId" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "transactionLinkIdentifier" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "cardDataWithoutCvv" : {
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
    }
  }
}

export default schema;

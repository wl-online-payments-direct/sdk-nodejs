const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "card" : {
      "$ref" : "#/definitions/cardDataWithoutCvv"
    },
    "currencyCode" : {
      "type" : "string"
    },
    "paymentProductId" : {
      "type" : "integer"
    },
    "schemeReferenceData" : {
      "type" : "string"
    },
    "tokenId" : {
      "type" : "string"
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "cardDataWithoutCvv" : {
      "type" : "object",
      "properties" : {
        "cardNumber" : {
          "type" : "string"
        },
        "cardholderName" : {
          "type" : "string"
        },
        "expiryDate" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    }
  }
}

export default schema;

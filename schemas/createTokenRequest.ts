const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : "object",
  "properties" : {
    "card" : {
      "$ref" : "#/definitions/tokenCardSpecificInput"
    },
    "paymentProductId" : {
      "type" : "integer"
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "card" : {
      "type" : "object",
      "properties" : {
        "cardNumber" : {
          "type" : "string"
        },
        "cardholderName" : {
          "type" : "string"
        },
        "cvv" : {
          "type" : "string"
        },
        "expiryDate" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "tokenCardSpecificInput" : {
      "type" : "object",
      "properties" : {
        "data" : {
          "$ref" : "#/definitions/tokenData"
        }
      },
      "additionalProperties" : false
    },
    "tokenData" : {
      "type" : "object",
      "properties" : {
        "card" : {
          "$ref" : "#/definitions/card"
        },
        "cobrandSelectionIndicator" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    }
  }
}

export default schema;

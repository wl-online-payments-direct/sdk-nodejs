const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : "object",
  "properties" : {
    "amountOfMoney" : {
      "$ref" : "#/definitions/amountOfMoney"
    },
    "cardPayoutMethodSpecificInput" : {
      "$ref" : "#/definitions/cardPayoutMethodSpecificInput"
    },
    "descriptor" : {
      "type" : "string"
    },
    "feedbacks" : {
      "$ref" : "#/definitions/feedbacks"
    },
    "omnichannelPayoutSpecificInput" : {
      "$ref" : "#/definitions/omnichannelPayoutSpecificInput"
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
    "cardPayoutMethodSpecificInput" : {
      "type" : "object",
      "properties" : {
        "card" : {
          "$ref" : "#/definitions/card"
        },
        "paymentProductId" : {
          "type" : "integer"
        },
        "payoutReason" : {
          "type" : "string"
        },
        "token" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "feedbacks" : {
      "type" : "object",
      "properties" : {
        "webhookUrl" : {
          "type" : "string"
        },
        "webhooksUrls" : {
          "type" : "array",
          "items" : {
            "type" : "string"
          },
          "uniqueItems" : false
        }
      },
      "additionalProperties" : false
    },
    "omnichannelPayoutSpecificInput" : {
      "type" : "object",
      "properties" : {
        "paymentId" : {
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
        }
      },
      "additionalProperties" : false
    }
  }
}

export default schema;

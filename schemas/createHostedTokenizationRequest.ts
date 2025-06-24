const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : "object",
  "properties" : {
    "askConsumerConsent" : {
      "type" : "boolean"
    },
    "creditCardSpecificInput" : {
      "$ref" : "#/definitions/creditCardSpecificInputHostedTokenization"
    },
    "locale" : {
      "type" : "string"
    },
    "paymentProductFilters" : {
      "$ref" : "#/definitions/paymentProductFiltersHostedTokenization"
    },
    "tokens" : {
      "type" : "string"
    },
    "variant" : {
      "type" : "string"
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "creditCardSpecificInputHostedTokenization" : {
      "type" : "object",
      "properties" : {
        "ValidationRules" : {
          "$ref" : "#/definitions/creditCardValidationRulesHostedTokenization"
        },
        "paymentProductPreferredOrder" : {
          "type" : "array",
          "items" : {
            "type" : "integer"
          },
          "uniqueItems" : false
        }
      },
      "additionalProperties" : false
    },
    "creditCardValidationRulesHostedTokenization" : {
      "type" : "object",
      "properties" : {
        "cvvMandatoryForExistingToken" : {
          "type" : "boolean"
        },
        "cvvMandatoryForNewToken" : {
          "type" : "boolean"
        }
      },
      "additionalProperties" : false
    },
    "paymentProductFilterHostedTokenization" : {
      "type" : "object",
      "properties" : {
        "products" : {
          "type" : "array",
          "items" : {
            "type" : "integer"
          },
          "uniqueItems" : false
        }
      },
      "additionalProperties" : false
    },
    "paymentProductFiltersHostedTokenization" : {
      "type" : "object",
      "properties" : {
        "exclude" : {
          "$ref" : "#/definitions/paymentProductFilterHostedTokenization"
        },
        "restrictTo" : {
          "$ref" : "#/definitions/paymentProductFilterHostedTokenization"
        }
      },
      "additionalProperties" : false
    }
  }
}

export default schema;

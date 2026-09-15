const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "askConsumerConsent" : {
      "anyOf" : [
        {
          "type" : "boolean"
        },
        { "type" : "null" }
      ]
    },
    "creditCardSpecificInput" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/creditCardSpecificInputHostedTokenization"
        },
        { "type" : "null" }
      ]
    },
    "locale" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "paymentProductFilters" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/paymentProductFiltersHostedTokenization"
        },
        { "type" : "null" }
      ]
    },
    "tokens" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "variant" : {
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
    "creditCardSpecificInputHostedTokenization" : {
      "type" : "object",
      "properties" : {
        "ValidationRules" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/creditCardValidationRules"
            },
            { "type" : "null" }
          ]
        },
        "paymentProductPreferredOrder" : {
          "anyOf" : [
            {
              "type" : "array",
              "items" : {
                "type" : "integer"
              },
              "uniqueItems" : false
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "creditCardValidationRules" : {
      "type" : "object",
      "properties" : {
        "cvvMandatoryForExistingToken" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "cvvMandatoryForNewToken" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "paymentProductFilterHostedTokenization" : {
      "type" : "object",
      "properties" : {
        "products" : {
          "anyOf" : [
            {
              "type" : "array",
              "items" : {
                "type" : "integer"
              },
              "uniqueItems" : false
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "paymentProductFiltersHostedTokenization" : {
      "type" : "object",
      "properties" : {
        "exclude" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/paymentProductFilterHostedTokenization"
            },
            { "type" : "null" }
          ]
        },
        "restrictTo" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/paymentProductFilterHostedTokenization"
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

const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "locale" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "origin" : {
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
          "$ref" : "#/definitions/paymentProductFiltersHostedFields"
        },
        { "type" : "null" }
      ]
    },
    "tokens" : {
      "anyOf" : [
        {
          "type" : "array",
          "items" : {
            "type" : "string"
          },
          "uniqueItems" : false
        },
        { "type" : "null" }
      ]
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "paymentProductFiltersHostedFields" : {
      "type" : "object",
      "properties" : {
        "exclude" : {
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
        },
        "restrictTo" : {
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
    }
  }
}

export default schema;

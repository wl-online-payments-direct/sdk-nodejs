const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "filtering" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/paymentLinkOverviewFiltering"
        },
        { "type" : "null" }
      ]
    },
    "pagination" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/pagination"
        },
        { "type" : "null" }
      ]
    },
    "sorting" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/paymentLinkOverviewSorting"
        },
        { "type" : "null" }
      ]
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "pagination" : {
      "type" : "object",
      "properties" : {
        "page" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "pageSize" : {
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
    "paymentLinkOverviewFiltering" : {
      "type" : "object",
      "properties" : {
        "merchantIds" : {
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
        },
        "status" : {
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
      "additionalProperties" : false
    },
    "paymentLinkOverviewSorting" : {
      "type" : "object",
      "properties" : {
        "sortDirection" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "sortProperty" : {
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

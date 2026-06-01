const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "paymentProductSession302SpecificInput" : {
      "$ref" : "#/definitions/paymentProductSession302SpecificInput"
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "paymentProductSession302SpecificInput" : {
      "type" : "object",
      "properties" : {
        "displayName" : {
          "type" : "string"
        },
        "domainName" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    }
  }
}

export default schema;

const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
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
  "additionalProperties" : false
}

export default schema;

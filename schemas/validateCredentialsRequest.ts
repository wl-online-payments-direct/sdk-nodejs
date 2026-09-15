const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "key" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "secret" : {
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

export default schema;

const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "tokens" : {
      "type" : "array",
      "items" : {
        "type" : "string"
      },
      "uniqueItems" : false
    }
  },
  "additionalProperties" : false
}

export default schema;

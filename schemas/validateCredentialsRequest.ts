const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "key" : {
      "type" : "string"
    },
    "secret" : {
      "type" : "string"
    }
  },
  "additionalProperties" : false
}

export default schema;

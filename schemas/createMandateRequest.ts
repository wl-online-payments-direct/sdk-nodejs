const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "alias" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "customer" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/mandateCustomer"
        },
        { "type" : "null" }
      ]
    },
    "customerReference" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "language" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "recurrenceType" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "returnUrl" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "signatureType" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "uniqueMandateReference" : {
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
    "bankAccountIban" : {
      "type" : "object",
      "properties" : {
        "iban" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "mandateAddress" : {
      "type" : "object",
      "properties" : {
        "city" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "countryCode" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "houseNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "street" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "zip" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "mandateContactDetails" : {
      "type" : "object",
      "properties" : {
        "emailAddress" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "phoneNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "mandateCustomer" : {
      "type" : "object",
      "properties" : {
        "bankAccountIban" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/bankAccountIban"
            },
            { "type" : "null" }
          ]
        },
        "companyName" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "contactDetails" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/mandateContactDetails"
            },
            { "type" : "null" }
          ]
        },
        "mandateAddress" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/mandateAddress"
            },
            { "type" : "null" }
          ]
        },
        "personalInformation" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/mandatePersonalInformation"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "mandatePersonalInformation" : {
      "type" : "object",
      "properties" : {
        "name" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/mandatePersonalName"
            },
            { "type" : "null" }
          ]
        },
        "title" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "mandatePersonalName" : {
      "type" : "object",
      "properties" : {
        "firstName" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "surname" : {
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

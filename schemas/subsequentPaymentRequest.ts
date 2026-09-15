const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "omnichannelSubsequentSpecificInput" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/omnichannelSubsequentSpecificInput"
        },
        { "type" : "null" }
      ]
    },
    "order" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/order"
        },
        { "type" : "null" }
      ]
    },
    "subsequentPaymentProduct5001SpecificInput" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/subsequentPaymentProduct5001SpecificInput"
        },
        { "type" : "null" }
      ]
    },
    "subsequentcardPaymentMethodSpecificInput" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/subsequentCardPaymentMethodSpecificInput"
        },
        { "type" : "null" }
      ]
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "additionalOrderInput" : {
      "type" : "object",
      "properties" : {
        "airlineData" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/airlineData"
            },
            { "type" : "null" }
          ]
        },
        "loanRecipient" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/loanRecipient"
            },
            { "type" : "null" }
          ]
        },
        "lodgingData" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/lodgingData"
            },
            { "type" : "null" }
          ]
        },
        "typeInformation" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/orderTypeInformation"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "address" : {
      "type" : "object",
      "properties" : {
        "additionalInfo" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
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
        "state" : {
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
    "addressPersonal" : {
      "type" : "object",
      "properties" : {
        "additionalInfo" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "city" : {
          "anyOf" : [
            {
              "type" : "string"
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
        "name" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/personalName"
            },
            { "type" : "null" }
          ]
        },
        "state" : {
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
    "airlineData" : {
      "type" : "object",
      "properties" : {
        "agentNumericCode" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "code" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "flightDate" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "flightIndicator" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "flightLegs" : {
          "anyOf" : [
            {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/airlineFlightLeg"
              },
              "uniqueItems" : false
            },
            { "type" : "null" }
          ]
        },
        "invoiceNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "isETicket" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "isRestrictedTicket" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "isThirdParty" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "issueDate" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "merchantCustomerId" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "name" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "passengerName" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "passengers" : {
          "anyOf" : [
            {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/airlinePassenger"
              },
              "uniqueItems" : false
            },
            { "type" : "null" }
          ]
        },
        "placeOfIssue" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "pnr" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "pointOfSale" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "posCityCode" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "ticketCurrency" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "ticketDeliveryMethod" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "ticketNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "totalFare" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "totalFee" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "totalTaxes" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "travelAgencyName" : {
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
    "airlineFlightLeg" : {
      "type" : "object",
      "properties" : {
        "airlineClass" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "arrivalAirport" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "arrivalTime" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "carrierCode" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "conjunctionTicket" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "couponNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "date" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "departureTime" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "endorsementOrRestriction" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "exchangeTicket" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "fare" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "fareBasis" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "fee" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "flightCode" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "flightNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "legFare" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "number" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "originAirport" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "passengerClass" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "stopoverCode" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "taxes" : {
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
    "airlinePassenger" : {
      "type" : "object",
      "properties" : {
        "airlineLoyaltyStatus" : {
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
        "dateOfBirth" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "firstName" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "passengerType" : {
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
        },
        "surnamePrefix" : {
          "anyOf" : [
            {
              "type" : "string"
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
    "amountBreakdown" : {
      "type" : "object",
      "properties" : {
        "amount" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "type" : {
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
    "amountOfMoney" : {
      "type" : "object",
      "properties" : {
        "amount" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "currencyCode" : {
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
    "autoCapture" : {
      "type" : "object",
      "properties" : {
        "delayInMinutes" : {
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
    "browserData" : {
      "type" : "object",
      "properties" : {
        "colorDepth" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "javaEnabled" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "javaScriptEnabled" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "screenHeight" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "screenWidth" : {
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
    "companyInformation" : {
      "type" : "object",
      "properties" : {
        "name" : {
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
    "contactDetails" : {
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
        "faxNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "mobilePhoneNumber" : {
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
        },
        "workPhoneNumber" : {
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
    "customer" : {
      "type" : "object",
      "properties" : {
        "account" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/customerAccount"
            },
            { "type" : "null" }
          ]
        },
        "accountType" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "billingAddress" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/address"
            },
            { "type" : "null" }
          ]
        },
        "companyInformation" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/companyInformation"
            },
            { "type" : "null" }
          ]
        },
        "contactDetails" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/contactDetails"
            },
            { "type" : "null" }
          ]
        },
        "device" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/customerDevice"
            },
            { "type" : "null" }
          ]
        },
        "fiscalNumber" : {
          "anyOf" : [
            {
              "type" : "string"
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
        "merchantCustomerId" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "personalInformation" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/personalInformation"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "customerAccount" : {
      "type" : "object",
      "properties" : {
        "authentication" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/customerAccountAuthentication"
            },
            { "type" : "null" }
          ]
        },
        "changeDate" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "changedDuringCheckout" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "createDate" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "hadSuspiciousActivity" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "passwordChangeDate" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "passwordChangedDuringCheckout" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "paymentAccountOnFile" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/paymentAccountOnFile"
            },
            { "type" : "null" }
          ]
        },
        "paymentActivity" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/customerPaymentActivity"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "customerAccountAuthentication" : {
      "type" : "object",
      "properties" : {
        "data" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "method" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "utcTimestamp" : {
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
    "customerDevice" : {
      "type" : "object",
      "properties" : {
        "acceptHeader" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "browserData" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/browserData"
            },
            { "type" : "null" }
          ]
        },
        "deviceFingerprint" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "ipAddress" : {
          "anyOf" : [
            {
              "type" : "string"
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
        "timezoneOffsetUtcMinutes" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "userAgent" : {
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
    "customerPaymentActivity" : {
      "type" : "object",
      "properties" : {
        "numberOfPaymentAttemptsLast24Hours" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "numberOfPaymentAttemptsLastYear" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "numberOfPurchasesLast6Months" : {
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
    "discount" : {
      "type" : "object",
      "properties" : {
        "amount" : {
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
    "giftCardPurchase" : {
      "type" : "object",
      "properties" : {
        "amountOfMoney" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/amountOfMoney"
            },
            { "type" : "null" }
          ]
        },
        "numberOfGiftCards" : {
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
    "lineItem" : {
      "type" : "object",
      "properties" : {
        "amountOfMoney" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/amountOfMoney"
            },
            { "type" : "null" }
          ]
        },
        "invoiceData" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/lineItemInvoiceData"
            },
            { "type" : "null" }
          ]
        },
        "orderLineDetails" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/orderLineDetails"
            },
            { "type" : "null" }
          ]
        },
        "otherDetails" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/otherDetails"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "lineItemInvoiceData" : {
      "type" : "object",
      "properties" : {
        "description" : {
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
    "loanRecipient" : {
      "type" : "object",
      "properties" : {
        "accountNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "dateOfBirth" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "partialPan" : {
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
    "lodgingData" : {
      "type" : "object",
      "properties" : {
        "checkInDate" : {
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
    "marketPlace" : {
      "type" : "object",
      "properties" : {
        "retailerCountry" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "retailerName" : {
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
    "omnichannelSubsequentSpecificInput" : {
      "type" : "object",
      "properties" : {
        "operatorId" : {
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
    "order" : {
      "type" : "object",
      "properties" : {
        "additionalInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/additionalOrderInput"
            },
            { "type" : "null" }
          ]
        },
        "amountOfMoney" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/amountOfMoney"
            },
            { "type" : "null" }
          ]
        },
        "customer" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/customer"
            },
            { "type" : "null" }
          ]
        },
        "discount" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/discount"
            },
            { "type" : "null" }
          ]
        },
        "references" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/orderReferences"
            },
            { "type" : "null" }
          ]
        },
        "shipping" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/shipping"
            },
            { "type" : "null" }
          ]
        },
        "shoppingCart" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/shoppingCart"
            },
            { "type" : "null" }
          ]
        },
        "surchargeSpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/surchargeSpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "taxPercentage" : {
          "anyOf" : [
            {
              "type" : "number"
            },
            { "type" : "null" }
          ]
        },
        "totalTaxAmount" : {
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
    "orderLineDetails" : {
      "type" : "object",
      "properties" : {
        "discountAmount" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "productBrand" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "productCode" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "productName" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "productPrice" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "productType" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "quantity" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "taxAmount" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "taxPercentage" : {
          "anyOf" : [
            {
              "type" : "number"
            },
            { "type" : "null" }
          ]
        },
        "unit" : {
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
    "orderReferences" : {
      "type" : "object",
      "properties" : {
        "descriptor" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "merchantComment" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "merchantParameters" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "merchantReconciliationReference" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "merchantReference" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "operationGroupReference" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "softDescriptor" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "structuredCreditorReference" : {
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
    "orderTypeInformation" : {
      "type" : "object",
      "properties" : {
        "purchaseType" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "transactionType" : {
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
    "otherDetails" : {
      "type" : "object",
      "properties" : {
        "metaData" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "travelData" : {
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
    "paymentAccountOnFile" : {
      "type" : "object",
      "properties" : {
        "createDate" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "numberOfCardOnFileCreationAttemptsLast24Hours" : {
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
    "personalInformation" : {
      "type" : "object",
      "properties" : {
        "dateOfBirth" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "gender" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "name" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/personalName"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "personalName" : {
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
    "shipping" : {
      "type" : "object",
      "properties" : {
        "address" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/addressPersonal"
            },
            { "type" : "null" }
          ]
        },
        "addressIndicator" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "emailAddress" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "firstUsageDate" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "isFirstUsage" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "method" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/shippingMethod"
            },
            { "type" : "null" }
          ]
        },
        "shippingCost" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "shippingCostTax" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "type" : {
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
    "shippingMethod" : {
      "type" : "object",
      "properties" : {
        "details" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "name" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "speed" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "type" : {
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
    "shoppingCart" : {
      "type" : "object",
      "properties" : {
        "amountBreakdown" : {
          "anyOf" : [
            {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/amountBreakdown"
              },
              "uniqueItems" : false
            },
            { "type" : "null" }
          ]
        },
        "giftCardPurchase" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/giftCardPurchase"
            },
            { "type" : "null" }
          ]
        },
        "isPreOrder" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "items" : {
          "anyOf" : [
            {
              "type" : "array",
              "items" : {
                "$ref" : "#/definitions/lineItem"
              },
              "uniqueItems" : false
            },
            { "type" : "null" }
          ]
        },
        "preOrderItemAvailabilityDate" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "reOrderIndicator" : {
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
    "subsequentCardPaymentMethodSpecificInput" : {
      "type" : "object",
      "properties" : {
        "authorizationMode" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "autoCapture" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/autoCapture"
            },
            { "type" : "null" }
          ]
        },
        "marketPlace" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/marketPlace"
            },
            { "type" : "null" }
          ]
        },
        "paymentNumber" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "schemeReferenceData" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "subsequentType" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "token" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "transactionChannel" : {
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
    "subsequentPaymentProduct5001SpecificInput" : {
      "type" : "object",
      "properties" : {
        "subsequentType" : {
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
    "surchargeSpecificInput" : {
      "type" : "object",
      "properties" : {
        "mode" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "surchargeAmount" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/amountOfMoney"
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

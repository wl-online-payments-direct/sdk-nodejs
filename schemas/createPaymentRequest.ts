const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "cardPaymentMethodSpecificInput" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/cardPaymentMethodSpecificInput"
        },
        { "type" : "null" }
      ]
    },
    "encryptedCustomerInput" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "feedbacks" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/feedbacks"
        },
        { "type" : "null" }
      ]
    },
    "fraudFields" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/fraudFields"
        },
        { "type" : "null" }
      ]
    },
    "hostedFieldsSessionId" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "hostedTokenizationId" : {
      "anyOf" : [
        {
          "type" : "string"
        },
        { "type" : "null" }
      ]
    },
    "mobilePaymentMethodSpecificInput" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/mobilePaymentMethodSpecificInput"
        },
        { "type" : "null" }
      ]
    },
    "omnichannelPaymentSpecificInput" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/omnichannelPaymentSpecificInput"
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
    "redirectPaymentMethodSpecificInput" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/redirectPaymentMethodSpecificInput"
        },
        { "type" : "null" }
      ]
    },
    "sepaDirectDebitPaymentMethodSpecificInput" : {
      "anyOf" : [
        {
          "$ref" : "#/definitions/sepaDirectDebitPaymentMethodSpecificInput"
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
    "applePayLineItem" : {
      "type" : "object",
      "properties" : {
        "amount" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "label" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "paymentTiming" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "recurringPaymentEndDate" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "recurringPaymentIntervalCount" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "recurringPaymentIntervalUnit" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "recurringPaymentStartDate" : {
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
    "applePayRecurringPaymentRequest" : {
      "type" : "object",
      "properties" : {
        "billingAgreement" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "managementUrl" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "paymentDescription" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "regularBilling" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/applePayLineItem"
            },
            { "type" : "null" }
          ]
        },
        "trialBilling" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/applePayLineItem"
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
    "card" : {
      "type" : "object",
      "properties" : {
        "cardNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "cardholderName" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "cvv" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "expiryDate" : {
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
    "cardPaymentMethodSpecificInput" : {
      "type" : "object",
      "properties" : {
        "allowDynamicLinking" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
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
        "card" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/card"
            },
            { "type" : "null" }
          ]
        },
        "cardOnFileRecurringExpiration" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "cardOnFileRecurringFrequency" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "cobrandSelectionIndicator" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "currencyConversion" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/currencyConversionInput"
            },
            { "type" : "null" }
          ]
        },
        "initialSchemeTransactionId" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "isRecurring" : {
          "anyOf" : [
            {
              "type" : "boolean"
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
        "multiplePaymentInformation" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/multiplePaymentInformation"
            },
            { "type" : "null" }
          ]
        },
        "networkTokenData" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/networkTokenData"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct130SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/paymentProduct130SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct3012SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/paymentProduct3012SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct3013SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/paymentProduct3013SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct3208SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/paymentProduct3208SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct3209SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/paymentProduct3209SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct5002SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/paymentProduct5002SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProductId" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "recurring" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/cardRecurrenceDetails"
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
        "schemeReferenceData" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "skipAuthentication" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "subMerchant" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/subMerchant"
            },
            { "type" : "null" }
          ]
        },
        "threeDSecure" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/threeDSecure"
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
        "tokenize" : {
          "anyOf" : [
            {
              "type" : "boolean"
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
        },
        "unscheduledCardOnFileRequestor" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "unscheduledCardOnFileSequenceIndicator" : {
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
    "cardRecurrenceDetails" : {
      "type" : "object",
      "properties" : {
        "recurringPaymentSequenceIndicator" : {
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
    "createMandateWithReturnUrl" : {
      "type" : "object",
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
      "additionalProperties" : false
    },
    "currencyConversionInput" : {
      "type" : "object",
      "properties" : {
        "acceptedByUser" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "dccSessionId" : {
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
    "customerBankAccount" : {
      "type" : "object",
      "properties" : {
        "accountHolderName" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "bic" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
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
    "decryptedPaymentData" : {
      "type" : "object",
      "properties" : {
        "cardholderName" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "cryptogram" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "dpan" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "eci" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "expiryDate" : {
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
    "externalCardholderAuthenticationData" : {
      "type" : "object",
      "properties" : {
        "acsTransactionId" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "appliedExemption" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "cavv" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "cavvAlgorithm" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "directoryServerTransactionId" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "eci" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "flow" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "schemeRiskScore" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "threeDSecureVersion" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "xid" : {
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
    "feedbacks" : {
      "type" : "object",
      "properties" : {
        "webhookUrl" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "webhooksUrls" : {
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
    "fraudFields" : {
      "type" : "object",
      "properties" : {
        "blackListData" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "customerIpAddress" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "productCategories" : {
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
    "gPayThreeDSecure" : {
      "type" : "object",
      "properties" : {
        "challengeCanvasSize" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "challengeIndicator" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "exemptionRequest" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "redirectionData" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectionData"
            },
            { "type" : "null" }
          ]
        },
        "skipAuthentication" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "skipSoftDecline" : {
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
    "mobilePaymentMethodSpecificInput" : {
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
        "decryptedPaymentData" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/decryptedPaymentData"
            },
            { "type" : "null" }
          ]
        },
        "encryptedPaymentData" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "ephemeralKey" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct302SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/mobilePaymentProduct302SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct320SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/mobilePaymentProduct320SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProductId" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "publicKeyHash" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "requiresApproval" : {
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
    "mobilePaymentProduct302SpecificInput" : {
      "type" : "object",
      "properties" : {
        "applePayRecurringPaymentRequest" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/applePayRecurringPaymentRequest"
            },
            { "type" : "null" }
          ]
        },
        "isRecurring" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "recurring" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/product302Recurring"
            },
            { "type" : "null" }
          ]
        },
        "tokenize" : {
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
    "mobilePaymentProduct320SpecificInput" : {
      "type" : "object",
      "properties" : {
        "isRecurring" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "recurring" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/product320Recurring"
            },
            { "type" : "null" }
          ]
        },
        "threeDSecure" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/gPayThreeDSecure"
            },
            { "type" : "null" }
          ]
        },
        "tokenize" : {
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
    "multiplePaymentInformation" : {
      "type" : "object",
      "properties" : {
        "paymentPattern" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "totalNumberOfPayments" : {
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
    "networkTokenData" : {
      "type" : "object",
      "properties" : {
        "cardholderName" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "cryptogram" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "eci" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "networkToken" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "schemeTokenRequestorId" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "tokenExpiryDate" : {
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
    "omnichannelPaymentSpecificInput" : {
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
    "paymentProduct130SpecificInput" : {
      "type" : "object",
      "properties" : {
        "threeDSecure" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/paymentProduct130SpecificThreeDSecure"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "paymentProduct130SpecificThreeDSecure" : {
      "type" : "object",
      "properties" : {
        "acquirerExemption" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "merchantScore" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "numberOfItems" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "usecase" : {
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
    "paymentProduct3012SpecificInput" : {
      "type" : "object",
      "properties" : {
        "forceAuthentication" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "isDeferredPayment" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "isWipTransaction" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "wipMerchantAuthenticationMethod" : {
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
    "paymentProduct3013SpecificInput" : {
      "type" : "object",
      "properties" : {
        "marketNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "purchasingBuyerReference1" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "purchasingBuyerReference2" : {
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
    "paymentProduct3208SpecificInput" : {
      "type" : "object",
      "properties" : {
        "merchantFinanceCode" : {
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
    "paymentProduct3209SpecificInput" : {
      "type" : "object",
      "properties" : {
        "merchantFinanceCode" : {
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
    "paymentProduct5002SpecificInput" : {
      "type" : "object",
      "properties" : {
        "checkoutResponseSignature" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "creditCardBrand" : {
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
    "paymentProduct5704AutoCapture" : {
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
    "product302Recurring" : {
      "type" : "object",
      "properties" : {
        "recurringPaymentSequenceIndicator" : {
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
    "product320Recurring" : {
      "type" : "object",
      "properties" : {
        "recurringPaymentSequenceIndicator" : {
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
    "redirectPaymentMethodSpecificInput" : {
      "type" : "object",
      "properties" : {
        "paymentOption" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct11SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct11SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct3103SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct3103SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct3112SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct3112SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct3116SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct3116SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct3203SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct3203SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct3204SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct3204SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct3302SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct3302SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct3306SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct3306SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct3307SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct3307SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct5001SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct5001SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct5300SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct5300SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct5301SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct5301SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct5402SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct5402SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct5403SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct5403SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct5406SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct5406SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct5407SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct5407SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct5408SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct5408SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct5410SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct5410SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct5412SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct5412SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct5601SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct5601SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct809SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct809SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct840SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct840SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProduct900SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectPaymentProduct900SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProductId" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "redirectionData" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectionData"
            },
            { "type" : "null" }
          ]
        },
        "requiresApproval" : {
          "anyOf" : [
            {
              "type" : "boolean"
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
        "tokenize" : {
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
    "redirectPaymentProduct11SpecificInput" : {
      "type" : "object",
      "properties" : {
        "skipEmailValidation" : {
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
    "redirectPaymentProduct3103SpecificInput" : {
      "type" : "object",
      "properties" : {
        "completeRemainingPaymentAmount" : {
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
    "redirectPaymentProduct3112SpecificInput" : {
      "type" : "object",
      "properties" : {
        "completeRemainingPaymentAmount" : {
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
    "redirectPaymentProduct3116SpecificInput" : {
      "type" : "object",
      "properties" : {
        "completeRemainingPaymentAmount" : {
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
    "redirectPaymentProduct3203SpecificInput" : {
      "type" : "object",
      "properties" : {
        "checkoutType" : {
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
    "redirectPaymentProduct3204SpecificInput" : {
      "type" : "object",
      "properties" : {
        "aliasLabel" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "blikCode" : {
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
    "redirectPaymentProduct3302SpecificInput" : {
      "type" : "object",
      "properties" : {
        "organizationEntityType" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "organizationRegistrationId" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "vatId" : {
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
    "redirectPaymentProduct3306SpecificInput" : {
      "type" : "object",
      "properties" : {
        "extraMerchantData" : {
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
    "redirectPaymentProduct3307SpecificInput" : {
      "type" : "object",
      "properties" : {
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct5001SpecificInput" : {
      "type" : "object",
      "properties" : {
        "exemptionRequest" : {
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
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct5300SpecificInput" : {
      "type" : "object",
      "properties" : {
        "birthCity" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "birthCountry" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "birthZipCode" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "channel" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "loyaltyCardNumber" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "secondInstallmentPaymentDate" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "sessionDuration" : {
          "anyOf" : [
            {
              "type" : "integer"
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
        },
        "transactionExpirationDateTime" : {
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
    "redirectPaymentProduct5301SpecificInput" : {
      "type" : "object",
      "properties" : {
        "paymentMethodType" : {
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
    "redirectPaymentProduct5402SpecificInput" : {
      "type" : "object",
      "properties" : {
        "completeRemainingPaymentAmount" : {
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
    "redirectPaymentProduct5403SpecificInput" : {
      "type" : "object",
      "properties" : {
        "completeRemainingPaymentAmount" : {
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
    "redirectPaymentProduct5406SpecificInput" : {
      "type" : "object",
      "properties" : {
        "customerBankAccount" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/customerBankAccount"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct5407SpecificInput" : {
      "type" : "object",
      "properties" : {
        "paymentProduct5704AutoCapture" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/paymentProduct5704AutoCapture"
            },
            { "type" : "null" }
          ]
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct5408SpecificInput" : {
      "type" : "object",
      "properties" : {
        "customerBankAccount" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/customerBankAccount"
            },
            { "type" : "null" }
          ]
        },
        "instantPaymentOnly" : {
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
    "redirectPaymentProduct5410SpecificInput" : {
      "type" : "object",
      "properties" : {
        "secondInstallmentPaymentDate" : {
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
    "redirectPaymentProduct5412SpecificInput" : {
      "type" : "object",
      "properties" : {
        "adjustableAmount" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "beneficiaryId" : {
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
    "redirectPaymentProduct5601SpecificInput" : {
      "type" : "object",
      "properties" : {
        "completeRemainingPaymentAmount" : {
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
    "redirectPaymentProduct809SpecificInput" : {
      "type" : "object",
      "properties" : {
        "issuerId" : {
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
    "redirectPaymentProduct840SpecificInput" : {
      "type" : "object",
      "properties" : {
        "JavaScriptSdkFlow" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "addressSelectionAtPayPal" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "custom" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "payLater" : {
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
    "redirectPaymentProduct900SpecificInput" : {
      "type" : "object",
      "properties" : {
        "captureTrigger" : {
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
    "redirectionData" : {
      "type" : "object",
      "properties" : {
        "returnUrl" : {
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
    "sepaDirectDebitPaymentMethodSpecificInput" : {
      "type" : "object",
      "properties" : {
        "paymentProduct771SpecificInput" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/sepaDirectDebitPaymentProduct771SpecificInput"
            },
            { "type" : "null" }
          ]
        },
        "paymentProductId" : {
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
    "sepaDirectDebitPaymentProduct771SpecificInput" : {
      "type" : "object",
      "properties" : {
        "existingUniqueMandateReference" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "mandate" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/createMandateWithReturnUrl"
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
    "subMerchant" : {
      "type" : "object",
      "properties" : {
        "address" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/address"
            },
            { "type" : "null" }
          ]
        },
        "companyIdentificationNumber" : {
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
        "merchantCategoryCode" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "merchantId" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "website" : {
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
    },
    "threeDSecure" : {
      "type" : "object",
      "properties" : {
        "authenticationAmount" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "challengeCanvasSize" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "challengeIndicator" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "deviceChannel" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "exemptionRequest" : {
          "anyOf" : [
            {
              "type" : "string"
            },
            { "type" : "null" }
          ]
        },
        "externalCardholderAuthenticationData" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/externalCardholderAuthenticationData"
            },
            { "type" : "null" }
          ]
        },
        "merchantFraudRate" : {
          "anyOf" : [
            {
              "type" : "integer"
            },
            { "type" : "null" }
          ]
        },
        "priorThreeDSecureData" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/threeDSecureData"
            },
            { "type" : "null" }
          ]
        },
        "redirectionData" : {
          "anyOf" : [
            {
              "$ref" : "#/definitions/redirectionData"
            },
            { "type" : "null" }
          ]
        },
        "secureCorporatePayment" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "skipAuthentication" : {
          "anyOf" : [
            {
              "type" : "boolean"
            },
            { "type" : "null" }
          ]
        },
        "skipSoftDecline" : {
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
    "threeDSecureData" : {
      "type" : "object",
      "properties" : {
        "acsTransactionId" : {
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
    }
  }
}

export default schema;

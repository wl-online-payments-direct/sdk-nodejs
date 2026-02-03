const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "omnichannelSubsequentSpecificInput" : {
      "$ref" : "#/definitions/omnichannelSubsequentSpecificInput"
    },
    "order" : {
      "$ref" : "#/definitions/order"
    },
    "subsequentPaymentProduct5001SpecificInput" : {
      "$ref" : "#/definitions/subsequentPaymentProduct5001SpecificInput"
    },
    "subsequentcardPaymentMethodSpecificInput" : {
      "$ref" : "#/definitions/subsequentCardPaymentMethodSpecificInput"
    }
  },
  "additionalProperties" : false,
  "definitions" : {
    "additionalOrderInput" : {
      "type" : "object",
      "properties" : {
        "airlineData" : {
          "$ref" : "#/definitions/airlineData"
        },
        "loanRecipient" : {
          "$ref" : "#/definitions/loanRecipient"
        },
        "lodgingData" : {
          "$ref" : "#/definitions/lodgingData"
        },
        "typeInformation" : {
          "$ref" : "#/definitions/orderTypeInformation"
        }
      },
      "additionalProperties" : false
    },
    "address" : {
      "type" : "object",
      "properties" : {
        "additionalInfo" : {
          "type" : "string"
        },
        "city" : {
          "type" : "string"
        },
        "countryCode" : {
          "type" : "string"
        },
        "houseNumber" : {
          "type" : "string"
        },
        "state" : {
          "type" : "string"
        },
        "street" : {
          "type" : "string"
        },
        "zip" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "addressPersonal" : {
      "type" : "object",
      "properties" : {
        "additionalInfo" : {
          "type" : "string"
        },
        "city" : {
          "type" : "string"
        },
        "companyName" : {
          "type" : "string"
        },
        "countryCode" : {
          "type" : "string"
        },
        "houseNumber" : {
          "type" : "string"
        },
        "name" : {
          "$ref" : "#/definitions/personalName"
        },
        "state" : {
          "type" : "string"
        },
        "street" : {
          "type" : "string"
        },
        "zip" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "airlineData" : {
      "type" : "object",
      "properties" : {
        "agentNumericCode" : {
          "type" : "string"
        },
        "code" : {
          "type" : "string"
        },
        "flightDate" : {
          "type" : "string"
        },
        "flightIndicator" : {
          "type" : "string"
        },
        "flightLegs" : {
          "type" : "array",
          "items" : {
            "$ref" : "#/definitions/airlineFlightLeg"
          },
          "uniqueItems" : false
        },
        "invoiceNumber" : {
          "type" : "string"
        },
        "isETicket" : {
          "type" : "boolean"
        },
        "isRestrictedTicket" : {
          "type" : "boolean"
        },
        "isThirdParty" : {
          "type" : "boolean"
        },
        "issueDate" : {
          "type" : "string"
        },
        "merchantCustomerId" : {
          "type" : "string"
        },
        "name" : {
          "type" : "string"
        },
        "passengerName" : {
          "type" : "string"
        },
        "passengers" : {
          "type" : "array",
          "items" : {
            "$ref" : "#/definitions/airlinePassenger"
          },
          "uniqueItems" : false
        },
        "placeOfIssue" : {
          "type" : "string"
        },
        "pnr" : {
          "type" : "string"
        },
        "pointOfSale" : {
          "type" : "string"
        },
        "posCityCode" : {
          "type" : "string"
        },
        "ticketCurrency" : {
          "type" : "string"
        },
        "ticketDeliveryMethod" : {
          "type" : "string"
        },
        "ticketNumber" : {
          "type" : "string"
        },
        "totalFare" : {
          "type" : "integer"
        },
        "totalFee" : {
          "type" : "integer"
        },
        "totalTaxes" : {
          "type" : "integer"
        },
        "travelAgencyName" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "airlineFlightLeg" : {
      "type" : "object",
      "properties" : {
        "airlineClass" : {
          "type" : "string"
        },
        "arrivalAirport" : {
          "type" : "string"
        },
        "arrivalTime" : {
          "type" : "string"
        },
        "carrierCode" : {
          "type" : "string"
        },
        "conjunctionTicket" : {
          "type" : "string"
        },
        "couponNumber" : {
          "type" : "string"
        },
        "date" : {
          "type" : "string"
        },
        "departureTime" : {
          "type" : "string"
        },
        "endorsementOrRestriction" : {
          "type" : "string"
        },
        "exchangeTicket" : {
          "type" : "string"
        },
        "fare" : {
          "type" : "string"
        },
        "fareBasis" : {
          "type" : "string"
        },
        "fee" : {
          "type" : "integer"
        },
        "flightNumber" : {
          "type" : "string"
        },
        "legFare" : {
          "type" : "integer"
        },
        "number" : {
          "type" : "integer"
        },
        "originAirport" : {
          "type" : "string"
        },
        "passengerClass" : {
          "type" : "string"
        },
        "stopoverCode" : {
          "type" : "string"
        },
        "taxes" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    },
    "airlinePassenger" : {
      "type" : "object",
      "properties" : {
        "airlineLoyaltyStatus" : {
          "type" : "string"
        },
        "firstName" : {
          "type" : "string"
        },
        "passengerType" : {
          "type" : "string"
        },
        "surname" : {
          "type" : "string"
        },
        "surnamePrefix" : {
          "type" : "string"
        },
        "title" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "amountBreakdown" : {
      "type" : "object",
      "properties" : {
        "amount" : {
          "type" : "integer"
        },
        "type" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "amountOfMoney" : {
      "type" : "object",
      "properties" : {
        "amount" : {
          "type" : "integer"
        },
        "currencyCode" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "browserData" : {
      "type" : "object",
      "properties" : {
        "colorDepth" : {
          "type" : "integer"
        },
        "javaEnabled" : {
          "type" : "boolean"
        },
        "javaScriptEnabled" : {
          "type" : "boolean"
        },
        "screenHeight" : {
          "type" : "string"
        },
        "screenWidth" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "companyInformation" : {
      "type" : "object",
      "properties" : {
        "name" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "contactDetails" : {
      "type" : "object",
      "properties" : {
        "emailAddress" : {
          "type" : "string"
        },
        "faxNumber" : {
          "type" : "string"
        },
        "mobilePhoneNumber" : {
          "type" : "string"
        },
        "phoneNumber" : {
          "type" : "string"
        },
        "workPhoneNumber" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "customer" : {
      "type" : "object",
      "properties" : {
        "account" : {
          "$ref" : "#/definitions/customerAccount"
        },
        "accountType" : {
          "type" : "string"
        },
        "billingAddress" : {
          "$ref" : "#/definitions/address"
        },
        "companyInformation" : {
          "$ref" : "#/definitions/companyInformation"
        },
        "contactDetails" : {
          "$ref" : "#/definitions/contactDetails"
        },
        "device" : {
          "$ref" : "#/definitions/customerDevice"
        },
        "fiscalNumber" : {
          "type" : "string"
        },
        "locale" : {
          "type" : "string"
        },
        "merchantCustomerId" : {
          "type" : "string"
        },
        "personalInformation" : {
          "$ref" : "#/definitions/personalInformation"
        }
      },
      "additionalProperties" : false
    },
    "customerAccount" : {
      "type" : "object",
      "properties" : {
        "authentication" : {
          "$ref" : "#/definitions/customerAccountAuthentication"
        },
        "changeDate" : {
          "type" : "string"
        },
        "changedDuringCheckout" : {
          "type" : "boolean"
        },
        "createDate" : {
          "type" : "string"
        },
        "hadSuspiciousActivity" : {
          "type" : "boolean"
        },
        "passwordChangeDate" : {
          "type" : "string"
        },
        "passwordChangedDuringCheckout" : {
          "type" : "boolean"
        },
        "paymentAccountOnFile" : {
          "$ref" : "#/definitions/paymentAccountOnFile"
        },
        "paymentActivity" : {
          "$ref" : "#/definitions/customerPaymentActivity"
        }
      },
      "additionalProperties" : false
    },
    "customerAccountAuthentication" : {
      "type" : "object",
      "properties" : {
        "data" : {
          "type" : "string"
        },
        "method" : {
          "type" : "string"
        },
        "utcTimestamp" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "customerDevice" : {
      "type" : "object",
      "properties" : {
        "acceptHeader" : {
          "type" : "string"
        },
        "browserData" : {
          "$ref" : "#/definitions/browserData"
        },
        "deviceFingerprint" : {
          "type" : "string"
        },
        "ipAddress" : {
          "type" : "string"
        },
        "locale" : {
          "type" : "string"
        },
        "timezoneOffsetUtcMinutes" : {
          "type" : "string"
        },
        "userAgent" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "customerPaymentActivity" : {
      "type" : "object",
      "properties" : {
        "numberOfPaymentAttemptsLast24Hours" : {
          "type" : "integer"
        },
        "numberOfPaymentAttemptsLastYear" : {
          "type" : "integer"
        },
        "numberOfPurchasesLast6Months" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    },
    "discount" : {
      "type" : "object",
      "properties" : {
        "amount" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    },
    "giftCardPurchase" : {
      "type" : "object",
      "properties" : {
        "amountOfMoney" : {
          "$ref" : "#/definitions/amountOfMoney"
        },
        "numberOfGiftCards" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    },
    "lineItem" : {
      "type" : "object",
      "properties" : {
        "amountOfMoney" : {
          "$ref" : "#/definitions/amountOfMoney"
        },
        "invoiceData" : {
          "$ref" : "#/definitions/lineItemInvoiceData"
        },
        "orderLineDetails" : {
          "$ref" : "#/definitions/orderLineDetails"
        },
        "otherDetails" : {
          "$ref" : "#/definitions/otherDetails"
        }
      },
      "additionalProperties" : false
    },
    "lineItemInvoiceData" : {
      "type" : "object",
      "properties" : {
        "description" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "loanRecipient" : {
      "type" : "object",
      "properties" : {
        "accountNumber" : {
          "type" : "string"
        },
        "dateOfBirth" : {
          "type" : "string"
        },
        "partialPan" : {
          "type" : "string"
        },
        "surname" : {
          "type" : "string"
        },
        "zip" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "lodgingData" : {
      "type" : "object",
      "properties" : {
        "checkInDate" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "marketPlace" : {
      "type" : "object",
      "properties" : {
        "retailerCountry" : {
          "type" : "string"
        },
        "retailerName" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "omnichannelSubsequentSpecificInput" : {
      "type" : "object",
      "properties" : {
        "operatorId" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "order" : {
      "type" : "object",
      "properties" : {
        "additionalInput" : {
          "$ref" : "#/definitions/additionalOrderInput"
        },
        "amountOfMoney" : {
          "$ref" : "#/definitions/amountOfMoney"
        },
        "customer" : {
          "$ref" : "#/definitions/customer"
        },
        "discount" : {
          "$ref" : "#/definitions/discount"
        },
        "references" : {
          "$ref" : "#/definitions/orderReferences"
        },
        "shipping" : {
          "$ref" : "#/definitions/shipping"
        },
        "shoppingCart" : {
          "$ref" : "#/definitions/shoppingCart"
        },
        "surchargeSpecificInput" : {
          "$ref" : "#/definitions/surchargeSpecificInput"
        },
        "totalTaxAmount" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    },
    "orderLineDetails" : {
      "type" : "object",
      "properties" : {
        "discountAmount" : {
          "type" : "integer"
        },
        "productBrand" : {
          "type" : "string"
        },
        "productCode" : {
          "type" : "string"
        },
        "productName" : {
          "type" : "string"
        },
        "productPrice" : {
          "type" : "integer"
        },
        "productType" : {
          "type" : "string"
        },
        "quantity" : {
          "type" : "integer"
        },
        "taxAmount" : {
          "type" : "integer"
        },
        "unit" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "orderReferences" : {
      "type" : "object",
      "properties" : {
        "descriptor" : {
          "type" : "string"
        },
        "merchantParameters" : {
          "type" : "string"
        },
        "merchantReference" : {
          "type" : "string"
        },
        "operationGroupReference" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "orderTypeInformation" : {
      "type" : "object",
      "properties" : {
        "purchaseType" : {
          "type" : "string"
        },
        "transactionType" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "otherDetails" : {
      "type" : "object",
      "properties" : {
        "metaData" : {
          "type" : "string"
        },
        "travelData" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "paymentAccountOnFile" : {
      "type" : "object",
      "properties" : {
        "createDate" : {
          "type" : "string"
        },
        "numberOfCardOnFileCreationAttemptsLast24Hours" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    },
    "personalInformation" : {
      "type" : "object",
      "properties" : {
        "dateOfBirth" : {
          "type" : "string"
        },
        "gender" : {
          "type" : "string"
        },
        "name" : {
          "$ref" : "#/definitions/personalName"
        }
      },
      "additionalProperties" : false
    },
    "personalName" : {
      "type" : "object",
      "properties" : {
        "firstName" : {
          "type" : "string"
        },
        "surname" : {
          "type" : "string"
        },
        "title" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "shipping" : {
      "type" : "object",
      "properties" : {
        "address" : {
          "$ref" : "#/definitions/addressPersonal"
        },
        "addressIndicator" : {
          "type" : "string"
        },
        "emailAddress" : {
          "type" : "string"
        },
        "firstUsageDate" : {
          "type" : "string"
        },
        "isFirstUsage" : {
          "type" : "boolean"
        },
        "method" : {
          "$ref" : "#/definitions/shippingMethod"
        },
        "shippingCost" : {
          "type" : "integer"
        },
        "shippingCostTax" : {
          "type" : "integer"
        },
        "type" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "shippingMethod" : {
      "type" : "object",
      "properties" : {
        "details" : {
          "type" : "string"
        },
        "name" : {
          "type" : "string"
        },
        "speed" : {
          "type" : "integer"
        },
        "type" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "shoppingCart" : {
      "type" : "object",
      "properties" : {
        "amountBreakdown" : {
          "type" : "array",
          "items" : {
            "$ref" : "#/definitions/amountBreakdown"
          },
          "uniqueItems" : false
        },
        "giftCardPurchase" : {
          "$ref" : "#/definitions/giftCardPurchase"
        },
        "isPreOrder" : {
          "type" : "boolean"
        },
        "items" : {
          "type" : "array",
          "items" : {
            "$ref" : "#/definitions/lineItem"
          },
          "uniqueItems" : false
        },
        "preOrderItemAvailabilityDate" : {
          "type" : "string"
        },
        "reOrderIndicator" : {
          "type" : "boolean"
        }
      },
      "additionalProperties" : false
    },
    "subsequentCardPaymentMethodSpecificInput" : {
      "type" : "object",
      "properties" : {
        "authorizationMode" : {
          "type" : "string"
        },
        "marketPlace" : {
          "$ref" : "#/definitions/marketPlace"
        },
        "paymentNumber" : {
          "type" : "integer"
        },
        "schemeReferenceData" : {
          "type" : "string"
        },
        "subsequentType" : {
          "type" : "string"
        },
        "token" : {
          "type" : "string"
        },
        "transactionChannel" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "subsequentPaymentProduct5001SpecificInput" : {
      "type" : "object",
      "properties" : {
        "subsequentType" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "surchargeSpecificInput" : {
      "type" : "object",
      "properties" : {
        "mode" : {
          "type" : "string"
        },
        "surchargeAmount" : {
          "$ref" : "#/definitions/amountOfMoney"
        }
      },
      "additionalProperties" : false
    }
  }
}

export default schema;

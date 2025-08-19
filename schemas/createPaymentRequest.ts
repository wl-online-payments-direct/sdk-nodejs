const schema = {
  "$schema" : "http://json-schema.org/draft-04/schema#",
  "type" : [ "object", "null" ],
  "properties" : {
    "cardPaymentMethodSpecificInput" : {
      "$ref" : "#/definitions/cardPaymentMethodSpecificInput"
    },
    "encryptedCustomerInput" : {
      "type" : "string"
    },
    "feedbacks" : {
      "$ref" : "#/definitions/feedbacks"
    },
    "fraudFields" : {
      "$ref" : "#/definitions/fraudFields"
    },
    "hostedTokenizationId" : {
      "type" : "string"
    },
    "mobilePaymentMethodSpecificInput" : {
      "$ref" : "#/definitions/mobilePaymentMethodSpecificInput"
    },
    "order" : {
      "$ref" : "#/definitions/order"
    },
    "redirectPaymentMethodSpecificInput" : {
      "$ref" : "#/definitions/redirectPaymentMethodSpecificInput"
    },
    "sepaDirectDebitPaymentMethodSpecificInput" : {
      "$ref" : "#/definitions/sepaDirectDebitPaymentMethodSpecificInput"
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
    "bankAccountIban" : {
      "type" : "object",
      "properties" : {
        "iban" : {
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
    "card" : {
      "type" : "object",
      "properties" : {
        "cardNumber" : {
          "type" : "string"
        },
        "cardholderName" : {
          "type" : "string"
        },
        "cvv" : {
          "type" : "string"
        },
        "expiryDate" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "cardPaymentMethodSpecificInput" : {
      "type" : "object",
      "properties" : {
        "allowDynamicLinking" : {
          "type" : "boolean"
        },
        "authorizationMode" : {
          "type" : "string"
        },
        "card" : {
          "$ref" : "#/definitions/card"
        },
        "cardOnFileRecurringExpiration" : {
          "type" : "string"
        },
        "cardOnFileRecurringFrequency" : {
          "type" : "string"
        },
        "cobrandSelectionIndicator" : {
          "type" : "string"
        },
        "currencyConversion" : {
          "$ref" : "#/definitions/currencyConversionInput"
        },
        "initialSchemeTransactionId" : {
          "type" : "string"
        },
        "isRecurring" : {
          "type" : "boolean"
        },
        "multiplePaymentInformation" : {
          "$ref" : "#/definitions/multiplePaymentInformation"
        },
        "networkTokenData" : {
          "$ref" : "#/definitions/networkTokenData"
        },
        "paymentProduct130SpecificInput" : {
          "$ref" : "#/definitions/paymentProduct130SpecificInput"
        },
        "paymentProduct3012SpecificInput" : {
          "$ref" : "#/definitions/paymentProduct3012SpecificInput"
        },
        "paymentProduct3208SpecificInput" : {
          "$ref" : "#/definitions/paymentProduct3208SpecificInput"
        },
        "paymentProduct3209SpecificInput" : {
          "$ref" : "#/definitions/paymentProduct3209SpecificInput"
        },
        "paymentProductId" : {
          "type" : "integer"
        },
        "recurring" : {
          "$ref" : "#/definitions/cardRecurrenceDetails"
        },
        "returnUrl" : {
          "type" : "string"
        },
        "schemeReferenceData" : {
          "type" : "string"
        },
        "skipAuthentication" : {
          "type" : "boolean"
        },
        "threeDSecure" : {
          "$ref" : "#/definitions/threeDSecure"
        },
        "token" : {
          "type" : "string"
        },
        "tokenize" : {
          "type" : "boolean"
        },
        "transactionChannel" : {
          "type" : "string"
        },
        "unscheduledCardOnFileRequestor" : {
          "type" : "string"
        },
        "unscheduledCardOnFileSequenceIndicator" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "cardRecurrenceDetails" : {
      "type" : "object",
      "properties" : {
        "recurringPaymentSequenceIndicator" : {
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
    "createMandateWithReturnUrl" : {
      "type" : "object",
      "properties" : {
        "alias" : {
          "type" : "string"
        },
        "customer" : {
          "$ref" : "#/definitions/mandateCustomer"
        },
        "customerReference" : {
          "type" : "string"
        },
        "language" : {
          "type" : "string"
        },
        "recurrenceType" : {
          "type" : "string"
        },
        "returnUrl" : {
          "type" : "string"
        },
        "signatureType" : {
          "type" : "string"
        },
        "uniqueMandateReference" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "currencyConversionInput" : {
      "type" : "object",
      "properties" : {
        "acceptedByUser" : {
          "type" : "boolean"
        },
        "dccSessionId" : {
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
    "customerBankAccount" : {
      "type" : "object",
      "properties" : {
        "accountHolderName" : {
          "type" : "string"
        },
        "bic" : {
          "type" : "string"
        },
        "iban" : {
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
    "decryptedPaymentData" : {
      "type" : "object",
      "properties" : {
        "cardholderName" : {
          "type" : "string"
        },
        "cryptogram" : {
          "type" : "string"
        },
        "dpan" : {
          "type" : "string"
        },
        "eci" : {
          "type" : "integer"
        },
        "expiryDate" : {
          "type" : "string"
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
    "externalCardholderAuthenticationData" : {
      "type" : "object",
      "properties" : {
        "acsTransactionId" : {
          "type" : "string"
        },
        "appliedExemption" : {
          "type" : "string"
        },
        "cavv" : {
          "type" : "string"
        },
        "cavvAlgorithm" : {
          "type" : "string"
        },
        "directoryServerTransactionId" : {
          "type" : "string"
        },
        "eci" : {
          "type" : "integer"
        },
        "flow" : {
          "type" : "string"
        },
        "schemeRiskScore" : {
          "type" : "integer"
        },
        "threeDSecureVersion" : {
          "type" : "string"
        },
        "xid" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "feedbacks" : {
      "type" : "object",
      "properties" : {
        "webhookUrl" : {
          "type" : "string"
        },
        "webhooksUrls" : {
          "type" : "array",
          "items" : {
            "type" : "string"
          },
          "uniqueItems" : false
        }
      },
      "additionalProperties" : false
    },
    "fraudFields" : {
      "type" : "object",
      "properties" : {
        "blackListData" : {
          "type" : "string"
        },
        "customerIpAddress" : {
          "type" : "string"
        },
        "productCategories" : {
          "type" : "array",
          "items" : {
            "type" : "string"
          },
          "uniqueItems" : false
        }
      },
      "additionalProperties" : false
    },
    "gPayThreeDSecure" : {
      "type" : "object",
      "properties" : {
        "challengeCanvasSize" : {
          "type" : "string"
        },
        "challengeIndicator" : {
          "type" : "string"
        },
        "exemptionRequest" : {
          "type" : "string"
        },
        "redirectionData" : {
          "$ref" : "#/definitions/redirectionData"
        },
        "skipAuthentication" : {
          "type" : "boolean"
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
    "mandateAddress" : {
      "type" : "object",
      "properties" : {
        "city" : {
          "type" : "string"
        },
        "countryCode" : {
          "type" : "string"
        },
        "houseNumber" : {
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
    "mandateContactDetails" : {
      "type" : "object",
      "properties" : {
        "emailAddress" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "mandateCustomer" : {
      "type" : "object",
      "properties" : {
        "bankAccountIban" : {
          "$ref" : "#/definitions/bankAccountIban"
        },
        "companyName" : {
          "type" : "string"
        },
        "contactDetails" : {
          "$ref" : "#/definitions/mandateContactDetails"
        },
        "mandateAddress" : {
          "$ref" : "#/definitions/mandateAddress"
        },
        "personalInformation" : {
          "$ref" : "#/definitions/mandatePersonalInformation"
        }
      },
      "additionalProperties" : false
    },
    "mandatePersonalInformation" : {
      "type" : "object",
      "properties" : {
        "name" : {
          "$ref" : "#/definitions/mandatePersonalName"
        },
        "title" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "mandatePersonalName" : {
      "type" : "object",
      "properties" : {
        "firstName" : {
          "type" : "string"
        },
        "surname" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "mobilePaymentMethodSpecificInput" : {
      "type" : "object",
      "properties" : {
        "authorizationMode" : {
          "type" : "string"
        },
        "decryptedPaymentData" : {
          "$ref" : "#/definitions/decryptedPaymentData"
        },
        "encryptedPaymentData" : {
          "type" : "string"
        },
        "ephemeralKey" : {
          "type" : "string"
        },
        "paymentProduct320SpecificInput" : {
          "$ref" : "#/definitions/mobilePaymentProduct320SpecificInput"
        },
        "paymentProductId" : {
          "type" : "integer"
        },
        "publicKeyHash" : {
          "type" : "string"
        },
        "requiresApproval" : {
          "type" : "boolean"
        }
      },
      "additionalProperties" : false
    },
    "mobilePaymentProduct320SpecificInput" : {
      "type" : "object",
      "properties" : {
        "isRecurring" : {
          "type" : "boolean"
        },
        "recurring" : {
          "$ref" : "#/definitions/product320Recurring"
        },
        "threeDSecure" : {
          "$ref" : "#/definitions/gPayThreeDSecure"
        },
        "tokenize" : {
          "type" : "boolean"
        }
      },
      "additionalProperties" : false
    },
    "multiplePaymentInformation" : {
      "type" : "object",
      "properties" : {
        "paymentPattern" : {
          "type" : "string"
        },
        "totalNumberOfPayments" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    },
    "networkTokenData" : {
      "type" : "object",
      "properties" : {
        "cardholderName" : {
          "type" : "string"
        },
        "cryptogram" : {
          "type" : "string"
        },
        "eci" : {
          "type" : "integer"
        },
        "networkToken" : {
          "type" : "string"
        },
        "schemeTokenRequestorId" : {
          "type" : "string"
        },
        "tokenExpiryDate" : {
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
    "paymentProduct130SpecificInput" : {
      "type" : "object",
      "properties" : {
        "threeDSecure" : {
          "$ref" : "#/definitions/paymentProduct130SpecificThreeDSecure"
        }
      },
      "additionalProperties" : false
    },
    "paymentProduct130SpecificThreeDSecure" : {
      "type" : "object",
      "properties" : {
        "acquirerExemption" : {
          "type" : "boolean"
        },
        "merchantScore" : {
          "type" : "string"
        },
        "numberOfItems" : {
          "type" : "integer"
        },
        "usecase" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "paymentProduct3012SpecificInput" : {
      "type" : "object",
      "properties" : {
        "forceAuthentication" : {
          "type" : "boolean"
        },
        "isDeferredPayment" : {
          "type" : "boolean"
        },
        "isWipTransaction" : {
          "type" : "boolean"
        },
        "wipMerchantAuthenticationMethod" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "paymentProduct3208SpecificInput" : {
      "type" : "object",
      "properties" : {
        "merchantFinanceCode" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "paymentProduct3209SpecificInput" : {
      "type" : "object",
      "properties" : {
        "merchantFinanceCode" : {
          "type" : "string"
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
    "product320Recurring" : {
      "type" : "object",
      "properties" : {
        "recurringPaymentSequenceIndicator" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentMethodSpecificInput" : {
      "type" : "object",
      "properties" : {
        "paymentOption" : {
          "type" : "string"
        },
        "paymentProduct3203SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct3203SpecificInput"
        },
        "paymentProduct3204SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct3204SpecificInput"
        },
        "paymentProduct3302SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct3302SpecificInput"
        },
        "paymentProduct3306SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct3306SpecificInput"
        },
        "paymentProduct5001SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct5001SpecificInput"
        },
        "paymentProduct5300SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct5300SpecificInput"
        },
        "paymentProduct5402SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct5402SpecificInput"
        },
        "paymentProduct5403SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct5403SpecificInput"
        },
        "paymentProduct5406SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct5406SpecificInput"
        },
        "paymentProduct5408SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct5408SpecificInput"
        },
        "paymentProduct5410SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct5410SpecificInput"
        },
        "paymentProduct809SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct809SpecificInput"
        },
        "paymentProduct840SpecificInput" : {
          "$ref" : "#/definitions/redirectPaymentProduct840SpecificInput"
        },
        "paymentProductId" : {
          "type" : "integer"
        },
        "redirectionData" : {
          "$ref" : "#/definitions/redirectionData"
        },
        "requiresApproval" : {
          "type" : "boolean"
        },
        "token" : {
          "type" : "string"
        },
        "tokenize" : {
          "type" : "boolean"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct3203SpecificInput" : {
      "type" : "object",
      "properties" : {
        "checkoutType" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct3204SpecificInput" : {
      "type" : "object",
      "properties" : {
        "aliasLabel" : {
          "type" : "string"
        },
        "blikCode" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct3302SpecificInput" : {
      "type" : "object",
      "properties" : {
        "organizationEntityType" : {
          "type" : "string"
        },
        "organizationRegistrationId" : {
          "type" : "string"
        },
        "vatId" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct3306SpecificInput" : {
      "type" : "object",
      "properties" : {
        "extraMerchantData" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct5001SpecificInput" : {
      "type" : "object",
      "properties" : {
        "exemptionRequest" : {
          "type" : "string"
        },
        "subsequentType" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct5300SpecificInput" : {
      "type" : "object",
      "properties" : {
        "birthCity" : {
          "type" : "string"
        },
        "birthCountry" : {
          "type" : "string"
        },
        "birthZipCode" : {
          "type" : "string"
        },
        "channel" : {
          "type" : "string"
        },
        "loyaltyCardNumber" : {
          "type" : "string"
        },
        "secondInstallmentPaymentDate" : {
          "type" : "string"
        },
        "sessionDuration" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct5402SpecificInput" : {
      "type" : "object",
      "properties" : {
        "completeRemainingPaymentAmount" : {
          "type" : "boolean"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct5403SpecificInput" : {
      "type" : "object",
      "properties" : {
        "completeRemainingPaymentAmount" : {
          "type" : "boolean"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct5406SpecificInput" : {
      "type" : "object",
      "properties" : {
        "customerBankAccount" : {
          "$ref" : "#/definitions/customerBankAccount"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct5408SpecificInput" : {
      "type" : "object",
      "properties" : {
        "customerBankAccount" : {
          "$ref" : "#/definitions/customerBankAccount"
        },
        "instantPaymentOnly" : {
          "type" : "boolean"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct5410SpecificInput" : {
      "type" : "object",
      "properties" : {
        "secondInstallmentPaymentDate" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct809SpecificInput" : {
      "type" : "object",
      "properties" : {
        "issuerId" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "redirectPaymentProduct840SpecificInput" : {
      "type" : "object",
      "properties" : {
        "JavaScriptSdkFlow" : {
          "type" : "boolean"
        },
        "addressSelectionAtPayPal" : {
          "type" : "boolean"
        },
        "custom" : {
          "type" : "string"
        },
        "payLater" : {
          "type" : "boolean"
        }
      },
      "additionalProperties" : false
    },
    "redirectionData" : {
      "type" : "object",
      "properties" : {
        "returnUrl" : {
          "type" : "string"
        }
      },
      "additionalProperties" : false
    },
    "sepaDirectDebitPaymentMethodSpecificInput" : {
      "type" : "object",
      "properties" : {
        "paymentProduct771SpecificInput" : {
          "$ref" : "#/definitions/sepaDirectDebitPaymentProduct771SpecificInput"
        },
        "paymentProductId" : {
          "type" : "integer"
        }
      },
      "additionalProperties" : false
    },
    "sepaDirectDebitPaymentProduct771SpecificInput" : {
      "type" : "object",
      "properties" : {
        "existingUniqueMandateReference" : {
          "type" : "string"
        },
        "mandate" : {
          "$ref" : "#/definitions/createMandateWithReturnUrl"
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
    },
    "threeDSecure" : {
      "type" : "object",
      "properties" : {
        "authenticationAmount" : {
          "type" : "integer"
        },
        "challengeCanvasSize" : {
          "type" : "string"
        },
        "challengeIndicator" : {
          "type" : "string"
        },
        "deviceChannel" : {
          "type" : "string"
        },
        "exemptionRequest" : {
          "type" : "string"
        },
        "externalCardholderAuthenticationData" : {
          "$ref" : "#/definitions/externalCardholderAuthenticationData"
        },
        "merchantFraudRate" : {
          "type" : "integer"
        },
        "priorThreeDSecureData" : {
          "$ref" : "#/definitions/threeDSecureData"
        },
        "redirectionData" : {
          "$ref" : "#/definitions/redirectionData"
        },
        "secureCorporatePayment" : {
          "type" : "boolean"
        },
        "skipAuthentication" : {
          "type" : "boolean"
        },
        "skipSoftDecline" : {
          "type" : "boolean"
        }
      },
      "additionalProperties" : false
    },
    "threeDSecureData" : {
      "type" : "object",
      "properties" : {
        "acsTransactionId" : {
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
    }
  }
}

export default schema;

/*
 * This file was automatically generated.
 */

export interface APIError {
  category?: string | null;
  /**
   * @deprecated Use errorCode instead. Error code
   */
  code?: string | null;
  errorCode?: string | null;
  httpStatusCode?: number | null;
  id?: string | null;
  message?: string | null;
  propertyName?: string | null;
  retriable?: boolean | null;
}

export interface AccountOnFile {
  attributes?: AccountOnFileAttribute[] | null;
  displayHints?: AccountOnFileDisplayHints | null;
  id?: number | null;
  paymentProductId?: number | null;
}

export interface AccountOnFileAttribute {
  key?: string | null;
  /**
   * @deprecated Deprecated
   */
  mustWriteReason?: string | null;
  status?: string | null;
  value?: string | null;
}

export interface AccountOnFileDisplayHints {
  labelTemplate?: LabelTemplateElement[] | null;
  logo?: string | null;
}

export interface AcquirerInformation {
  acquirerSelectionInformation?: AcquirerSelectionInformation | null;
  name?: string | null;
}

export interface AcquirerSelectionInformation {
  fallbackLevel?: number | null;
  result?: string | null;
  ruleName?: string | null;
}

export interface AdditionalOrderInput {
  airlineData?: AirlineData | null;
  loanRecipient?: LoanRecipient | null;
  lodgingData?: LodgingData | null;
  typeInformation?: OrderTypeInformation | null;
}

export interface Address {
  additionalInfo?: string | null;
  city?: string | null;
  countryCode?: string | null;
  houseNumber?: string | null;
  state?: string | null;
  street?: string | null;
  zip?: string | null;
}

export interface AddressPersonal {
  additionalInfo?: string | null;
  city?: string | null;
  companyName?: string | null;
  countryCode?: string | null;
  houseNumber?: string | null;
  name?: PersonalName | null;
  state?: string | null;
  street?: string | null;
  zip?: string | null;
}

export interface AirlineData {
  agentNumericCode?: string | null;
  code?: string | null;
  /**
   * @deprecated This field is not used by any payment product Date of the Flight Format: YYYYMMDD
   */
  flightDate?: string | null;
  flightIndicator?: string | null;
  flightLegs?: AirlineFlightLeg[] | null;
  invoiceNumber?: string | null;
  /**
   * @deprecated Deprecated
   */
  isETicket?: boolean | null;
  isRestrictedTicket?: boolean | null;
  /**
   * @deprecated This field is not used by any payment product  * true - The payer is the ticket holder  * false - The payer is not the ticket holder
   */
  isThirdParty?: boolean | null;
  issueDate?: string | null;
  merchantCustomerId?: string | null;
  /**
   * @deprecated This field is not used by any payment product Name of the airline
   */
  name?: string | null;
  /**
   * @deprecated Use passengers instead Name of passenger
   */
  passengerName?: string | null;
  passengers?: AirlinePassenger[] | null;
  /**
   * @deprecated This field is not used by any payment product Place of issue For sales in the US the last two characters (pos 14-15) must be the US state code.
   */
  placeOfIssue?: string | null;
  /**
   * @deprecated Use passengers instead.
   */
  pnr?: string | null;
  pointOfSale?: string | null;
  /**
   * @deprecated This field is not used by any payment product City code of the point of sale
   */
  posCityCode?: string | null;
  ticketCurrency?: string | null;
  /**
   * @deprecated This field is not used by any payment product Delivery method of the ticket
   */
  ticketDeliveryMethod?: string | null;
  ticketNumber?: string | null;
  totalFare?: number | null;
  totalFee?: number | null;
  totalTaxes?: number | null;
  travelAgencyName?: string | null;
}

export interface AirlineFlightLeg {
  airlineClass?: string | null;
  arrivalAirport?: string | null;
  arrivalTime?: string | null;
  carrierCode?: string | null;
  conjunctionTicket?: string | null;
  couponNumber?: string | null;
  date?: string | null;
  departureTime?: string | null;
  endorsementOrRestriction?: string | null;
  exchangeTicket?: string | null;
  /**
   * @deprecated Use legFare instead. Fare of this leg
   */
  fare?: string | null;
  fareBasis?: string | null;
  fee?: number | null;
  flightNumber?: string | null;
  legFare?: number | null;
  /**
   * @deprecated This field is not used by any payment product Sequence number of the flight leg
   */
  number?: number | null;
  originAirport?: string | null;
  passengerClass?: string | null;
  stopoverCode?: string | null;
  taxes?: number | null;
}

export interface AirlinePassenger {
  airlineLoyaltyStatus?: string | null;
  firstName?: string | null;
  passengerType?: string | null;
  surname?: string | null;
  surnamePrefix?: string | null;
  /**
   * @deprecated This field is not used by any payment product Title of the passenger (this property is used for fraud screening on the payment platform)
   */
  title?: string | null;
}

export interface AmountBreakdown {
  amount?: number | null;
  type?: string | null;
}

export interface AmountOfMoney {
  amount?: number | null;
  currencyCode?: string | null;
}

export interface ApplePayLineItem {
  amount?: string | null;
  label?: string | null;
  paymentTiming?: string | null;
  recurringPaymentEndDate?: string | null;
  recurringPaymentIntervalCount?: number | null;
  recurringPaymentIntervalUnit?: string | null;
  recurringPaymentStartDate?: string | null;
}

export interface ApplePayRecurringPaymentRequest {
  billingAgreement?: string | null;
  managementUrl?: string | null;
  paymentDescription?: string | null;
  regularBilling?: ApplePayLineItem | null;
  trialBilling?: ApplePayLineItem | null;
}

export interface BankAccountIban {
  iban?: string | null;
}

export interface BrowserData {
  colorDepth?: number | null;
  javaEnabled?: boolean | null;
  javaScriptEnabled?: boolean | null;
  screenHeight?: string | null;
  screenWidth?: string | null;
}

export interface CalculateSurchargeRequest {
  amountOfMoney?: AmountOfMoney | null;
  cardSource?: CardSource | null;
}

export interface CalculateSurchargeResponse {
  surcharges?: Surcharge[] | null;
}

export interface CancelPaymentRequest {
  amountOfMoney?: AmountOfMoney | null;
  isFinal?: boolean | null;
}

export interface CancelPaymentResponse {
  payment?: PaymentResponse | null;
}

export interface Capture {
  captureOutput?: CaptureOutput | null;
  id?: string | null;
  status?: string | null;
  statusOutput?: CaptureStatusOutput | null;
}

export interface CaptureOutput {
  acquiredAmount?: AmountOfMoney | null;
  amountOfMoney?: AmountOfMoney | null;
  /**
   * @deprecated Amount that has been paid. This is deprecated. Use acquiredAmount instead.
   */
  amountPaid?: number | null;
  cardPaymentMethodSpecificOutput?: CardPaymentMethodSpecificOutput | null;
  merchantParameters?: string | null;
  mobilePaymentMethodSpecificOutput?: MobilePaymentMethodSpecificOutput | null;
  operationReferences?: OperationPaymentReferences | null;
  paymentMethod?: string | null;
  redirectPaymentMethodSpecificOutput?: RedirectPaymentMethodSpecificOutput | null;
  references?: PaymentReferences | null;
  sepaDirectDebitPaymentMethodSpecificOutput?: SepaDirectDebitPaymentMethodSpecificOutput | null;
  surchargeSpecificOutput?: SurchargeSpecificOutput | null;
}

export interface CapturePaymentRequest {
  amount?: number | null;
  isFinal?: boolean | null;
  operationReferences?: OperationPaymentReferences | null;
  references?: PaymentReferences | null;
}

export interface CaptureResponse {
  captureOutput?: CaptureOutput | null;
  id?: string | null;
  status?: string | null;
  statusOutput?: CaptureStatusOutput | null;
}

export interface CaptureStatusOutput {
  statusCode?: number | null;
}

export interface CapturesResponse {
  captures?: Capture[] | null;
}

export interface Card {
  cardNumber?: string | null;
  cardholderName?: string | null;
  cvv?: string | null;
  expiryDate?: string | null;
}

export interface CardEssentials {
  bin?: string | null;
  cardNumber?: string | null;
  countryCode?: string | null;
  expiryDate?: string | null;
}

export interface CardFraudResults {
  avsResult?: string | null;
  cvvResult?: string | null;
  fraudServiceResult?: string | null;
}

export interface CardInfo {
  cardNumber?: string | null;
  paymentProductId?: number | null;
}

export interface CardPaymentMethodSpecificInput {
  allowDynamicLinking?: boolean | null;
  authorizationMode?: string | null;
  card?: Card | null;
  cardOnFileRecurringExpiration?: string | null;
  cardOnFileRecurringFrequency?: string | null;
  cobrandSelectionIndicator?: string | null;
  currencyConversion?: CurrencyConversionInput | null;
  initialSchemeTransactionId?: string | null;
  isRecurring?: boolean | null;
  multiplePaymentInformation?: MultiplePaymentInformation | null;
  paymentProduct130SpecificInput?: PaymentProduct130SpecificInput | null;
  paymentProduct3012SpecificInput?: PaymentProduct3012SpecificInput | null;
  paymentProduct3208SpecificInput?: PaymentProduct3208SpecificInput | null;
  paymentProduct3209SpecificInput?: PaymentProduct3209SpecificInput | null;
  paymentProductId?: number | null;
  recurring?: CardRecurrenceDetails | null;
  returnUrl?: string | null;
  schemeReferenceData?: string | null;
  /**
   * @deprecated Use threeDSecure.skipAuthentication instead.  * true = 3D Secure authentication will be skipped for this transaction. This setting should be used when isRecurring is set to true and recurringPaymentSequenceIndicator is set to recurring.  * false = 3D Secure authentication will not be skipped for this transaction.    Note: This is only possible if your account in our system is setup for 3D Secure authentication and if your configuration in our system allows you to override it per transaction.
   */
  skipAuthentication?: boolean | null;
  threeDSecure?: ThreeDSecure | null;
  token?: string | null;
  tokenize?: boolean | null;
  transactionChannel?: string | null;
  unscheduledCardOnFileRequestor?: string | null;
  unscheduledCardOnFileSequenceIndicator?: string | null;
}

export interface CardPaymentMethodSpecificInputBase {
  allowDynamicLinking?: boolean | null;
  authorizationMode?: string | null;
  currencyConversionSpecificInput?: CurrencyConversionSpecificInput | null;
  initialSchemeTransactionId?: string | null;
  multiplePaymentInformation?: MultiplePaymentInformation | null;
  paymentProduct130SpecificInput?: PaymentProduct130SpecificInput | null;
  paymentProduct3012SpecificInput?: PaymentProduct3012SpecificInput | null;
  paymentProduct3208SpecificInput?: PaymentProduct3208SpecificInput | null;
  paymentProduct3209SpecificInput?: PaymentProduct3209SpecificInput | null;
  paymentProduct5100SpecificInput?: PaymentProduct5100SpecificInput | null;
  paymentProductId?: number | null;
  recurring?: CardRecurrenceDetails | null;
  threeDSecure?: ThreeDSecureBase | null;
  token?: string | null;
  tokenize?: boolean | null;
  transactionChannel?: string | null;
  unscheduledCardOnFileRequestor?: string | null;
  unscheduledCardOnFileSequenceIndicator?: string | null;
}

export interface CardPaymentMethodSpecificInputForHostedCheckout {
  clickToPay?: boolean | null;
  groupCards?: boolean | null;
  paymentProductPreferredOrder?: number[] | null;
}

export interface CardPaymentMethodSpecificOutput {
  acquirerInformation?: AcquirerInformation | null;
  authenticatedAmount?: number | null;
  authorisationCode?: string | null;
  card?: CardEssentials | null;
  currencyConversion?: CurrencyConversion | null;
  externalTokenLinked?: ExternalTokenLinked | null;
  fraudResults?: CardFraudResults | null;
  initialSchemeTransactionId?: string | null;
  paymentAccountReference?: string | null;
  paymentOption?: string | null;
  paymentProduct3208SpecificOutput?: PaymentProduct3208SpecificOutput | null;
  paymentProduct3209SpecificOutput?: PaymentProduct3209SpecificOutput | null;
  paymentProductId?: number | null;
  reattemptInstructions?: ReattemptInstructions | null;
  schemeReferenceData?: string | null;
  threeDSecureResults?: ThreeDSecureResults | null;
  token?: string | null;
}

export interface CardPayoutMethodSpecificInput {
  card?: Card | null;
  paymentProductId?: number | null;
  payoutReason?: string | null;
  token?: string | null;
}

export interface CardRecurrenceDetails {
  recurringPaymentSequenceIndicator?: string | null;
}

export interface CardSource {
  card?: SurchargeCalculationCard | null;
  encryptedCustomerInput?: string | null;
  hostedTokenizationId?: string | null;
  token?: string | null;
}

export interface CardWithoutCvv {
  cardNumber?: string | null;
  cardholderName?: string | null;
  expiryDate?: string | null;
}

export interface CompanyInformation {
  name?: string | null;
}

export interface CompletePaymentCardPaymentMethodSpecificInput {
  card?: CardWithoutCvv | null;
}

export interface CompletePaymentRequest {
  cardPaymentMethodSpecificInput?: CompletePaymentCardPaymentMethodSpecificInput | null;
  order?: Order | null;
}

export interface CompletePaymentResponse {
  creationOutput?: PaymentCreationOutput | null;
  merchantAction?: MerchantAction | null;
  payment?: PaymentResponse | null;
}

export interface ContactDetails {
  emailAddress?: string | null;
  faxNumber?: string | null;
  mobilePhoneNumber?: string | null;
  phoneNumber?: string | null;
  workPhoneNumber?: string | null;
}

export interface CreateHostedCheckoutRequest {
  cardPaymentMethodSpecificInput?: CardPaymentMethodSpecificInputBase | null;
  feedbacks?: Feedbacks | null;
  fraudFields?: FraudFields | null;
  hostedCheckoutSpecificInput?: HostedCheckoutSpecificInput | null;
  mobilePaymentMethodSpecificInput?: MobilePaymentMethodHostedCheckoutSpecificInput | null;
  order?: Order | null;
  redirectPaymentMethodSpecificInput?: RedirectPaymentMethodSpecificInput | null;
  sepaDirectDebitPaymentMethodSpecificInput?: SepaDirectDebitPaymentMethodSpecificInputBase | null;
}

export interface CreateHostedCheckoutResponse {
  RETURNMAC?: string | null;
  hostedCheckoutId?: string | null;
  invalidTokens?: string[] | null;
  merchantReference?: string | null;
  partialRedirectUrl?: string | null;
  redirectUrl?: string | null;
}

export interface CreateHostedTokenizationRequest {
  askConsumerConsent?: boolean | null;
  creditCardSpecificInput?: CreditCardSpecificInputHostedTokenization | null;
  locale?: string | null;
  paymentProductFilters?: PaymentProductFiltersHostedTokenization | null;
  tokens?: string | null;
  variant?: string | null;
}

export interface CreateHostedTokenizationResponse {
  expiredCardTokens?: string[] | null;
  hostedTokenizationId?: string | null;
  hostedTokenizationUrl?: string | null;
  invalidTokens?: string[] | null;
  /**
   * @deprecated Deprecated
   */
  partialRedirectUrl?: string | null;
}

export interface CreateMandateRequest {
  alias?: string | null;
  customer?: MandateCustomer | null;
  customerReference?: string | null;
  language?: string | null;
  recurrenceType?: string | null;
  returnUrl?: string | null;
  signatureType?: string | null;
  uniqueMandateReference?: string | null;
}

export interface CreateMandateResponse {
  mandate?: MandateResponse | null;
  merchantAction?: MandateMerchantAction | null;
}

export interface CreateMandateWithReturnUrl {
  alias?: string | null;
  customer?: MandateCustomer | null;
  customerReference?: string | null;
  language?: string | null;
  recurrenceType?: string | null;
  returnUrl?: string | null;
  signatureType?: string | null;
  uniqueMandateReference?: string | null;
}

export interface CreatePaymentLinkRequest {
  cardPaymentMethodSpecificInput?: CardPaymentMethodSpecificInputBase | null;
  /**
   * @deprecated A note related to the created payment link.  Use paymentLinkSpecificInput/description instead.
   */
  description?: string | null;
  /**
   * @deprecated The date after which the payment link will not be usable to complete the payment. The date sent cannot be more than 6 months in the future or a past date. It must also contain the UTC offset.  Use paymentLinkSpecificInput/expirationDate instead.
   */
  expirationDate?: string | null;
  feedbacks?: Feedbacks | null;
  fraudFields?: FraudFields | null;
  hostedCheckoutSpecificInput?: HostedCheckoutSpecificInput | null;
  isReusableLink?: boolean | null;
  mobilePaymentMethodSpecificInput?: MobilePaymentMethodHostedCheckoutSpecificInput | null;
  order?: Order | null;
  paymentLinkOrder?: PaymentLinkOrderInput | null;
  paymentLinkSpecificInput?: PaymentLinkSpecificInput | null;
  /**
   * @deprecated The payment link recipient name.  Use paymentLinkSpecificInput/recipientName instead.
   */
  recipientName?: string | null;
  redirectPaymentMethodSpecificInput?: RedirectPaymentMethodSpecificInput | null;
  sepaDirectDebitPaymentMethodSpecificInput?: SepaDirectDebitPaymentMethodSpecificInputBase | null;
}

export interface CreatePaymentRequest {
  cardPaymentMethodSpecificInput?: CardPaymentMethodSpecificInput | null;
  encryptedCustomerInput?: string | null;
  feedbacks?: Feedbacks | null;
  fraudFields?: FraudFields | null;
  hostedTokenizationId?: string | null;
  mobilePaymentMethodSpecificInput?: MobilePaymentMethodSpecificInput | null;
  order?: Order | null;
  redirectPaymentMethodSpecificInput?: RedirectPaymentMethodSpecificInput | null;
  sepaDirectDebitPaymentMethodSpecificInput?: SepaDirectDebitPaymentMethodSpecificInput | null;
}

export interface CreatePaymentResponse {
  creationOutput?: PaymentCreationOutput | null;
  merchantAction?: MerchantAction | null;
  payment?: PaymentResponse | null;
}

export interface CreatePayoutRequest {
  amountOfMoney?: AmountOfMoney | null;
  cardPayoutMethodSpecificInput?: CardPayoutMethodSpecificInput | null;
  descriptor?: string | null;
  feedbacks?: Feedbacks | null;
  omnichannelPayoutSpecificInput?: OmnichannelPayoutSpecificInput | null;
  references?: PaymentReferences | null;
}

export interface CreateTokenRequest {
  card?: TokenCardSpecificInput | null;
  paymentProductId?: number | null;
}

export interface CreatedPaymentOutput {
  payment?: PaymentResponse | null;
  paymentStatusCategory?: string | null;
}

export interface CreatedTokenResponse {
  card?: CardWithoutCvv | null;
  externalTokenLinked?: ExternalTokenLinked | null;
  isNewToken?: boolean | null;
  token?: string | null;
  tokenStatus?: string | null;
}

export interface CreditCardSpecificInputHostedTokenization {
  ValidationRules?: CreditCardValidationRulesHostedTokenization | null;
  paymentProductPreferredOrder?: number[] | null;
}

export interface CreditCardValidationRulesHostedTokenization {
  cvvMandatoryForExistingToken?: boolean | null;
  cvvMandatoryForNewToken?: boolean | null;
}

export interface CurrencyConversion {
  acceptedByUser?: boolean | null;
  proposal?: DccProposal | null;
}

export interface CurrencyConversionInput {
  acceptedByUser?: boolean | null;
  dccSessionId?: string | null;
}

export interface CurrencyConversionRequest {
  cardSource?: DccCardSource | null;
  transaction?: Transaction | null;
}

export interface CurrencyConversionResponse {
  dccSessionId?: string | null;
  proposal?: DccProposal | null;
  result?: CurrencyConversionResult | null;
}

export interface CurrencyConversionResult {
  result?: string | null;
  resultReason?: string | null;
}

export interface CurrencyConversionSpecificInput {
  dccEnabled?: boolean | null;
}

export interface Customer {
  account?: CustomerAccount | null;
  accountType?: string | null;
  billingAddress?: Address | null;
  companyInformation?: CompanyInformation | null;
  contactDetails?: ContactDetails | null;
  device?: CustomerDevice | null;
  fiscalNumber?: string | null;
  locale?: string | null;
  merchantCustomerId?: string | null;
  personalInformation?: PersonalInformation | null;
}

export interface CustomerAccount {
  authentication?: CustomerAccountAuthentication | null;
  changeDate?: string | null;
  changedDuringCheckout?: boolean | null;
  createDate?: string | null;
  hadSuspiciousActivity?: boolean | null;
  passwordChangeDate?: string | null;
  passwordChangedDuringCheckout?: boolean | null;
  paymentAccountOnFile?: PaymentAccountOnFile | null;
  paymentActivity?: CustomerPaymentActivity | null;
}

export interface CustomerAccountAuthentication {
  data?: string | null;
  method?: string | null;
  utcTimestamp?: string | null;
}

export interface CustomerBankAccount {
  accountHolderName?: string | null;
  bic?: string | null;
  iban?: string | null;
}

export interface CustomerDevice {
  acceptHeader?: string | null;
  browserData?: BrowserData | null;
  deviceFingerprint?: string | null;
  ipAddress?: string | null;
  locale?: string | null;
  timezoneOffsetUtcMinutes?: string | null;
  userAgent?: string | null;
}

export interface CustomerDeviceOutput {
  ipAddressCountryCode?: string | null;
}

export interface CustomerOutput {
  device?: CustomerDeviceOutput | null;
}

export interface CustomerPaymentActivity {
  numberOfPaymentAttemptsLast24Hours?: number | null;
  numberOfPaymentAttemptsLastYear?: number | null;
  numberOfPurchasesLast6Months?: number | null;
}

export interface CustomerToken {
  billingAddress?: Address | null;
  companyInformation?: CompanyInformation | null;
  personalInformation?: PersonalInformationToken | null;
}

export interface DccCardSource {
  card?: CardInfo | null;
  encryptedCustomerInput?: string | null;
  hostedTokenizationId?: string | null;
  token?: string | null;
}

export interface DccProposal {
  baseAmount?: AmountOfMoney | null;
  disclaimerDisplay?: string | null;
  disclaimerReceipt?: string | null;
  rate?: RateDetails | null;
  targetAmount?: AmountOfMoney | null;
}

export interface DecryptedPaymentData {
  cardholderName?: string | null;
  cryptogram?: string | null;
  dpan?: string | null;
  eci?: number | null;
  expiryDate?: string | null;
}

export interface DirectoryEntry {
  issuerId?: string | null;
  issuerList?: string | null;
  issuerName?: string | null;
}

export interface Discount {
  amount?: number | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EmptyValidator {}

export interface ErrorResponse {
  errorId?: string | null;
  errors?: APIError[] | null;
}

export interface ExternalCardholderAuthenticationData {
  acsTransactionId?: string | null;
  appliedExemption?: string | null;
  cavv?: string | null;
  cavvAlgorithm?: string | null;
  directoryServerTransactionId?: string | null;
  eci?: number | null;
  flow?: string | null;
  schemeRiskScore?: number | null;
  threeDSecureVersion?: string | null;
  xid?: string | null;
}

export interface ExternalTokenLinked {
  ComputedToken?: string | null;
  /**
   * @deprecated Use the field ComputedToken instead.
   */
  GTSComputedToken?: string | null;
  GeneratedToken?: string | null;
}

export interface Feedbacks {
  /**
   * @deprecated The URL where the webhook will be dispatched for all status change events related to this payment.
   */
  webhookUrl?: string | null;
  webhooksUrls?: string[] | null;
}

export interface FixedListValidator {
  allowedValues?: string[] | null;
}

export interface FraudFields {
  blackListData?: string | null;
  /**
   * @deprecated Use order.customer.device.ipAddress instead.  The IP Address of the customer that is making the payment
   */
  customerIpAddress?: string | null;
  productCategories?: string[] | null;
}

export interface FraudResults {
  fraudServiceResult?: string | null;
}

export interface GPayThreeDSecure {
  challengeCanvasSize?: string | null;
  challengeIndicator?: string | null;
  exemptionRequest?: string | null;
  redirectionData?: RedirectionData | null;
  skipAuthentication?: boolean | null;
}

export interface GetHostedCheckoutResponse {
  createdPaymentOutput?: CreatedPaymentOutput | null;
  status?: string | null;
}

export interface GetHostedTokenizationResponse {
  token?: TokenResponse | null;
  tokenStatus?: string | null;
}

export interface GetIINDetailsRequest {
  bin?: string | null;
  paymentContext?: PaymentContext | null;
}

export interface GetIINDetailsResponse {
  cardType?: string | null;
  coBrands?: IINDetail[] | null;
  countryCode?: string | null;
  isAllowedInContext?: boolean | null;
  paymentProductId?: number | null;
}

export interface GetMandateResponse {
  mandate?: MandateResponse | null;
}

export interface GetPaymentProductGroupsResponse {
  paymentProductGroups?: PaymentProductGroup[] | null;
}

export interface GetPaymentProductsResponse {
  paymentProducts?: PaymentProduct[] | null;
}

export interface GetPrivacyPolicyResponse {
  htmlContent?: string | null;
}

export interface GiftCardPurchase {
  amountOfMoney?: AmountOfMoney | null;
  numberOfGiftCards?: number | null;
}

export interface HostedCheckoutSpecificInput {
  allowedNumberOfPaymentAttempts?: number | null;
  cardPaymentMethodSpecificInput?: CardPaymentMethodSpecificInputForHostedCheckout | null;
  isRecurring?: boolean | null;
  locale?: string | null;
  paymentProductFilters?: PaymentProductFiltersHostedCheckout | null;
  returnUrl?: string | null;
  sessionTimeout?: number | null;
  showResultPage?: boolean | null;
  tokens?: string | null;
  variant?: string | null;
}

export interface HostedCheckoutSpecificOutput {
  hostedCheckoutId?: string | null;
  variant?: string | null;
}

export interface IINDetail {
  cardType?: string | null;
  isAllowedInContext?: boolean | null;
  paymentProductId?: number | null;
}

export interface LabelTemplateElement {
  attributeKey?: string | null;
  mask?: string | null;
}

export interface LengthValidator {
  maxLength?: number | null;
  minLength?: number | null;
}

export interface LineItem {
  amountOfMoney?: AmountOfMoney | null;
  invoiceData?: LineItemInvoiceData | null;
  orderLineDetails?: OrderLineDetails | null;
  otherDetails?: OtherDetails | null;
}

export interface LineItemInvoiceData {
  description?: string | null;
}

export interface LoanRecipient {
  accountNumber?: string | null;
  dateOfBirth?: string | null;
  partialPan?: string | null;
  surname?: string | null;
  zip?: string | null;
}

export interface LodgingData {
  checkInDate?: string | null;
}

export interface MandateAddress {
  city?: string | null;
  countryCode?: string | null;
  houseNumber?: string | null;
  street?: string | null;
  zip?: string | null;
}

export interface MandateAddressResponse {
  city?: string | null;
  countryCode?: string | null;
  houseNumber?: string | null;
  street?: string | null;
  zip?: string | null;
}

export interface MandateContactDetails {
  emailAddress?: string | null;
}

export interface MandateCustomer {
  bankAccountIban?: BankAccountIban | null;
  companyName?: string | null;
  contactDetails?: MandateContactDetails | null;
  mandateAddress?: MandateAddress | null;
  personalInformation?: MandatePersonalInformation | null;
}

export interface MandateCustomerResponse {
  bankAccountIban?: BankAccountIban | null;
  companyName?: string | null;
  contactDetails?: MandateContactDetails | null;
  mandateAddress?: MandateAddressResponse | null;
  personalInformation?: MandatePersonalInformationResponse | null;
}

export interface MandateMerchantAction {
  actionType?: string | null;
  redirectData?: MandateRedirectData | null;
}

export interface MandatePersonalInformation {
  name?: MandatePersonalName | null;
  title?: string | null;
}

export interface MandatePersonalInformationResponse {
  name?: MandatePersonalNameResponse | null;
  title?: string | null;
}

export interface MandatePersonalName {
  firstName?: string | null;
  surname?: string | null;
}

export interface MandatePersonalNameResponse {
  firstName?: string | null;
  surname?: string | null;
}

export interface MandateRedirectData {
  RETURNMAC?: string | null;
  redirectURL?: string | null;
}

export interface MandateResponse {
  alias?: string | null;
  customer?: MandateCustomerResponse | null;
  customerReference?: string | null;
  mandatePdf?: string | null;
  recurrenceType?: string | null;
  status?: string | null;
  uniqueMandateReference?: string | null;
}

export interface MerchantAction {
  actionType?: string | null;
  mobileThreeDSecureChallengeParameters?: MobileThreeDSecureChallengeParameters | null;
  redirectData?: RedirectData | null;
  showFormData?: ShowFormData | null;
  showInstructionsData?: ShowInstructionsData | null;
}

export interface MobilePaymentData {
  dpan?: string | null;
  expiryDate?: string | null;
}

export interface MobilePaymentMethodHostedCheckoutSpecificInput {
  authorizationMode?: string | null;
  paymentProduct302SpecificInput?: MobilePaymentProduct302SpecificInput | null;
  paymentProduct320SpecificInput?: MobilePaymentProduct320SpecificInput | null;
  paymentProductId?: number | null;
}

export interface MobilePaymentMethodSpecificInput {
  authorizationMode?: string | null;
  decryptedPaymentData?: DecryptedPaymentData | null;
  encryptedPaymentData?: string | null;
  ephemeralKey?: string | null;
  paymentProduct320SpecificInput?: MobilePaymentProduct320SpecificInput | null;
  paymentProductId?: number | null;
  publicKeyHash?: string | null;
  requiresApproval?: boolean | null;
}

export interface MobilePaymentMethodSpecificOutput {
  authorisationCode?: string | null;
  fraudResults?: CardFraudResults | null;
  network?: string | null;
  paymentData?: MobilePaymentData | null;
  paymentProductId?: number | null;
  threeDSecureResults?: ThreeDSecureResults | null;
}

export interface MobilePaymentProduct302SpecificInput {
  applePayRecurringPaymentRequest?: ApplePayRecurringPaymentRequest | null;
}

export interface MobilePaymentProduct320SpecificInput {
  threeDSecure?: GPayThreeDSecure | null;
}

export interface MobileThreeDSecureChallengeParameters {
  acsReferenceNumber?: string | null;
  acsSignedContent?: string | null;
  acsTransactionId?: string | null;
  threeDServerTransactionId?: string | null;
}

export interface MultiplePaymentInformation {
  paymentPattern?: string | null;
  totalNumberOfPayments?: number | null;
}

export interface OmnichannelPayoutSpecificInput {
  paymentId?: string | null;
}

export interface OperationOutput {
  amountOfMoney?: AmountOfMoney | null;
  id?: string | null;
  operationReferences?: OperationPaymentReferences | null;
  paymentMethod?: string | null;
  references?: PaymentReferences | null;
  status?: string | null;
  statusOutput?: PaymentStatusOutput | null;
}

export interface OperationPaymentReferences {
  merchantReference?: string | null;
}

export interface Order {
  additionalInput?: AdditionalOrderInput | null;
  amountOfMoney?: AmountOfMoney | null;
  customer?: Customer | null;
  discount?: Discount | null;
  references?: OrderReferences | null;
  shipping?: Shipping | null;
  shoppingCart?: ShoppingCart | null;
  surchargeSpecificInput?: SurchargeSpecificInput | null;
}

export interface OrderLineDetails {
  discountAmount?: number | null;
  productBrand?: string | null;
  productCode?: string | null;
  productName?: string | null;
  productPrice?: number | null;
  productType?: string | null;
  quantity?: number | null;
  taxAmount?: number | null;
  unit?: string | null;
}

export interface OrderReferences {
  descriptor?: string | null;
  merchantParameters?: string | null;
  merchantReference?: string | null;
}

export interface OrderStatusOutput {
  errors?: APIError[] | null;
  isCancellable?: boolean | null;
  statusCategory?: string | null;
  statusCode?: number | null;
  statusCodeChangeDateTime?: string | null;
}

export interface OrderTypeInformation {
  purchaseType?: string | null;
  transactionType?: string | null;
}

export interface OtherDetails {
  metaData?: string | null;
  travelData?: string | null;
}

export interface PaymentAccountOnFile {
  createDate?: string | null;
  numberOfCardOnFileCreationAttemptsLast24Hours?: number | null;
}

export interface PaymentContext {
  amountOfMoney?: AmountOfMoney | null;
  countryCode?: string | null;
  isRecurring?: boolean | null;
}

export interface PaymentCreationOutput {
  externalReference?: string | null;
  isNewToken?: boolean | null;
  token?: string | null;
  tokenizationSucceeded?: boolean | null;
}

export interface PaymentDetailsResponse {
  Operations?: OperationOutput[] | null;
  hostedCheckoutSpecificOutput?: HostedCheckoutSpecificOutput | null;
  id?: string | null;
  paymentOutput?: PaymentOutput | null;
  status?: string | null;
  statusOutput?: PaymentStatusOutput | null;
}

export interface PaymentErrorResponse {
  errorId?: string | null;
  errors?: APIError[] | null;
  paymentResult?: CreatePaymentResponse | null;
}

export interface PaymentLinkEvent {
  dateTime?: string | null;
  details?: string | null;
  type?: string | null;
}

export interface PaymentLinkOrderInput {
  amount?: AmountOfMoney | null;
  merchantReference?: string | null;
  surchargeSpecificInput?: SurchargeForPaymentLink | null;
}

export interface PaymentLinkOrderOutput {
  amount?: AmountOfMoney | null;
  merchantReference?: string | null;
  surchargeSpecificOutput?: SurchargeForPaymentLink | null;
}

export interface PaymentLinkResponse {
  expirationDate?: string | null;
  isReusableLink?: boolean | null;
  paymentId?: string | null;
  paymentLinkEvents?: PaymentLinkEvent[] | null;
  paymentLinkId?: string | null;
  paymentLinkOrder?: PaymentLinkOrderOutput | null;
  recipientName?: string | null;
  redirectionUrl?: string | null;
  status?: string | null;
}

export interface PaymentLinkSpecificInput {
  description?: string | null;
  expirationDate?: string | null;
  recipientName?: string | null;
}

export interface PaymentOutput {
  acquiredAmount?: AmountOfMoney | null;
  amountOfMoney?: AmountOfMoney | null;
  /**
   * @deprecated Amount that has been paid. This is deprecated. Use acquiredAmount instead.
   */
  amountPaid?: number | null;
  cardPaymentMethodSpecificOutput?: CardPaymentMethodSpecificOutput | null;
  customer?: CustomerOutput | null;
  discount?: Discount | null;
  merchantParameters?: string | null;
  mobilePaymentMethodSpecificOutput?: MobilePaymentMethodSpecificOutput | null;
  paymentMethod?: string | null;
  redirectPaymentMethodSpecificOutput?: RedirectPaymentMethodSpecificOutput | null;
  references?: PaymentReferences | null;
  sepaDirectDebitPaymentMethodSpecificOutput?: SepaDirectDebitPaymentMethodSpecificOutput | null;
  surchargeSpecificOutput?: SurchargeSpecificOutput | null;
}

export interface PaymentProduct {
  accountsOnFile?: AccountOnFile[] | null;
  allowsAuthentication?: boolean | null;
  allowsRecurring?: boolean | null;
  allowsTokenization?: boolean | null;
  displayHints?: PaymentProductDisplayHints | null;
  displayHintsList?: PaymentProductDisplayHints[] | null;
  fields?: PaymentProductField[] | null;
  id?: number | null;
  paymentMethod?: string | null;
  paymentProduct302SpecificData?: PaymentProduct302SpecificData | null;
  paymentProduct320SpecificData?: PaymentProduct320SpecificData | null;
  paymentProductGroup?: string | null;
  usesRedirectionTo3rdParty?: boolean | null;
}

export interface PaymentProduct130SpecificInput {
  threeDSecure?: PaymentProduct130SpecificThreeDSecure | null;
}

export interface PaymentProduct130SpecificThreeDSecure {
  acquirerExemption?: boolean | null;
  merchantScore?: string | null;
  numberOfItems?: number | null;
  usecase?: string | null;
}

export interface PaymentProduct3012 {
  qrCode?: string | null;
  urlIntent?: string | null;
}

export interface PaymentProduct3012SpecificInput {
  forceAuthentication?: boolean | null;
  isDeferredPayment?: boolean | null;
  isWipTransaction?: boolean | null;
  wipMerchantAuthenticationMethod?: string | null;
}

export interface PaymentProduct302SpecificData {
  networks?: string[] | null;
}

export interface PaymentProduct3203SpecificOutput {
  billingAddress?: AddressPersonal | null;
  shippingAddress?: AddressPersonal | null;
}

export interface PaymentProduct3208SpecificInput {
  merchantFinanceCode?: string | null;
}

export interface PaymentProduct3208SpecificOutput {
  buyerCompliantBankMessage?: string | null;
}

export interface PaymentProduct3209SpecificInput {
  merchantFinanceCode?: string | null;
}

export interface PaymentProduct3209SpecificOutput {
  buyerCompliantBankMessage?: string | null;
}

export interface PaymentProduct320SpecificData {
  gateway?: string | null;
  networks?: string[] | null;
}

export interface PaymentProduct5001SpecificOutput {
  accountNumber?: string | null;
  authorisationCode?: string | null;
  liability?: string | null;
  mobilePhoneNumber?: string | null;
  operationCode?: string | null;
}

export interface PaymentProduct5100SpecificInput {
  brand?: string | null;
}

export interface PaymentProduct5402SpecificOutput {
  brand?: string | null;
}

export interface PaymentProduct5404 {
  appSwitchLink?: string | null;
  qrCodeUrl?: string | null;
}

export interface PaymentProduct5407 {
  pairingToken?: string | null;
  qrCode?: string | null;
}

export interface PaymentProduct5500SpecificOutput {
  entityId?: string | null;
  paymentEndDate?: string | null;
  paymentReference?: string | null;
  paymentStartDate?: string | null;
}

export interface PaymentProduct771SpecificOutput {
  mandateReference?: string | null;
}

export interface PaymentProduct840CustomerAccount {
  accountId?: string | null;
  companyName?: string | null;
  countryCode?: string | null;
  customerAccountStatus?: string | null;
  customerAddressStatus?: string | null;
  firstName?: string | null;
  payerId?: string | null;
  surname?: string | null;
}

export interface PaymentProduct840SpecificOutput {
  billingAddress?: Address | null;
  customerAccount?: PaymentProduct840CustomerAccount | null;
  customerAddress?: Address | null;
  protectionEligibility?: ProtectionEligibility | null;
}

export interface PaymentProductDisplayHints {
  displayOrder?: number | null;
  label?: string | null;
  logo?: string | null;
}

export interface PaymentProductField {
  dataRestrictions?: PaymentProductFieldDataRestrictions | null;
  displayHints?: PaymentProductFieldDisplayHints | null;
  id?: string | null;
  type?: string | null;
}

export interface PaymentProductFieldDataRestrictions {
  isRequired?: boolean | null;
  validators?: PaymentProductFieldValidators | null;
}

export interface PaymentProductFieldDisplayElement {
  id?: string | null;
  label?: string | null;
  type?: string | null;
  value?: string | null;
}

export interface PaymentProductFieldDisplayHints {
  alwaysShow?: boolean | null;
  displayOrder?: number | null;
  formElement?: PaymentProductFieldFormElement | null;
  label?: string | null;
  /**
   * @deprecated Deprecated
   */
  link?: string | null;
  mask?: string | null;
  obfuscate?: boolean | null;
  placeholderLabel?: string | null;
  preferredInputType?: string | null;
  tooltip?: PaymentProductFieldTooltip | null;
}

export interface PaymentProductFieldFormElement {
  type?: string | null;
  /**
   * @deprecated This field is not used by any payment product
   */
  valueMapping?: ValueMappingElement[] | null;
}

export interface PaymentProductFieldTooltip {
  /**
   * @deprecated This field is not used by any payment product Relative URL that can be used to retrieve an image for the tooltip image.
   */
  image?: string | null;
  label?: string | null;
}

export interface PaymentProductFieldValidators {
  emailAddress?: EmptyValidator | null;
  expirationDate?: EmptyValidator | null;
  fixedList?: FixedListValidator | null;
  iban?: EmptyValidator | null;
  length?: LengthValidator | null;
  luhn?: EmptyValidator | null;
  range?: RangeValidator | null;
  regularExpression?: RegularExpressionValidator | null;
  termsAndConditions?: EmptyValidator | null;
}

export interface PaymentProductFilter {
  groups?: string[] | null;
  products?: number[] | null;
}

export interface PaymentProductFilterHostedTokenization {
  products?: number[] | null;
}

export interface PaymentProductFiltersHostedCheckout {
  exclude?: PaymentProductFilter | null;
  restrictTo?: PaymentProductFilter | null;
}

export interface PaymentProductFiltersHostedTokenization {
  exclude?: PaymentProductFilterHostedTokenization | null;
  restrictTo?: PaymentProductFilterHostedTokenization | null;
}

export interface PaymentProductGroup {
  accountOnFile?: AccountOnFile | null;
  displayHints?: PaymentProductDisplayHints | null;
  displayHintsList?: PaymentProductDisplayHints[] | null;
  id?: string | null;
}

export interface PaymentProductNetworksResponse {
  networks?: string[] | null;
}

export interface PaymentReferences {
  merchantParameters?: string | null;
  merchantReference?: string | null;
}

export interface PaymentResponse {
  hostedCheckoutSpecificOutput?: HostedCheckoutSpecificOutput | null;
  id?: string | null;
  paymentOutput?: PaymentOutput | null;
  status?: string | null;
  statusOutput?: PaymentStatusOutput | null;
}

export interface PaymentStatusOutput {
  errors?: APIError[] | null;
  isAuthorized?: boolean | null;
  isCancellable?: boolean | null;
  isRefundable?: boolean | null;
  statusCategory?: string | null;
  statusCode?: number | null;
  statusCodeChangeDateTime?: string | null;
}

export interface PayoutErrorResponse {
  errorId?: string | null;
  errors?: APIError[] | null;
  payoutResult?: PayoutResult | null;
}

export interface PayoutOutput {
  amountOfMoney?: AmountOfMoney | null;
  payoutReason?: string | null;
}

export interface PayoutResponse {
  id?: string | null;
  payoutOutput?: PayoutOutput | null;
  status?: string | null;
  statusOutput?: PayoutStatusOutput | null;
}

export interface PayoutResult {
  id?: string | null;
  payoutOutput?: PayoutOutput | null;
  status?: string | null;
  statusOutput?: PayoutStatusOutput | null;
}

export interface PayoutStatusOutput {
  isCancellable?: boolean | null;
  statusCategory?: string | null;
  statusCode?: number | null;
}

export interface PersonalInformation {
  dateOfBirth?: string | null;
  gender?: string | null;
  name?: PersonalName | null;
}

export interface PersonalInformationToken {
  name?: PersonalNameToken | null;
}

export interface PersonalName {
  firstName?: string | null;
  surname?: string | null;
  title?: string | null;
}

export interface PersonalNameToken {
  firstName?: string | null;
  surname?: string | null;
}

export interface ProductDirectory {
  entries?: DirectoryEntry[] | null;
}

export interface ProtectionEligibility {
  eligibility?: string | null;
  type?: string | null;
}

export interface RangeValidator {
  maxValue?: number | null;
  minValue?: number | null;
}

export interface RateDetails {
  exchangeRate?: number | null;
  invertedExchangeRate?: number | null;
  markUpRate?: number | null;
  quotationDateTime?: string | null;
  source?: string | null;
}

export interface ReattemptInstructions {
  conditions?: ReattemptInstructionsConditions | null;
  frozenPeriod?: number | null;
  indicator?: string | null;
}

export interface ReattemptInstructionsConditions {
  maxAttempts?: number | null;
  maxDelay?: number | null;
}

export interface RedirectData {
  RETURNMAC?: string | null;
  redirectURL?: string | null;
}

export interface RedirectPaymentMethodSpecificInput {
  paymentOption?: string | null;
  paymentProduct3203SpecificInput?: RedirectPaymentProduct3203SpecificInput | null;
  paymentProduct3204SpecificInput?: RedirectPaymentProduct3204SpecificInput | null;
  paymentProduct3302SpecificInput?: RedirectPaymentProduct3302SpecificInput | null;
  paymentProduct3306SpecificInput?: RedirectPaymentProduct3306SpecificInput | null;
  paymentProduct5001SpecificInput?: RedirectPaymentProduct5001SpecificInput | null;
  paymentProduct5300SpecificInput?: RedirectPaymentProduct5300SpecificInput | null;
  paymentProduct5402SpecificInput?: RedirectPaymentProduct5402SpecificInput | null;
  paymentProduct5403SpecificInput?: RedirectPaymentProduct5403SpecificInput | null;
  paymentProduct5406SpecificInput?: RedirectPaymentProduct5406SpecificInput | null;
  paymentProduct5408SpecificInput?: RedirectPaymentProduct5408SpecificInput | null;
  paymentProduct5410SpecificInput?: RedirectPaymentProduct5410SpecificInput | null;
  paymentProduct809SpecificInput?: RedirectPaymentProduct809SpecificInput | null;
  paymentProduct840SpecificInput?: RedirectPaymentProduct840SpecificInput | null;
  paymentProductId?: number | null;
  redirectionData?: RedirectionData | null;
  requiresApproval?: boolean | null;
  token?: string | null;
  tokenize?: boolean | null;
}

export interface RedirectPaymentMethodSpecificOutput {
  authorisationCode?: string | null;
  customerBankAccount?: CustomerBankAccount | null;
  fraudResults?: FraudResults | null;
  paymentOption?: string | null;
  paymentProduct3203SpecificOutput?: PaymentProduct3203SpecificOutput | null;
  paymentProduct5001SpecificOutput?: PaymentProduct5001SpecificOutput | null;
  paymentProduct5402SpecificOutput?: PaymentProduct5402SpecificOutput | null;
  paymentProduct5500SpecificOutput?: PaymentProduct5500SpecificOutput | null;
  paymentProduct840SpecificOutput?: PaymentProduct840SpecificOutput | null;
  paymentProductId?: number | null;
  token?: string | null;
}

export interface RedirectPaymentProduct3203SpecificInput {
  checkoutType?: string | null;
}

export interface RedirectPaymentProduct3204SpecificInput {
  blikCode?: string | null;
}

export interface RedirectPaymentProduct3302SpecificInput {
  organizationEntityType?: string | null;
  organizationRegistrationId?: string | null;
  vatId?: string | null;
}

export interface RedirectPaymentProduct3306SpecificInput {
  extraMerchantData?: string | null;
}

export interface RedirectPaymentProduct5001SpecificInput {
  exemptionRequest?: string | null;
  subsequentType?: string | null;
}

export interface RedirectPaymentProduct5300SpecificInput {
  birthCity?: string | null;
  birthCountry?: string | null;
  birthZipCode?: string | null;
  channel?: string | null;
  loyaltyCardNumber?: string | null;
  secondInstallmentPaymentDate?: string | null;
  sessionDuration?: number | null;
}

export interface RedirectPaymentProduct5402SpecificInput {
  completeRemainingPaymentAmount?: boolean | null;
}

export interface RedirectPaymentProduct5403SpecificInput {
  completeRemainingPaymentAmount?: boolean | null;
}

export interface RedirectPaymentProduct5406SpecificInput {
  customerBankAccount?: CustomerBankAccount | null;
}

export interface RedirectPaymentProduct5408SpecificInput {
  customerBankAccount?: CustomerBankAccount | null;
  instantPaymentOnly?: boolean | null;
}

export interface RedirectPaymentProduct5410SpecificInput {
  secondInstallmentPaymentDate?: string | null;
}

export interface RedirectPaymentProduct809SpecificInput {
  issuerId?: string | null;
}

export interface RedirectPaymentProduct840SpecificInput {
  JavaScriptSdkFlow?: boolean | null;
  addressSelectionAtPayPal?: boolean | null;
  custom?: string | null;
  payLater?: boolean | null;
}

export interface RedirectionData {
  returnUrl?: string | null;
}

export interface RefundCardMethodSpecificOutput {
  currencyConversion?: CurrencyConversion | null;
  totalAmountPaid?: number | null;
  totalAmountRefunded?: number | null;
}

export interface RefundEWalletMethodSpecificOutput {
  paymentProduct840SpecificOutput?: RefundPaymentProduct840SpecificOutput | null;
  totalAmountPaid?: number | null;
  totalAmountRefunded?: number | null;
}

export interface RefundErrorResponse {
  errorId?: string | null;
  errors?: APIError[] | null;
  refundResult?: RefundResponse | null;
}

export interface RefundMobileMethodSpecificOutput {
  network?: string | null;
  totalAmountPaid?: number | null;
  totalAmountRefunded?: number | null;
}

export interface RefundOutput {
  amountOfMoney?: AmountOfMoney | null;
  amountPaid?: number | null;
  cardRefundMethodSpecificOutput?: RefundCardMethodSpecificOutput | null;
  eWalletRefundMethodSpecificOutput?: RefundEWalletMethodSpecificOutput | null;
  merchantParameters?: string | null;
  mobileRefundMethodSpecificOutput?: RefundMobileMethodSpecificOutput | null;
  operationReferences?: OperationPaymentReferences | null;
  paymentMethod?: string | null;
  redirectRefundMethodSpecificOutput?: RefundRedirectMethodSpecificOutput | null;
  references?: PaymentReferences | null;
}

export interface RefundPaymentProduct840CustomerAccount {
  customerAccountStatus?: string | null;
  customerAddressStatus?: string | null;
  payerId?: string | null;
}

export interface RefundPaymentProduct840SpecificOutput {
  customerAccount?: RefundPaymentProduct840CustomerAccount | null;
}

export interface RefundRedirectMethodSpecificOutput {
  totalAmountPaid?: number | null;
  totalAmountRefunded?: number | null;
}

export interface RefundRequest {
  amountOfMoney?: AmountOfMoney | null;
  captureId?: string | null;
  operationReferences?: OperationPaymentReferences | null;
  references?: PaymentReferences | null;
}

export interface RefundResponse {
  id?: string | null;
  refundOutput?: RefundOutput | null;
  status?: string | null;
  statusOutput?: OrderStatusOutput | null;
}

export interface RefundsResponse {
  refunds?: RefundResponse[] | null;
}

export interface RegularExpressionValidator {
  regularExpression?: string | null;
}

export interface SendTestRequest {
  url?: string | null;
}

export interface SepaDirectDebitPaymentMethodSpecificInput {
  paymentProduct771SpecificInput?: SepaDirectDebitPaymentProduct771SpecificInput | null;
  paymentProductId?: number | null;
}

export interface SepaDirectDebitPaymentMethodSpecificInputBase {
  paymentProduct771SpecificInput?: SepaDirectDebitPaymentProduct771SpecificInputBase | null;
  paymentProductId?: number | null;
}

export interface SepaDirectDebitPaymentMethodSpecificOutput {
  fraudResults?: FraudResults | null;
  paymentProduct771SpecificOutput?: PaymentProduct771SpecificOutput | null;
  paymentProductId?: number | null;
}

export interface SepaDirectDebitPaymentProduct771SpecificInput {
  existingUniqueMandateReference?: string | null;
  mandate?: CreateMandateWithReturnUrl | null;
}

export interface SepaDirectDebitPaymentProduct771SpecificInputBase {
  existingUniqueMandateReference?: string | null;
  mandate?: CreateMandateRequest | null;
}

export interface SessionRequest {
  tokens?: string[] | null;
}

export interface SessionResponse {
  assetUrl?: string | null;
  clientApiUrl?: string | null;
  clientSessionId?: string | null;
  customerId?: string | null;
  invalidTokens?: string[] | null;
}

export interface Shipping {
  address?: AddressPersonal | null;
  addressIndicator?: string | null;
  emailAddress?: string | null;
  firstUsageDate?: string | null;
  isFirstUsage?: boolean | null;
  method?: ShippingMethod | null;
  shippingCost?: number | null;
  shippingCostTax?: number | null;
  type?: string | null;
}

export interface ShippingMethod {
  details?: string | null;
  name?: string | null;
  speed?: number | null;
  type?: string | null;
}

export interface ShoppingCart {
  /**
   * @deprecated Use order.shipping.shippingCost for shipping cost. Other amounts are not used. Determines how the total amount is split into amount types
   */
  amountBreakdown?: AmountBreakdown[] | null;
  giftCardPurchase?: GiftCardPurchase | null;
  isPreOrder?: boolean | null;
  items?: LineItem[] | null;
  preOrderItemAvailabilityDate?: string | null;
  reOrderIndicator?: boolean | null;
}

export interface ShowFormData {
  paymentProduct3012?: PaymentProduct3012 | null;
  paymentProduct5404?: PaymentProduct5404 | null;
  paymentProduct5407?: PaymentProduct5407 | null;
}

export interface ShowInstructionsData {
  showData?: string | null;
}

export interface SubsequentCardPaymentMethodSpecificInput {
  authorizationMode?: string | null;
  paymentNumber?: number | null;
  /**
   * @deprecated Deprecated
   */
  schemeReferenceData?: string | null;
  subsequentType?: string | null;
  /**
   * @deprecated ID of the token to use to create the payment.
   */
  token?: string | null;
  transactionChannel?: string | null;
}

export interface SubsequentPaymentProduct5001SpecificInput {
  subsequentType?: string | null;
}

export interface SubsequentPaymentRequest {
  order?: Order | null;
  subsequentPaymentProduct5001SpecificInput?: SubsequentPaymentProduct5001SpecificInput | null;
  subsequentcardPaymentMethodSpecificInput?: SubsequentCardPaymentMethodSpecificInput | null;
}

export interface SubsequentPaymentResponse {
  payment?: PaymentResponse | null;
}

export interface Surcharge {
  netAmount?: AmountOfMoney | null;
  paymentProductId?: number | null;
  result?: string | null;
  surchargeAmount?: AmountOfMoney | null;
  surchargeRate?: SurchargeRate | null;
  totalAmount?: AmountOfMoney | null;
}

export interface SurchargeCalculationCard {
  cardNumber?: string | null;
  paymentProductId?: number | null;
}

export interface SurchargeForPaymentLink {
  surchargeMode?: string | null;
}

export interface SurchargeRate {
  adValoremRate?: number | null;
  specificRate?: number | null;
  surchargeProductTypeId?: string | null;
  surchargeProductTypeVersion?: string | null;
}

export interface SurchargeSpecificInput {
  mode?: string | null;
  surchargeAmount?: AmountOfMoney | null;
}

export interface SurchargeSpecificOutput {
  mode?: string | null;
  surchargeAmount?: AmountOfMoney | null;
  surchargeRate?: SurchargeRate | null;
}

export interface TestConnection {
  result?: string | null;
}

export interface ThreeDSecure {
  authenticationAmount?: number | null;
  challengeCanvasSize?: string | null;
  challengeIndicator?: string | null;
  deviceChannel?: string | null;
  exemptionRequest?: string | null;
  externalCardholderAuthenticationData?: ExternalCardholderAuthenticationData | null;
  merchantFraudRate?: number | null;
  priorThreeDSecureData?: ThreeDSecureData | null;
  redirectionData?: RedirectionData | null;
  secureCorporatePayment?: boolean | null;
  skipAuthentication?: boolean | null;
  skipSoftDecline?: boolean | null;
}

export interface ThreeDSecureBase {
  authenticationAmount?: number | null;
  challengeCanvasSize?: string | null;
  challengeIndicator?: string | null;
  exemptionRequest?: string | null;
  merchantFraudRate?: number | null;
  priorThreeDSecureData?: ThreeDSecureData | null;
  secureCorporatePayment?: boolean | null;
  skipAuthentication?: boolean | null;
  skipSoftDecline?: boolean | null;
}

export interface ThreeDSecureData {
  acsTransactionId?: string | null;
  method?: string | null;
  utcTimestamp?: string | null;
}

export interface ThreeDSecureResults {
  acsTransactionId?: string | null;
  appliedExemption?: string | null;
  authenticationStatus?: string | null;
  cavv?: string | null;
  challengeIndicator?: string | null;
  dsTransactionId?: string | null;
  eci?: string | null;
  exemptionEngineFlow?: string | null;
  flow?: string | null;
  liability?: string | null;
  schemeEci?: string | null;
  version?: string | null;
  xid?: string | null;
}

export interface TokenCard {
  alias?: string | null;
  data?: TokenCardData | null;
}

export interface TokenCardData {
  cardWithoutCvv?: CardWithoutCvv | null;
  cobrandSelectionIndicator?: string | null;
}

export interface TokenCardSpecificInput {
  data?: TokenData | null;
}

export interface TokenData {
  card?: Card | null;
  cobrandSelectionIndicator?: string | null;
}

export interface TokenEWallet {
  /**
   * @deprecated This field is not used by any payment product An alias for the token. This can be used to visually represent the token.
   */
  alias?: string | null;
  customer?: CustomerToken | null;
}

export interface TokenResponse {
  card?: TokenCard | null;
  eWallet?: TokenEWallet | null;
  externalTokenLinked?: ExternalTokenLinked | null;
  id?: string | null;
  isTemporary?: boolean | null;
  paymentProductId?: number | null;
}

export interface Transaction {
  amount?: AmountOfMoney | null;
}

export interface ValidateCredentialsRequest {
  key?: string | null;
  secret?: string | null;
}

export interface ValidateCredentialsResponse {
  result?: string | null;
}

export interface ValueMappingElement {
  displayElements?: PaymentProductFieldDisplayElement[] | null;
  value?: string | null;
}

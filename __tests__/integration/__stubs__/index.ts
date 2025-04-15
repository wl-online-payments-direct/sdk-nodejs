import createHostedCheckout from "./hostedCheckouts/create.json";
import createHostedMandateManagement from "./hostedMandateManagements/create.json";
import createPayment from "./payments/create.json";
import completePayment from "./payments/complete.json";
import tokenizePayment from "./payments/tokenize.json";
import approvePayment from "./payments/approve.json";
import capturePayment from "./payments/capture.json";
import refundPayment from "./payments/refund.json";
import createPaymentDispute from "./payments/dispute.json";
import approveRefund from "./refunds/approve.json";
import createPayout from "./payouts/create.json";
import getDeviceFingerprintForGroups from "./productGroups/deviceFingerprint.json";
import getCustomerDetails from "./products/customerDetails.json";
import getDeviceFingerprint from "./products/deviceFingerprint.json";
import createPaymentProductSession from "./products/sessions.json";
import riskAssessmentBankAccount from "./riskAssessments/bankAccounts.json";
import riskAssessmentCards from "./riskAssessments/cards.json";
import convertBankAccount from "./services/bankAccount.json";
import iinDetails from "./services/getIINdetails.json";
import createToken from "./tokens/create.json";
import updateToken from "./tokens/update.json";
import approveSepaDirectDebitToken from "./tokens/approveSepaDirectDebit.json";
import createMandate from "./mandates/create.json";
import createMandateWithReference from "./mandates/createWithMandateReference.json";
import createSession from "./sessions/create.json";

export default {
  createHostedCheckout,
  createHostedMandateManagement,
  createPayment,
  completePayment,
  tokenizePayment,
  approvePayment,
  capturePayment,
  refundPayment,
  createPaymentDispute,
  approveRefund,
  createPayout,
  getDeviceFingerprintForGroups,
  getCustomerDetails,
  getDeviceFingerprint,
  createPaymentProductSession,
  riskAssessmentBankAccount,
  riskAssessmentCards,
  convertBankAccount,
  iinDetails,
  createToken,
  updateToken,
  approveSepaDirectDebitToken,
  createMandate,
  createMandateWithReference,
  createSession
};

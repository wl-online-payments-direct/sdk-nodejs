/*
 * This file was automatically generated.
 */
import { json } from "../../utils/communicator.js";
import { PaymentContext, SdkContext, SdkResponse } from "../../model/index.js";
import { ErrorResponse, TestConnection } from "../model/domain/index.js";

export function testConnection(sdkContext: SdkContext): (merchantId: string, paymentContext?: PaymentContext | null) => Promise<SdkResponse<TestConnection, ErrorResponse>> {
  return function(merchantId, paymentContext): Promise<SdkResponse<TestConnection, ErrorResponse>> {
    return json(
      {
        method: "GET",
        modulePath: `/v2/${merchantId}/services/testconnection`,
        body: null,
        paymentContext: paymentContext
      },
      sdkContext
    ) as Promise<SdkResponse<TestConnection, ErrorResponse>>;
  };
}

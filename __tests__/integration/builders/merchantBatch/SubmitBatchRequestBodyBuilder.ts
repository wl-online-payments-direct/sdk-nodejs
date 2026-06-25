import { v4 as uuidv4 } from "uuid";
import { CreatePaymentRequest, SubmitBatchRequestBody } from "../../../../src/generated/model/domain/index.js";

export class SubmitBatchRequestBodyBuilder {
  private merchantBatchReference = `Ref-${uuidv4()}`;
  private operationType = "CreatePayment";
  private createPaymentRequests: CreatePaymentRequest[] = [];
  private itemCount = 0;

  withMerchantBatchReference(ref: string): this {
    this.merchantBatchReference = ref;
    return this;
  }

  withOperationType(operationType: string): this {
    this.operationType = operationType;
    return this;
  }

  withItemCount(itemCount: number): this {
    this.itemCount = itemCount;
    return this;
  }

  withCreatePaymentRequests(requests: CreatePaymentRequest[]): this {
    this.createPaymentRequests = requests;
    return this;
  }

  build(): SubmitBatchRequestBody {
    return {
      header: {
        merchantBatchReference: this.merchantBatchReference,
        itemCount: this.itemCount,
        operationType: this.operationType
      },
      createPayments: this.createPaymentRequests.length > 0 ? this.createPaymentRequests : undefined
    };
  }
}

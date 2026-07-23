export interface CreatePurchaseOrderRequest {
  supplierId: string;
  expectedDeliveryDate: string;
  notes: string;
}

export interface AddPurchaseOrderLineRequest {
  itemId: string;
  quantity: number;
  unitPrice: number;
  expectedDeliveryDate: string;
}

export interface SubmitPurchaseOrderRequest {}

export interface ApprovePurchaseOrderRequest {
  approvedBy: string;
}

export interface RejectPurchaseOrderRequest {}

export interface CancelPurchaseOrderRequest {
  reason: string;
}

export interface IssuePurchaseOrderRequest {}

export interface ReceiveGoodsRequest {
  lineId: string;
  quantity: number;
}

export interface CreateSupplierRequest {
  name: string;
  contactEmail: string;
}

export interface QualifySupplierRequest {
  qualificationLevel: string;
}

export interface SuspendSupplierRequest {}

export interface CreateRfqRequest {
  itemId: string;
  requiredQuantity: number;
  requiredByDate: string;
}

export interface AddRfqTargetSupplierRequest {
  supplierId: string;
}

export interface PublishRfqRequest {}

export interface SubmitQuotationRequest {
  rfqId: string;
  supplierId: string;
  unitPrice: number;
  leadTimeDays: number;
  validUntil: string;
}

export interface AcceptQuotationRequest {}

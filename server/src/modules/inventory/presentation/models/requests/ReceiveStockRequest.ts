export interface ReceiveStockRequest {
  readonly locationId: string;
  readonly quantity: number;
  readonly purchaseOrderId?: string;
  readonly batchNumber?: string;
  readonly serialNumber?: string;
  readonly expirationDate?: string;
  readonly notes?: string;
}

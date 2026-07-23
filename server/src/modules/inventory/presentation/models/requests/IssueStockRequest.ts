export interface IssueStockRequest {
  readonly locationId: string;
  readonly quantity: number;
  readonly salesOrderId?: string;
  readonly batchNumber?: string;
  readonly serialNumber?: string;
  readonly notes?: string;
}

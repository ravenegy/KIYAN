export interface AdjustStockRequest {
  readonly locationId: string;
  readonly quantity: number;
  readonly reason: string;
  readonly referenceId?: string;
}

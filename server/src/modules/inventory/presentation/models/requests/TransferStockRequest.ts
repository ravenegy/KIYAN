export interface TransferStockRequest {
  readonly sourceLocationId: string;
  readonly destinationLocationId: string;
  readonly quantity: number;
  readonly referenceId?: string;
  readonly notes?: string;
}

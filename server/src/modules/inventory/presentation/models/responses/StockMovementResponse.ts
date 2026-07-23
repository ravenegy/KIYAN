export interface StockMovementResponse {
  readonly id: string;
  readonly inventoryItemId: string;
  readonly locationId: string;
  readonly movementType: string;
  readonly quantity: number;
  readonly referenceType: string;
  readonly referenceId: string;
  readonly notes?: string;
  readonly createdAt: string;
}

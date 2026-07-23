export interface StockMovementDto {
  readonly id: string;
  readonly inventoryItemId: string;
  readonly type: string;
  readonly locationId: string;
  readonly quantity: number;
  readonly timestamp: string;
}

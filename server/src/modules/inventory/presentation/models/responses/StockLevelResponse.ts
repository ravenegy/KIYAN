export interface StockLevelResponse {
  readonly id: string;
  readonly inventoryItemId: string;
  readonly locationId: string;
  readonly quantity: number;
  readonly availableQuantity: number;
  readonly reservedQuantity: number;
  readonly quarantinedQuantity: number;
  readonly totalQuantity: number;
  readonly lastUpdated: string;
}

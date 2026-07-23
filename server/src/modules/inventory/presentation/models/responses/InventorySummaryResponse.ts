export interface InventorySummaryResponse {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly status: string;
  readonly totalQuantity: number;
  readonly availableQuantity: number;
}

export interface InventorySummaryDto {
  readonly totalItems: number;
  readonly lowStockItems: number;
  readonly outOfStockItems: number;
}

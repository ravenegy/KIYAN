import { StockLevelDto } from './StockLevelDto';

export interface InventoryItemDto {
  readonly id: string;
  readonly sku: string;
  readonly category: string;
  readonly name: string;
  readonly isActive: boolean;
  readonly stockLevels: ReadonlyArray<StockLevelDto>;
  readonly createdAt: string;
  readonly updatedAt?: string;
}

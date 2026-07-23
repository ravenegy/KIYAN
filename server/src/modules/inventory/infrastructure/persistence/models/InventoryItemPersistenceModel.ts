import { StockLevelPersistenceModel } from './StockLevelPersistenceModel';

export interface InventoryItemPersistenceModel {
  readonly id: string;
  readonly sku: string;
  readonly category: string;
  readonly name: string;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt?: Date;
  readonly version: number;
  readonly stockLevels: ReadonlyArray<StockLevelPersistenceModel>;
}

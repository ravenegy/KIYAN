import { Result } from '../../../../core';
import { StockLevelDto } from '../dto/StockLevelDto';

export interface IStockReadService {
  getStockLevels(inventoryItemId: string): Promise<Result<ReadonlyArray<StockLevelDto>>>;
}

import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { StockLevelDto } from '../dto/StockLevelDto';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';

export class GetStockLevelsQuery implements IQuery<Result<ReadonlyArray<StockLevelDto>>> {
  public readonly type: string = 'GetStockLevelsQuery';
  constructor(
    public readonly inventoryItemId: InventoryItemId
  ) {}
}

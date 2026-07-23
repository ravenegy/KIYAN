import { IStockReadService } from '../IStockReadService';
import { Result, ResultFactory } from '../../../../../core';
import { StockLevelDto } from '../../dto/StockLevelDto';
import { GetStockLevelsQuery } from '../../queries/GetStockLevelsQuery';
import { IMediator } from '../../../../../core/mediator/IMediator';
import { InventoryItemId } from '../../../domain/shared/InventoryItemId';

export class StockReadService implements IStockReadService {
  constructor(private readonly mediator: IMediator) {}

  async getStockLevels(inventoryItemId: string): Promise<Result<ReadonlyArray<StockLevelDto>>> {
    const idResult = InventoryItemId.create(inventoryItemId);
    if (idResult.isFailure) return ResultFactory.failure(idResult.error!, idResult.errors ? [...idResult.errors] : undefined);
    return this.mediator.query(new GetStockLevelsQuery(idResult.value!));
  }
}

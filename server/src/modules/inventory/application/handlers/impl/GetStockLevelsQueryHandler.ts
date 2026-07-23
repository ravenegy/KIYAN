import { BaseQueryHandler } from '../../../../../core/application/handlers/BaseQueryHandler';
import { Result, ResultFactory } from '../../../../../core';
import { GetStockLevelsQuery } from '../../queries/GetStockLevelsQuery';
import { IGetStockLevelsQueryHandler } from '../IGetStockLevelsQueryHandler';
import { StockLevelDto } from '../../dto/StockLevelDto';

export class GetStockLevelsQueryHandler extends BaseQueryHandler<GetStockLevelsQuery, ReadonlyArray<StockLevelDto>> implements IGetStockLevelsQueryHandler {
  constructor() {
    super();
  }

  async handle(query: GetStockLevelsQuery): Promise<Result<ReadonlyArray<StockLevelDto>>> {
    return ResultFactory.success([]);
  }
}

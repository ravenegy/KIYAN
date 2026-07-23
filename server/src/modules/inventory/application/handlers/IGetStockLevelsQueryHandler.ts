import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetStockLevelsQuery } from '../queries/GetStockLevelsQuery';
import { Result } from '../../../../core';
import { StockLevelDto } from '../dto/StockLevelDto';

export interface IGetStockLevelsQueryHandler extends IQueryHandler<GetStockLevelsQuery, Result<ReadonlyArray<StockLevelDto>>> {}

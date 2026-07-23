import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetInventoryItemsQuery } from '../queries/GetInventoryItemsQuery';
import { Result } from '../../../../core';
import { PagedInventoryDto } from '../dto/PagedInventoryDto';

export interface IGetInventoryItemsQueryHandler extends IQueryHandler<GetInventoryItemsQuery, Result<PagedInventoryDto>> {}

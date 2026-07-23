import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetInventoryBySkuQuery } from '../queries/GetInventoryBySkuQuery';
import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';

export interface IGetInventoryBySkuQueryHandler extends IQueryHandler<GetInventoryBySkuQuery, Result<InventoryItemDto>> {}

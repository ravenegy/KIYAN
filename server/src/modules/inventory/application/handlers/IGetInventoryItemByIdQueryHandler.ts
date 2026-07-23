import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetInventoryItemByIdQuery } from '../queries/GetInventoryItemByIdQuery';
import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';

export interface IGetInventoryItemByIdQueryHandler extends IQueryHandler<GetInventoryItemByIdQuery, Result<InventoryItemDto>> {}

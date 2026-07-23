import { BaseQueryHandler } from '../../../../../core/application/handlers/BaseQueryHandler';
import { Result, ResultFactory } from '../../../../../core';
import { GetInventoryItemByIdQuery } from '../../queries/GetInventoryItemByIdQuery';
import { IGetInventoryItemByIdQueryHandler } from '../IGetInventoryItemByIdQueryHandler';
import { InventoryItemDto } from '../../dto/InventoryItemDto';

export class GetInventoryItemByIdQueryHandler extends BaseQueryHandler<GetInventoryItemByIdQuery, InventoryItemDto> implements IGetInventoryItemByIdQueryHandler {
  constructor() {
    super();
  }

  async handle(query: GetInventoryItemByIdQuery): Promise<Result<InventoryItemDto>> {
    return ResultFactory.success({} as InventoryItemDto);
  }
}

import { BaseQueryHandler } from '../../../../../core/application/handlers/BaseQueryHandler';
import { Result, ResultFactory } from '../../../../../core';
import { GetInventoryBySkuQuery } from '../../queries/GetInventoryBySkuQuery';
import { IGetInventoryBySkuQueryHandler } from '../IGetInventoryBySkuQueryHandler';
import { InventoryItemDto } from '../../dto/InventoryItemDto';

export class GetInventoryBySkuQueryHandler extends BaseQueryHandler<GetInventoryBySkuQuery, InventoryItemDto> implements IGetInventoryBySkuQueryHandler {
  constructor() {
    super();
  }

  async handle(query: GetInventoryBySkuQuery): Promise<Result<InventoryItemDto>> {
    return ResultFactory.success({} as InventoryItemDto);
  }
}

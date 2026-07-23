import { BaseQueryHandler } from '../../../../../core/application/handlers/BaseQueryHandler';
import { Result, ResultFactory } from '../../../../../core';
import { GetInventoryItemsQuery } from '../../queries/GetInventoryItemsQuery';
import { IGetInventoryItemsQueryHandler } from '../IGetInventoryItemsQueryHandler';
import { PagedInventoryDto } from '../../dto/PagedInventoryDto';

export class GetInventoryItemsQueryHandler extends BaseQueryHandler<GetInventoryItemsQuery, PagedInventoryDto> implements IGetInventoryItemsQueryHandler {
  constructor() {
    super();
  }

  async handle(query: GetInventoryItemsQuery): Promise<Result<PagedInventoryDto>> {
    return ResultFactory.success({ items: [], totalCount: 0, pageNumber: 1, pageSize: 10 } as PagedInventoryDto);
  }
}

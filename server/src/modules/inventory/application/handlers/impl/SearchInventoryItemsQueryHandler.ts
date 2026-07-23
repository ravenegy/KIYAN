import { BaseQueryHandler } from '../../../../../core/application/handlers/BaseQueryHandler';
import { Result, ResultFactory } from '../../../../../core';
import { SearchInventoryItemsQuery } from '../../queries/SearchInventoryItemsQuery';
import { ISearchInventoryItemsQueryHandler } from '../ISearchInventoryItemsQueryHandler';
import { PagedInventoryDto } from '../../dto/PagedInventoryDto';

export class SearchInventoryItemsQueryHandler extends BaseQueryHandler<SearchInventoryItemsQuery, PagedInventoryDto> implements ISearchInventoryItemsQueryHandler {
  constructor() {
    super();
  }

  async handle(query: SearchInventoryItemsQuery): Promise<Result<PagedInventoryDto>> {
    return ResultFactory.success({ items: [], totalCount: 0, pageNumber: 1, pageSize: 10 } as PagedInventoryDto);
  }
}

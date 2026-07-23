import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { PagedInventoryDto } from '../dto/PagedInventoryDto';

export class SearchInventoryItemsQuery implements IQuery<Result<PagedInventoryDto>> {
  public readonly type: string = 'SearchInventoryItemsQuery';
  constructor(
    public readonly searchTerm: string,
    public readonly category: string | undefined,
    public readonly pageNumber: number,
    public readonly pageSize: number
  ) {}
}

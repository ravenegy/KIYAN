import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { PagedInventoryDto } from '../dto/PagedInventoryDto';

export class GetInventoryItemsQuery implements IQuery<Result<PagedInventoryDto>> {
  public readonly type: string = 'GetInventoryItemsQuery';
  constructor(
    public readonly pageNumber: number,
    public readonly pageSize: number
  ) {}
}

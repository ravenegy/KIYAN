import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';

export class GetInventoryItemByIdQuery implements IQuery<Result<InventoryItemDto>> {
  public readonly type: string = 'GetInventoryItemByIdQuery';
  constructor(
    public readonly id: InventoryItemId
  ) {}
}

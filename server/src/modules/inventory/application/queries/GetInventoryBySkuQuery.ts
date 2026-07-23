import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core';
import { InventoryItemDto } from '../dto/InventoryItemDto';
import { SKU } from '../../domain/value-objects/SKU';

export class GetInventoryBySkuQuery implements IQuery<Result<InventoryItemDto>> {
  public readonly type: string = 'GetInventoryBySkuQuery';
  constructor(
    public readonly sku: SKU
  ) {}
}

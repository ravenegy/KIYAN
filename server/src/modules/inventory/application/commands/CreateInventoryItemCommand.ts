import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { ItemCategory } from '../../domain/enums/ItemCategory';
import { SKU } from '../../domain/value-objects/SKU';

export class CreateInventoryItemCommand implements ICommand<Result<string>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'CreateInventoryItemCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly sku: SKU,
    public readonly category: ItemCategory,
    public readonly name: string
  ) {}
}

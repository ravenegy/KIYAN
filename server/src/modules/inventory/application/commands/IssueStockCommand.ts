import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';
import { StockLocationId } from '../../domain/shared/StockLocationId';
import { Quantity } from '../../domain/value-objects/Quantity';

export class IssueStockCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'IssueStockCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly inventoryItemId: InventoryItemId,
    public readonly locationId: StockLocationId,
    public readonly quantity: Quantity
  ) {}
}

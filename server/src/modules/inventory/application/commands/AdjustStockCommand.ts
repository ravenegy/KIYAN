import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';
import { StockLocationId } from '../../domain/shared/StockLocationId';
import { Quantity } from '../../domain/value-objects/Quantity';

export class AdjustStockCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'AdjustStockCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly inventoryItemId: InventoryItemId,
    public readonly locationId: StockLocationId,
    public readonly newQuantity: Quantity,
    public readonly reason: string
  ) {}
}

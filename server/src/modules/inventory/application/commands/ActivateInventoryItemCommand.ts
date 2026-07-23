import { ICommand } from '../../../../core/mediator/commands/ICommand';
import * as crypto from 'crypto';
import { Result } from '../../../../core';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';

export class ActivateInventoryItemCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'ActivateInventoryItemCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly targetId: InventoryItemId
  ) {}
}

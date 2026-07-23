import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { Result, ResultFactory } from '../../../../../core';
import { DeactivateInventoryItemCommand } from '../../commands/DeactivateInventoryItemCommand';
import { IDeactivateInventoryItemCommandHandler } from '../IDeactivateInventoryItemCommandHandler';

export class DeactivateInventoryItemCommandHandler extends BaseCommandHandler<DeactivateInventoryItemCommand, void> implements IDeactivateInventoryItemCommandHandler {
  constructor() {
    super();
  }

  async handle(command: DeactivateInventoryItemCommand): Promise<Result<void>> {
    return ResultFactory.success(undefined);
  }
}

import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { Result, ResultFactory } from '../../../../../core';
import { ActivateInventoryItemCommand } from '../../commands/ActivateInventoryItemCommand';
import { IActivateInventoryItemCommandHandler } from '../IActivateInventoryItemCommandHandler';

export class ActivateInventoryItemCommandHandler extends BaseCommandHandler<ActivateInventoryItemCommand, void> implements IActivateInventoryItemCommandHandler {
  constructor() {
    super();
  }

  async handle(command: ActivateInventoryItemCommand): Promise<Result<void>> {
    return ResultFactory.success(undefined);
  }
}

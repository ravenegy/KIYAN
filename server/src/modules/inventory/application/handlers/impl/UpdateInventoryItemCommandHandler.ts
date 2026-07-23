import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { Result, ResultFactory } from '../../../../../core';
import { UpdateInventoryItemCommand } from '../../commands/UpdateInventoryItemCommand';
import { IUpdateInventoryItemCommandHandler } from '../IUpdateInventoryItemCommandHandler';

export class UpdateInventoryItemCommandHandler extends BaseCommandHandler<UpdateInventoryItemCommand, void> implements IUpdateInventoryItemCommandHandler {
  constructor() {
    super();
  }

  async handle(command: UpdateInventoryItemCommand): Promise<Result<void>> {
    return ResultFactory.success(undefined);
  }
}

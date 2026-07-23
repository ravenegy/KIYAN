import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { Result, ResultFactory } from '../../../../../core';
import { DeleteInventoryItemCommand } from '../../commands/DeleteInventoryItemCommand';
import { IDeleteInventoryItemCommandHandler } from '../IDeleteInventoryItemCommandHandler';

export class DeleteInventoryItemCommandHandler extends BaseCommandHandler<DeleteInventoryItemCommand, void> implements IDeleteInventoryItemCommandHandler {
  constructor() {
    super();
  }

  async handle(command: DeleteInventoryItemCommand): Promise<Result<void>> {
    return ResultFactory.success(undefined);
  }
}

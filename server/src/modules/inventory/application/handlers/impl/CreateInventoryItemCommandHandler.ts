import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { Result, ResultFactory } from '../../../../../core';
import { CreateInventoryItemCommand } from '../../commands/CreateInventoryItemCommand';
import { ICreateInventoryItemCommandHandler } from '../ICreateInventoryItemCommandHandler';

export class CreateInventoryItemCommandHandler extends BaseCommandHandler<CreateInventoryItemCommand, string> implements ICreateInventoryItemCommandHandler {
  constructor() {
    super();
  }

  async handle(command: CreateInventoryItemCommand): Promise<Result<string>> {
    return ResultFactory.success('mock-id');
  }
}

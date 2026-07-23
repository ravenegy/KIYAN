import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { Result, ResultFactory } from '../../../../../core';
import { ReceiveStockCommand } from '../../commands/ReceiveStockCommand';
import { IReceiveStockCommandHandler } from '../IReceiveStockCommandHandler';

export class ReceiveStockCommandHandler extends BaseCommandHandler<ReceiveStockCommand, void> implements IReceiveStockCommandHandler {
  constructor() {
    super();
  }

  async handle(command: ReceiveStockCommand): Promise<Result<void>> {
    return ResultFactory.success(undefined);
  }
}

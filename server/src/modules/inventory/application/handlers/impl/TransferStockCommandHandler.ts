import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { Result, ResultFactory } from '../../../../../core';
import { TransferStockCommand } from '../../commands/TransferStockCommand';
import { ITransferStockCommandHandler } from '../ITransferStockCommandHandler';

export class TransferStockCommandHandler extends BaseCommandHandler<TransferStockCommand, void> implements ITransferStockCommandHandler {
  constructor() {
    super();
  }

  async handle(command: TransferStockCommand): Promise<Result<void>> {
    return ResultFactory.success(undefined);
  }
}

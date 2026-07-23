import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { Result, ResultFactory } from '../../../../../core';
import { AdjustStockCommand } from '../../commands/AdjustStockCommand';
import { IAdjustStockCommandHandler } from '../IAdjustStockCommandHandler';

export class AdjustStockCommandHandler extends BaseCommandHandler<AdjustStockCommand, void> implements IAdjustStockCommandHandler {
  constructor() {
    super();
  }

  async handle(command: AdjustStockCommand): Promise<Result<void>> {
    return ResultFactory.success(undefined);
  }
}

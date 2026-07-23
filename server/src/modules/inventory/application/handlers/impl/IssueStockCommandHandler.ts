import { BaseCommandHandler } from '../../../../../core/application/handlers/BaseCommandHandler';
import { Result, ResultFactory } from '../../../../../core';
import { IssueStockCommand } from '../../commands/IssueStockCommand';
import { IIssueStockCommandHandler } from '../IIssueStockCommandHandler';

export class IssueStockCommandHandler extends BaseCommandHandler<IssueStockCommand, void> implements IIssueStockCommandHandler {
  constructor() {
    super();
  }

  async handle(command: IssueStockCommand): Promise<Result<void>> {
    return ResultFactory.success(undefined);
  }
}

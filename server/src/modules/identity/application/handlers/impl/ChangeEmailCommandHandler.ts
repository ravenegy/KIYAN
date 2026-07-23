import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IChangeEmailCommandHandler } from '../IChangeEmailCommandHandler';
import { ChangeEmailCommand } from '../../commands';

export class ChangeEmailCommandHandler
  extends BaseCommandHandler<ChangeEmailCommand, void>
  implements IChangeEmailCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: ChangeEmailCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

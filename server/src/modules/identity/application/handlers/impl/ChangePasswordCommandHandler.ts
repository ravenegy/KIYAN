import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IChangePasswordCommandHandler } from '../IChangePasswordCommandHandler';
import { ChangePasswordCommand } from '../../commands';

export class ChangePasswordCommandHandler
  extends BaseCommandHandler<ChangePasswordCommand, void>
  implements IChangePasswordCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: ChangePasswordCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

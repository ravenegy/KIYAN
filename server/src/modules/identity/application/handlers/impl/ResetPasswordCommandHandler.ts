import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IResetPasswordCommandHandler } from '../IResetPasswordCommandHandler';
import { ResetPasswordCommand } from '../../commands';

export class ResetPasswordCommandHandler
  extends BaseCommandHandler<ResetPasswordCommand, void>
  implements IResetPasswordCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: ResetPasswordCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { ILockUserCommandHandler } from '../ILockUserCommandHandler';
import { LockUserCommand } from '../../commands';

export class LockUserCommandHandler
  extends BaseCommandHandler<LockUserCommand, void>
  implements ILockUserCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: LockUserCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

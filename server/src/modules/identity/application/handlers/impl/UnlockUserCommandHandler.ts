import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IUnlockUserCommandHandler } from '../IUnlockUserCommandHandler';
import { UnlockUserCommand } from '../../commands';

export class UnlockUserCommandHandler
  extends BaseCommandHandler<UnlockUserCommand, void>
  implements IUnlockUserCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: UnlockUserCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IActivateUserCommandHandler } from '../IActivateUserCommandHandler';
import { ActivateUserCommand } from '../../commands';

export class ActivateUserCommandHandler
  extends BaseCommandHandler<ActivateUserCommand, void>
  implements IActivateUserCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: ActivateUserCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

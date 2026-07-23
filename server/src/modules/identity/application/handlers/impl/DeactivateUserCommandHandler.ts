import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IDeactivateUserCommandHandler } from '../IDeactivateUserCommandHandler';
import { DeactivateUserCommand } from '../../commands';

export class DeactivateUserCommandHandler
  extends BaseCommandHandler<DeactivateUserCommand, void>
  implements IDeactivateUserCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: DeactivateUserCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

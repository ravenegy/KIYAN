import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IUpdateUserCommandHandler } from '../IUpdateUserCommandHandler';
import { UpdateUserCommand } from '../../commands';

export class UpdateUserCommandHandler
  extends BaseCommandHandler<UpdateUserCommand, void>
  implements IUpdateUserCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: UpdateUserCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

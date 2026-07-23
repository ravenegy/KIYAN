import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IChangeUsernameCommandHandler } from '../IChangeUsernameCommandHandler';
import { ChangeUsernameCommand } from '../../commands';

export class ChangeUsernameCommandHandler
  extends BaseCommandHandler<ChangeUsernameCommand, void>
  implements IChangeUsernameCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: ChangeUsernameCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

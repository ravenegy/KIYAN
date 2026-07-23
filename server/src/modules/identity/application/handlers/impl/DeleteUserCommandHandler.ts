import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IDeleteUserCommandHandler } from '../IDeleteUserCommandHandler';
import { DeleteUserCommand } from '../../commands';

export class DeleteUserCommandHandler
  extends BaseCommandHandler<DeleteUserCommand, void>
  implements IDeleteUserCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: DeleteUserCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

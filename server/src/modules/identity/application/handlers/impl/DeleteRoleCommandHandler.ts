import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IDeleteRoleCommandHandler } from '../IDeleteRoleCommandHandler';
import { DeleteRoleCommand } from '../../commands';

export class DeleteRoleCommandHandler
  extends BaseCommandHandler<DeleteRoleCommand, void>
  implements IDeleteRoleCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: DeleteRoleCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

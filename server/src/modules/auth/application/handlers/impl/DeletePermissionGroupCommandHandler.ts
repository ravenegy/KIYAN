import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IDeletePermissionGroupCommandHandler } from '../IDeletePermissionGroupCommandHandler';
import { DeletePermissionGroupCommand } from '../../commands';

export class DeletePermissionGroupCommandHandler
  extends BaseCommandHandler<DeletePermissionGroupCommand, void>
  implements IDeletePermissionGroupCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: DeletePermissionGroupCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

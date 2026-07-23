import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IUpdatePermissionGroupCommandHandler } from '../IUpdatePermissionGroupCommandHandler';
import { UpdatePermissionGroupCommand } from '../../commands';

export class UpdatePermissionGroupCommandHandler
  extends BaseCommandHandler<UpdatePermissionGroupCommand, void>
  implements IUpdatePermissionGroupCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: UpdatePermissionGroupCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

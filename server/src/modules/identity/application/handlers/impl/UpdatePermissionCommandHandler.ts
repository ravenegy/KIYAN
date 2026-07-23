import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IUpdatePermissionCommandHandler } from '../IUpdatePermissionCommandHandler';
import { UpdatePermissionCommand } from '../../commands';

export class UpdatePermissionCommandHandler
  extends BaseCommandHandler<UpdatePermissionCommand, void>
  implements IUpdatePermissionCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: UpdatePermissionCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

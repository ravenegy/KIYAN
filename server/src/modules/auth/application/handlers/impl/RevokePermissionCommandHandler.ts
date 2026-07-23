import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IRevokePermissionCommandHandler } from '../IRevokePermissionCommandHandler';
import { RevokePermissionCommand } from '../../commands';

export class RevokePermissionCommandHandler
  extends BaseCommandHandler<RevokePermissionCommand, void>
  implements IRevokePermissionCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: RevokePermissionCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

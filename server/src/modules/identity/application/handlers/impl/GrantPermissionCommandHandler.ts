import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IGrantPermissionCommandHandler } from '../IGrantPermissionCommandHandler';
import { GrantPermissionCommand } from '../../commands';

export class GrantPermissionCommandHandler
  extends BaseCommandHandler<GrantPermissionCommand, void>
  implements IGrantPermissionCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: GrantPermissionCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

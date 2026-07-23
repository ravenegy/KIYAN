import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IUpdateRoleCommandHandler } from '../IUpdateRoleCommandHandler';
import { UpdateRoleCommand } from '../../commands';

export class UpdateRoleCommandHandler
  extends BaseCommandHandler<UpdateRoleCommand, void>
  implements IUpdateRoleCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: UpdateRoleCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IRevokeRoleCommandHandler } from '../IRevokeRoleCommandHandler';
import { RevokeRoleCommand } from '../../commands';

export class RevokeRoleCommandHandler
  extends BaseCommandHandler<RevokeRoleCommand, void>
  implements IRevokeRoleCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: RevokeRoleCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

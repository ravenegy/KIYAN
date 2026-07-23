import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IRemoveRoleCommandHandler } from '../IRemoveRoleCommandHandler';
import { RemoveRoleCommand } from '../../commands';

export class RemoveRoleCommandHandler
  extends BaseCommandHandler<RemoveRoleCommand, void>
  implements IRemoveRoleCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: RemoveRoleCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

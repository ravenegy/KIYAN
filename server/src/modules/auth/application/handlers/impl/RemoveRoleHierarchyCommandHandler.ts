import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IRemoveRoleHierarchyCommandHandler } from '../IRemoveRoleHierarchyCommandHandler';
import { RemoveRoleHierarchyCommand } from '../../commands';

export class RemoveRoleHierarchyCommandHandler
  extends BaseCommandHandler<RemoveRoleHierarchyCommand, void>
  implements IRemoveRoleHierarchyCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: RemoveRoleHierarchyCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

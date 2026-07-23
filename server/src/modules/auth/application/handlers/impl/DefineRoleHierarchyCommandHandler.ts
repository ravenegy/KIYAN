import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IDefineRoleHierarchyCommandHandler } from '../IDefineRoleHierarchyCommandHandler';
import { DefineRoleHierarchyCommand } from '../../commands';

export class DefineRoleHierarchyCommandHandler
  extends BaseCommandHandler<DefineRoleHierarchyCommand, string>
  implements IDefineRoleHierarchyCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: DefineRoleHierarchyCommand): Promise<Result<string>> {
    return ResultFactory.success('mock-id-123');
  }
}

import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IAssignPermissionCommandHandler } from '../IAssignPermissionCommandHandler';
import { AssignPermissionCommand } from '../../commands';

export class AssignPermissionCommandHandler
  extends BaseCommandHandler<AssignPermissionCommand, string>
  implements IAssignPermissionCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: AssignPermissionCommand): Promise<Result<string>> {
    return ResultFactory.success('mock-id-123');
  }
}

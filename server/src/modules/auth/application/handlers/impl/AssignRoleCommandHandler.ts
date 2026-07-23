import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IAssignRoleCommandHandler } from '../IAssignRoleCommandHandler';
import { AssignRoleCommand } from '../../commands';

export class AssignRoleCommandHandler
  extends BaseCommandHandler<AssignRoleCommand, string>
  implements IAssignRoleCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: AssignRoleCommand): Promise<Result<string>> {
    return ResultFactory.success('mock-id-123');
  }
}

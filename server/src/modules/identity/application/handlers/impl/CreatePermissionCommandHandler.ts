import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { ICreatePermissionCommandHandler } from '../ICreatePermissionCommandHandler';
import { CreatePermissionCommand } from '../../commands';

export class CreatePermissionCommandHandler
  extends BaseCommandHandler<CreatePermissionCommand, string>
  implements ICreatePermissionCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: CreatePermissionCommand): Promise<Result<string>> {
    return ResultFactory.success('mock-id-123');
  }
}

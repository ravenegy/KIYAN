import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { ICreatePermissionGroupCommandHandler } from '../ICreatePermissionGroupCommandHandler';
import { CreatePermissionGroupCommand } from '../../commands';

export class CreatePermissionGroupCommandHandler
  extends BaseCommandHandler<CreatePermissionGroupCommand, string>
  implements ICreatePermissionGroupCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: CreatePermissionGroupCommand): Promise<Result<string>> {
    return ResultFactory.success('mock-id-123');
  }
}

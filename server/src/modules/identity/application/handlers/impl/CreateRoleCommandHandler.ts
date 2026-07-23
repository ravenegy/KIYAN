import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { ICreateRoleCommandHandler } from '../ICreateRoleCommandHandler';
import { CreateRoleCommand } from '../../commands';

export class CreateRoleCommandHandler
  extends BaseCommandHandler<CreateRoleCommand, string>
  implements ICreateRoleCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: CreateRoleCommand): Promise<Result<string>> {
    return ResultFactory.success('mock-id-123');
  }
}

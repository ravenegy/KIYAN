import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { ICreateUserCommandHandler } from '../ICreateUserCommandHandler';
import { CreateUserCommand } from '../../commands';

export class CreateUserCommandHandler
  extends BaseCommandHandler<CreateUserCommand, string>
  implements ICreateUserCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: CreateUserCommand): Promise<Result<string>> {
    return ResultFactory.success('mock-id-123');
  }
}

import { ICommand } from '../../../../core';
import { Result } from '../../../../core';
import { CreateUserRequest } from '../dto';

export class CreateUserCommand implements ICommand<Result<string>> {
  public readonly id: string;
  public readonly type: string = 'CreateUserCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<string>;

  constructor(public readonly payload: Readonly<CreateUserRequest>) {
    this.id = crypto.randomUUID();
  }
}

import { ICommand } from '../../../../core';
import { Result } from '../../../../core';
import { UpdateUserRequest } from '../dto';

export class UpdateUserCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'UpdateUserCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly payload: Readonly<UpdateUserRequest>) {
    this.id = crypto.randomUUID();
  }
}

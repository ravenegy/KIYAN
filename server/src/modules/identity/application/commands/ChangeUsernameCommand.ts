import { ICommand } from '../../../../core';
import { Result } from '../../../../core';


export class ChangeUsernameCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'ChangeUsernameCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly payload: Readonly<{ id: string; newUsername: string }>) {
    this.id = crypto.randomUUID();
  }
}

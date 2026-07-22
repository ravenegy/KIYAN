import { ICommand } from '../../../../core';
import { Result } from '../../../../core';


export class ChangeEmailCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'ChangeEmailCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly payload: Readonly<{ id: string; newEmail: string }>) {
    this.id = crypto.randomUUID();
  }
}

import { ICommand } from '../../../../core';
import { Result } from '../../../../core';


export class ResetPasswordCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'ResetPasswordCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly payload: Readonly<{ email: string }>) {
    this.id = crypto.randomUUID();
  }
}

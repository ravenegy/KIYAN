import { ICommand } from '../../../../core';
import { Result } from '../../../../core';


export class LockUserCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'LockUserCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly payload: Readonly<{ id: string; until?: Date }>) {
    this.id = crypto.randomUUID();
  }
}

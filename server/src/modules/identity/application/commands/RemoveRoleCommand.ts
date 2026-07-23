import { ICommand } from '../../../../core';
import { Result } from '../../../../core';


export class RemoveRoleCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'RemoveRoleCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly payload: Readonly<{ userId: string; roleId: string }>) {
    this.id = crypto.randomUUID();
  }
}

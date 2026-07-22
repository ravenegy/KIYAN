import { ICommand } from '../../../../core';
import { Result } from '../../../../core';


export class UpdateRoleCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'UpdateRoleCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly payload: Readonly<{ id: string; name?: string; description?: string }>) {
    this.id = crypto.randomUUID();
  }
}

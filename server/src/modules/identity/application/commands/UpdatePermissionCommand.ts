import { ICommand } from '../../../../core';
import { Result } from '../../../../core';


export class UpdatePermissionCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'UpdatePermissionCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly payload: Readonly<{ id: string; name?: string; description?: string; effect?: string }>) {
    this.id = crypto.randomUUID();
  }
}

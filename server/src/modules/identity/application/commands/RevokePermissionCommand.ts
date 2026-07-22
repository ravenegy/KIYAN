import { ICommand } from '../../../../core';
import { Result } from '../../../../core';


export class RevokePermissionCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'RevokePermissionCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly payload: Readonly<{ userId?: string; roleId?: string; permissionId: string }>) {
    this.id = crypto.randomUUID();
  }
}

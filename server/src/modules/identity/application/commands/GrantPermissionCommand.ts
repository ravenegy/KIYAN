import { ICommand } from '../../../../core';
import { Result } from '../../../../core';
import { GrantPermissionRequest } from '../dto';

export class GrantPermissionCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'GrantPermissionCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly payload: Readonly<GrantPermissionRequest>) {
    this.id = crypto.randomUUID();
  }
}

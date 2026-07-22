import { ICommand } from '../../../../core';
import { Result } from '../../../../core';


export class CreatePermissionCommand implements ICommand<Result<string>> {
  public readonly id: string;
  public readonly type: string = 'CreatePermissionCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<string>;

  constructor(public readonly payload: Readonly<{ name: string; code: string; description: string; effect: string }>) {
    this.id = crypto.randomUUID();
  }
}

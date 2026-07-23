import { ICommand } from '../../../../core';
import { Result } from '../../../../core';


export class CreateRoleCommand implements ICommand<Result<string>> {
  public readonly id: string;
  public readonly type: string = 'CreateRoleCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<string>;

  constructor(public readonly payload: Readonly<{ name: string; description: string }>) {
    this.id = crypto.randomUUID();
  }
}

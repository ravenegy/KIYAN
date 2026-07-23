import { ICommand } from '../../../../core';
import { Result } from '../../../../core';
import { AssignRoleRequest } from '../dto';

export class AssignRoleCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'AssignRoleCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly payload: Readonly<AssignRoleRequest>) {
    this.id = crypto.randomUUID();
  }
}

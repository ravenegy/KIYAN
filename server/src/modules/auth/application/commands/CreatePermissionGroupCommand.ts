import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core/results/Result';

export class CreatePermissionGroupCommand implements ICommand<Result<string>> {
  public readonly id: string;
  public readonly type: string = 'CreatePermissionGroupCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<string>;

  constructor(public readonly payload: Readonly<Record<string, any>>) {
    this.id = crypto.randomUUID();
  }
}

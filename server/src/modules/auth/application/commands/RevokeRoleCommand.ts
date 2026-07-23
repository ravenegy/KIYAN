import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core/results/Result';

export class RevokeRoleCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'RevokeRoleCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly payload: Readonly<Record<string, any>>) {
    this.id = crypto.randomUUID();
  }
}

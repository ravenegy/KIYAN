import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core/results/Result';

export class DeleteLookupCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'DeleteLookupCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(public readonly lookupId: string) {
    this.id = crypto.randomUUID();
  }
}

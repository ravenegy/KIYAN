import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core/results/Result';
import { LookupItemDto } from '../dto/LookupItemDto';

export class UpdateLookupCommand implements ICommand<Result<void>> {
  public readonly id: string;
  public readonly type: string = 'UpdateLookupCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<void>;

  constructor(
    public readonly lookupId: string,
    public readonly name: string,
    public readonly description?: string,
    public readonly items?: ReadonlyArray<LookupItemDto>
  ) {
    this.id = crypto.randomUUID();
  }
}

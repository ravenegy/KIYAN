import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core/results/Result';
import { LookupItemDto } from '../dto/LookupItemDto';

export class CreateLookupCommand implements ICommand<Result<string>> {
  public readonly id: string;
  public readonly type: string = 'CreateLookupCommand';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<string>;

  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly description?: string,
    public readonly items?: ReadonlyArray<LookupItemDto>
  ) {
    this.id = crypto.randomUUID();
  }
}

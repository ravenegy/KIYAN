import * as crypto from 'crypto';
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core/results/Result';

export class CreateBomCommand implements ICommand<Result<string>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'CreateBomCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly name: string,
    public readonly targetItemId: string
  ) {}
}

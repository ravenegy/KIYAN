import * as crypto from 'crypto';
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core/results/Result';

export class ArchiveBomCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'ArchiveBomCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly bomId: string
  ) {}
}

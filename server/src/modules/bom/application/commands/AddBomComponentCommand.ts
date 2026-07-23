import * as crypto from 'crypto';
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core/results/Result';

export class AddBomComponentCommand implements ICommand<Result<void>> {
  public readonly id: string = crypto.randomUUID();
  public readonly type: string = 'AddBomComponentCommand';
  public readonly timestamp: Date = new Date();
  constructor(
    public readonly bomId: string,
    public readonly itemId: string,
    public readonly quantity: number,
    public readonly unitOfMeasure: string,
    public readonly scrapPercentage: number = 0
  ) {}
}

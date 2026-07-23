import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { BomDto } from '../dto/BomDto';

export class GetBomByIdQuery implements IQuery<Result<BomDto>> {
  public readonly type: string = 'GetBomByIdQuery';
  constructor(
    public readonly bomId: string
  ) {}
}

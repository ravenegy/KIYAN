import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { BomDto } from '../dto/BomDto';

export class GetActiveBomByTargetItemQuery implements IQuery<Result<BomDto>> {
  public readonly type: string = 'GetActiveBomByTargetItemQuery';
  constructor(
    public readonly targetItemId: string
  ) {}
}

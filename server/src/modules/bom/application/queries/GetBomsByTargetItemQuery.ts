import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { BomSummaryDto } from '../dto/BomSummaryDto';

export class GetBomsByTargetItemQuery implements IQuery<Result<BomSummaryDto[]>> {
  public readonly type: string = 'GetBomsByTargetItemQuery';
  constructor(
    public readonly targetItemId: string
  ) {}
}

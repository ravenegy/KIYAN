import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { LookupDto } from '../dto/LookupDto';

export class GetLookupByIdQuery implements IQuery<Result<LookupDto>> {
  public readonly type: string = 'GetLookupByIdQuery';
  public readonly _resultType?: Result<LookupDto>;

  constructor(public readonly id: string) {}
}

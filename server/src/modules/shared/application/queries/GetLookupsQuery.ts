import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { LookupDto } from '../dto/LookupDto';
import { PaginationRequest } from '../contracts/PaginationRequest';

export class GetLookupsQuery implements IQuery<Result<ReadonlyArray<LookupDto>>> {
  public readonly type: string = 'GetLookupsQuery';
  public readonly _resultType?: Result<ReadonlyArray<LookupDto>>;

  constructor(public readonly pagination?: PaginationRequest) {}
}

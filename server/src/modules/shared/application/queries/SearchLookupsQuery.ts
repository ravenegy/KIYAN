import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { LookupDto } from '../dto/LookupDto';
import { PaginationRequest } from '../contracts/PaginationRequest';

export class SearchLookupsQuery implements IQuery<Result<ReadonlyArray<LookupDto>>> {
  public readonly type: string = 'SearchLookupsQuery';
  public readonly _resultType?: Result<ReadonlyArray<LookupDto>>;

  constructor(
    public readonly searchTerm: string,
    public readonly categoryId?: string,
    public readonly pagination?: PaginationRequest
  ) {}
}

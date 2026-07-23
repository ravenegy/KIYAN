import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { Result, ErrorCode } from '../../../../core';
import { SearchLookupsQuery } from '../queries/SearchLookupsQuery';
import { LookupDto } from '../dto/LookupDto';

export class SearchLookupsQueryHandler implements IQueryHandler<SearchLookupsQuery, Result<ReadonlyArray<LookupDto>>> {
  public async handle(query: SearchLookupsQuery): Promise<Result<ReadonlyArray<LookupDto>>> {
    return Result.failure({
      code: ErrorCode.Unexpected,
      message: 'Not implemented'
    });
  }
}

import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { Result, ErrorCode } from '../../../../core';
import { GetLookupsQuery } from '../queries/GetLookupsQuery';
import { LookupDto } from '../dto/LookupDto';

export class GetLookupsQueryHandler implements IQueryHandler<GetLookupsQuery, Result<ReadonlyArray<LookupDto>>> {
  public async handle(query: GetLookupsQuery): Promise<Result<ReadonlyArray<LookupDto>>> {
    return Result.failure({
      code: ErrorCode.Unexpected,
      message: 'Not implemented'
    });
  }
}

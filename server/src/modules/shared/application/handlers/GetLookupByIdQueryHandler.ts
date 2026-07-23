import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { Result, ErrorCode } from '../../../../core';
import { GetLookupByIdQuery } from '../queries/GetLookupByIdQuery';
import { LookupDto } from '../dto/LookupDto';

export class GetLookupByIdQueryHandler implements IQueryHandler<GetLookupByIdQuery, Result<LookupDto>> {
  public async handle(query: GetLookupByIdQuery): Promise<Result<LookupDto>> {
    return Result.failure({
      code: ErrorCode.Unexpected,
      message: 'Not implemented'
    });
  }
}

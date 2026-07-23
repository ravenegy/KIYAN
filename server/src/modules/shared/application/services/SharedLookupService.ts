import { ISharedLookupService } from '../interfaces/ISharedLookupService';
import { Result, ErrorCode } from '../../../../core';
import { LookupDto } from '../dto/LookupDto';

export class SharedLookupService implements ISharedLookupService {
  public async getLookupById(id: string): Promise<Result<LookupDto>> {
    return Result.failure({
      code: ErrorCode.Unexpected,
      message: 'Not implemented'
    });
  }

  public async getLookupByCode(code: string): Promise<Result<LookupDto>> {
    return Result.failure({
      code: ErrorCode.Unexpected,
      message: 'Not implemented'
    });
  }
}

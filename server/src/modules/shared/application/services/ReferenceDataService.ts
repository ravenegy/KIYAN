import { IReferenceDataService } from '../interfaces/IReferenceDataService';
import { Result, ErrorCode } from '../../../../core';

export class ReferenceDataService implements IReferenceDataService {
  public async getReferenceData<T>(type: string): Promise<Result<ReadonlyArray<T>>> {
    return Result.failure({
      code: ErrorCode.Unexpected,
      message: 'Not implemented'
    });
  }
}

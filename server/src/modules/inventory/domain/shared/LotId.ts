import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { Result, ErrorCode } from '../../../../core';

export class LotId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<LotId> {
    if (!value || value.trim() === '') {
      return Result.failure({ code: ErrorCode.Validation, message: 'LotId cannot be empty' });
    }
    return Result.success(new LotId(value));
  }
}

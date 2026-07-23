import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { Result, ErrorCode } from '../../../../core';

export class StockLevelId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<StockLevelId> {
    if (!value || value.trim() === '') {
      return Result.failure({ code: ErrorCode.Validation, message: 'StockLevelId cannot be empty' });
    }
    return Result.success(new StockLevelId(value));
  }
}

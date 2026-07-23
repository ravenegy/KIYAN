import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { Result, ErrorCode } from '../../../../core';

export class StockMovementId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<StockMovementId> {
    if (!value || value.trim() === '') {
      return Result.failure({ code: ErrorCode.Validation, message: 'StockMovementId cannot be empty' });
    }
    return Result.success(new StockMovementId(value));
  }
}

import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { Result, ErrorCode } from '../../../../core';

export class MrpRunId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<MrpRunId> {
    if (!value || value.trim() === '') {
      return Result.failure({ code: ErrorCode.Validation, message: 'MrpRunId cannot be empty' });
    }
    return Result.success(new MrpRunId(value));
  }
}

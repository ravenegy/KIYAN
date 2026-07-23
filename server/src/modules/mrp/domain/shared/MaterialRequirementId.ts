import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { Result, ErrorCode } from '../../../../core';

export class MaterialRequirementId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<MaterialRequirementId> {
    if (!value || value.trim() === '') {
      return Result.failure({ code: ErrorCode.Validation, message: 'MaterialRequirementId cannot be empty' });
    }
    return Result.success(new MaterialRequirementId(value));
  }
}

import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';

export class OperationId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<OperationId> {
    if (!value || value.trim().length === 0) {
      return ResultFactory.validation<OperationId>('OperationId cannot be empty.');
    }
    return ResultFactory.success(new OperationId(value));
  }
}

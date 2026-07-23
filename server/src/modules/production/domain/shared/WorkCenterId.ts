import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';

export class WorkCenterId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<WorkCenterId> {
    if (!value || value.trim().length === 0) {
      return ResultFactory.validation<WorkCenterId>('WorkCenterId cannot be empty.');
    }
    return ResultFactory.success(new WorkCenterId(value));
  }
}

import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';

export class MaterialIssueId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<MaterialIssueId> {
    if (!value || value.trim().length === 0) {
      return ResultFactory.validation<MaterialIssueId>('MaterialIssueId cannot be empty.');
    }
    return ResultFactory.success(new MaterialIssueId(value));
  }
}

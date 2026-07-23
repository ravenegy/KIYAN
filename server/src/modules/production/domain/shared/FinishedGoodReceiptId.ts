import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';

export class FinishedGoodReceiptId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<FinishedGoodReceiptId> {
    if (!value || value.trim().length === 0) {
      return ResultFactory.validation<FinishedGoodReceiptId>('FinishedGoodReceiptId cannot be empty.');
    }
    return ResultFactory.success(new FinishedGoodReceiptId(value));
  }
}

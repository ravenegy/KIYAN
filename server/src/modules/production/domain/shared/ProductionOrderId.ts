import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';

export class ProductionOrderId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<ProductionOrderId> {
    if (!value || value.trim().length === 0) {
      return ResultFactory.validation<ProductionOrderId>('ProductionOrderId cannot be empty.');
    }
    return ResultFactory.success(new ProductionOrderId(value));
  }
}

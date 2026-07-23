import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';

export interface ProductionDurationProps {
  minutes: number;
}

export class ProductionDuration extends ValueObject<ProductionDurationProps> {
  private constructor(props: ProductionDurationProps) {
    super(props);
  }

  public get minutes(): number {
    return this.props.minutes;
  }

  public static create(minutes: number): Result<ProductionDuration> {
    if (minutes < 0) {
      return ResultFactory.validation<ProductionDuration>('ProductionDuration cannot be negative.');
    }
    return ResultFactory.success(new ProductionDuration({ minutes }));
  }
  
  public add(other: ProductionDuration): ProductionDuration {
    return new ProductionDuration({ minutes: this.minutes + other.minutes });
  }
}

import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result } from '../../../../core/results/Result';

export interface QuantityProps {
  value: number;
}

export class Quantity extends ValueObject<QuantityProps> {
  private constructor(props: QuantityProps) {
    super(props);
  }

  public get value(): number {
    return this.props.value;
  }

  public static create(value: number): Result<Quantity> {
    if (value <= 0) {
      return Result.failure({ code: 'INVALID_QUANTITY', message: 'Quantity must be greater than zero.' });
    }
    return Result.success(new Quantity({ value }));
  }
}

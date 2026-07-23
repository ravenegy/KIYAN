import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { ResultFactory } from '../../../../core/results/ResultFactory';
import { Result } from '../../../../core/results/Result';

export interface QuantityProps {
  amount: number;
}

export class Quantity extends ValueObject<QuantityProps> {
  private constructor(props: QuantityProps) {
    super(props);
  }

  public get amount(): number {
    return this.props.amount;
  }

  public static create(amount: number): Result<Quantity> {
    if (amount < 0) {
      return ResultFactory.validation<Quantity>('Quantity cannot be negative.');
    }
    return ResultFactory.success(new Quantity({ amount }));
  }

  public add(other: Quantity): Quantity {
    return new Quantity({ amount: this.amount + other.amount });
  }

  public subtract(other: Quantity): Result<Quantity> {
    if (this.amount < other.amount) {
      return ResultFactory.businessRule<Quantity>('Cannot subtract quantity resulting in negative value.');
    }
    return ResultFactory.success(new Quantity({ amount: this.amount - other.amount }));
  }
}

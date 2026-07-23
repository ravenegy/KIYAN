import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';
import { Result, ErrorCode } from '../../../../core';

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
    if (value === null || value === undefined) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Quantity is required.' });
    }
    if (value < 0) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Quantity cannot be negative.' });
    }
    return Result.success(new Quantity({ value }));
  }

  public add(other: Quantity): Result<Quantity> {
    return Quantity.create(this.value + other.value);
  }

  public subtract(other: Quantity): Result<Quantity> {
    if (this.value < other.value) {
      return Result.failure({ code: ErrorCode.BusinessRule, message: 'Insufficient quantity.' });
    }
    return Quantity.create(this.value - other.value);
  }
}

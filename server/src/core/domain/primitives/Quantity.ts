import { ValueObject } from '../value-objects/ValueObject';
import { DomainException } from '../exceptions/DomainException';

export interface QuantityProps {
  value: number;
  unit: string;
}

export class Quantity extends ValueObject<QuantityProps> {
  private constructor(props: QuantityProps) {
    super(props);
  }

  public static create(value: number, unit: string): Quantity {
    if (value < 0) {
      throw new DomainException('Quantity cannot be negative');
    }
    if (!unit || unit.trim().length === 0) {
      throw new DomainException('Unit must be specified');
    }
    return new Quantity({ value, unit });
  }

  public get value(): number {
    return this.props.value;
  }

  public get unit(): string {
    return this.props.unit;
  }
}

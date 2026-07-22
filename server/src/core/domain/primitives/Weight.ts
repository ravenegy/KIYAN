import { ValueObject } from '../value-objects/ValueObject';
import { DomainException } from '../exceptions/DomainException';

export interface WeightProps {
  value: number;
  unit: string;
}

export class Weight extends ValueObject<WeightProps> {
  private constructor(props: WeightProps) {
    super(props);
  }

  public static create(value: number, unit: string): Weight {
    if (value < 0) {
      throw new DomainException('Weight cannot be negative');
    }
    if (!unit || unit.trim().length === 0) {
      throw new DomainException('Weight unit must be specified');
    }
    return new Weight({ value, unit });
  }

  public get value(): number {
    return this.props.value;
  }

  public get unit(): string {
    return this.props.unit;
  }
}

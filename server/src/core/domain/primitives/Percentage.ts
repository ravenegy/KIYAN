import { ValueObject } from '../value-objects/ValueObject';
import { DomainException } from '../exceptions/DomainException';

export interface PercentageProps {
  value: number;
}

export class Percentage extends ValueObject<PercentageProps> {
  private constructor(props: PercentageProps) {
    super(props);
  }

  public static create(value: number): Percentage {
    if (value < 0 || value > 100) {
      throw new DomainException('Percentage must be between 0 and 100');
    }
    return new Percentage({ value });
  }

  public get value(): number {
    return this.props.value;
  }
}

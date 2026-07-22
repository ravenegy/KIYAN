import { ValueObject } from '../value-objects/ValueObject';
import { DomainException } from '../exceptions/DomainException';

export interface VolumeProps {
  value: number;
  unit: string;
}

export class Volume extends ValueObject<VolumeProps> {
  private constructor(props: VolumeProps) {
    super(props);
  }

  public static create(value: number, unit: string): Volume {
    if (value < 0) {
      throw new DomainException('Volume cannot be negative');
    }
    if (!unit || unit.trim().length === 0) {
      throw new DomainException('Volume unit must be specified');
    }
    return new Volume({ value, unit });
  }

  public get value(): number {
    return this.props.value;
  }

  public get unit(): string {
    return this.props.unit;
  }
}

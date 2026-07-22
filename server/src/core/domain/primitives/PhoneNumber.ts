import { ValueObject } from '../value-objects/ValueObject';
import { DomainException } from '../exceptions/DomainException';

export interface PhoneNumberProps {
  value: string;
}

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
  private constructor(props: PhoneNumberProps) {
    super(props);
  }

  public static create(value: string): PhoneNumber {
    if (!value || value.trim().length < 5) {
      throw new DomainException('Invalid phone number');
    }
    return new PhoneNumber({ value: value.trim() });
  }

  public get value(): string {
    return this.props.value;
  }
}

import { ValueObject } from '../value-objects/ValueObject';
import { DomainException } from '../exceptions/DomainException';

export interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(value: string): Email {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new DomainException('Invalid email format');
    }
    return new Email({ value: value.toLowerCase() });
  }

  public get value(): string {
    return this.props.value;
  }
}

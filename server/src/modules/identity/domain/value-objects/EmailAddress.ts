import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

export interface EmailAddressProps {
  value: string;
}

export class EmailAddress extends ValueObject<EmailAddressProps> {
  private constructor(props: EmailAddressProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(email: string): EmailAddress {
    if (!email || email.trim().length === 0) {
      throw new Error('Email address cannot be empty');
    }
    
    // Basic regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address format');
    }
    
    return new EmailAddress({ value: email.toLowerCase() });
  }
}

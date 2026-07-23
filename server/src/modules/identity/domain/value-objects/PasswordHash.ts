import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

export interface PasswordHashProps {
  value: string;
}

export class PasswordHash extends ValueObject<PasswordHashProps> {
  private constructor(props: PasswordHashProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(hash: string): PasswordHash {
    if (!hash || hash.trim().length === 0) {
      throw new Error('Password hash cannot be empty');
    }
    
    return new PasswordHash({ value: hash });
  }
}

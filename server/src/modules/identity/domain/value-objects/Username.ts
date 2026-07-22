import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

export interface UsernameProps {
  value: string;
}

export class Username extends ValueObject<UsernameProps> {
  private constructor(props: UsernameProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(username: string): Username {
    if (!username || username.trim().length === 0) {
      throw new Error('Username cannot be empty');
    }
    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long');
    }
    if (username.length > 50) {
      throw new Error('Username cannot exceed 50 characters');
    }
    
    return new Username({ value: username });
  }
}

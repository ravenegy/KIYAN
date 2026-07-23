import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

export interface RoleNameProps {
  value: string;
}

export class RoleName extends ValueObject<RoleNameProps> {
  private constructor(props: RoleNameProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): RoleName {
    if (!value || value.trim().length === 0) {
      throw new Error('RoleName cannot be empty');
    }
    return new RoleName({ value });
  }
}

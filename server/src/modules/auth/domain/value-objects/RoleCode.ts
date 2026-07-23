import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

export interface RoleCodeProps {
  value: string;
}

export class RoleCode extends ValueObject<RoleCodeProps> {
  private constructor(props: RoleCodeProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): RoleCode {
    if (!value || value.trim().length === 0) {
      throw new Error('RoleCode cannot be empty');
    }
    return new RoleCode({ value });
  }
}

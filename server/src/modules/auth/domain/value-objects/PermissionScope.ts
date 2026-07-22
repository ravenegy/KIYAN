import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

export interface PermissionScopeProps {
  value: string;
}

export class PermissionScope extends ValueObject<PermissionScopeProps> {
  private constructor(props: PermissionScopeProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): PermissionScope {
    if (!value || value.trim().length === 0) {
      throw new Error('PermissionScope cannot be empty');
    }
    return new PermissionScope({ value });
  }
}

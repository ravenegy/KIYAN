import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

export interface PermissionCodeProps {
  value: string;
}

export class PermissionCode extends ValueObject<PermissionCodeProps> {
  private constructor(props: PermissionCodeProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): PermissionCode {
    if (!value || value.trim().length === 0) {
      throw new Error('PermissionCode cannot be empty');
    }
    return new PermissionCode({ value });
  }
}

import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

export interface PermissionNameProps {
  value: string;
}

export class PermissionName extends ValueObject<PermissionNameProps> {
  private constructor(props: PermissionNameProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): PermissionName {
    if (!value || value.trim().length === 0) {
      throw new Error('PermissionName cannot be empty');
    }
    return new PermissionName({ value });
  }
}

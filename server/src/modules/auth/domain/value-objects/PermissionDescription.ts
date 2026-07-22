import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

export interface PermissionDescriptionProps {
  value: string;
}

export class PermissionDescription extends ValueObject<PermissionDescriptionProps> {
  private constructor(props: PermissionDescriptionProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): PermissionDescription {
    if (!value || value.trim().length === 0) {
      throw new Error('PermissionDescription cannot be empty');
    }
    return new PermissionDescription({ value });
  }
}

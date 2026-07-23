import { ValueObject } from '../../../../core/domain/value-objects/ValueObject';

export interface PermissionCategoryProps {
  value: string;
}

export class PermissionCategory extends ValueObject<PermissionCategoryProps> {
  private constructor(props: PermissionCategoryProps) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): PermissionCategory {
    if (!value || value.trim().length === 0) {
      throw new Error('PermissionCategory cannot be empty');
    }
    return new PermissionCategory({ value });
  }
}

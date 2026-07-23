import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';

export class PermissionId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): PermissionId {
    if (!value || value.trim().length === 0) {
      throw new Error('PermissionId cannot be empty');
    }
    return new PermissionId(value);
  }
}

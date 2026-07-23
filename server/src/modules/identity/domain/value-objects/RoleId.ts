import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';

export class RoleId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): RoleId {
    if (!value || value.trim().length === 0) {
      throw new Error('RoleId cannot be empty');
    }
    return new RoleId(value);
  }
}

import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';

export class UserId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): UserId {
    // We could add validation here (e.g., UUID format check)
    if (!value || value.trim().length === 0) {
      throw new Error('UserId cannot be empty');
    }
    return new UserId(value);
  }
}

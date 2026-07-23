import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';

export class SessionId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): SessionId {
    if (!value || value.trim().length === 0) {
      throw new Error('SessionId cannot be empty');
    }
    return new SessionId(value);
  }
}

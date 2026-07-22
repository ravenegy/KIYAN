import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';

export class RefreshTokenId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): RefreshTokenId {
    if (!value || value.trim().length === 0) {
      throw new Error('RefreshTokenId cannot be empty');
    }
    return new RefreshTokenId(value);
  }
}

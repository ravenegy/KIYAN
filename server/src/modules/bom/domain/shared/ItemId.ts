import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';

export class ItemId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): ItemId {
    return new ItemId(value);
  }
}

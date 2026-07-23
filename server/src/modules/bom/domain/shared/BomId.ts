import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';

export class BomId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): BomId {
    return new BomId(value);
  }
}

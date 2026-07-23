import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';

export class BomComponentId extends StronglyTypedId<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): BomComponentId {
    return new BomComponentId(value);
  }
}

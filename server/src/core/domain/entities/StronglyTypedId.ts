import { ValueObject } from '../value-objects/ValueObject';

export interface StronglyTypedIdProps<T> {
  value: T;
}

export abstract class StronglyTypedId<T> extends ValueObject<StronglyTypedIdProps<T>> {
  protected constructor(value: T) {
    super({ value });
  }

  public get value(): T {
    return this.props.value;
  }

  public toString(): string {
    return String(this.props.value);
  }
}

import { Entity } from './Entity';
import { StronglyTypedId } from './StronglyTypedId';

export abstract class AggregateRoot<TId extends StronglyTypedId<unknown>> extends Entity<TId> {
  protected constructor(
    id: TId,
    createdAt: Date = new Date(),
    version: number = 1,
    createdBy?: string,
    updatedAt?: Date,
    updatedBy?: string
  ) {
    super(id, createdAt, version, createdBy, updatedAt, updatedBy);
  }
}

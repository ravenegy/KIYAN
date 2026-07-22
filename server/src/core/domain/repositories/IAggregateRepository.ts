import { IRepository } from './IRepository';
import { AggregateRoot } from '../entities/AggregateRoot';
import { StronglyTypedId } from '../entities/StronglyTypedId';
import { RepositoryOptions } from './RepositoryOptions';

export interface IAggregateRepository<TAggregate extends AggregateRoot<TId>, TId extends StronglyTypedId<unknown>> extends IRepository<TAggregate, TId> {
  loadAggregate(id: TId, options?: RepositoryOptions): Promise<TAggregate | null>;
  saveAggregate(aggregate: TAggregate, options?: RepositoryOptions): Promise<void>;
}

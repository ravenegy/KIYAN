import { IDomainFactory } from './IDomainFactory';
import { AggregateRoot } from '../entities/AggregateRoot';
import { StronglyTypedId } from '../entities/StronglyTypedId';

export interface IAggregateFactory<
  TAggregate extends AggregateRoot<TId>, 
  TId extends StronglyTypedId<unknown>, 
  TCreateParams, 
  TReconstituteParams
> extends IDomainFactory<TAggregate, TCreateParams, TReconstituteParams> {
}

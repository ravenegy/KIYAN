import { DomainFactory } from './DomainFactory';
import { IAggregateFactory } from './IAggregateFactory';
import { AggregateRoot } from '../entities/AggregateRoot';
import { StronglyTypedId } from '../entities/StronglyTypedId';
import { FactoryContext } from './FactoryContext';

export abstract class AggregateFactory<
  TAggregate extends AggregateRoot<TId>,
  TId extends StronglyTypedId<unknown>,
  TCreateParams,
  TReconstituteParams
> extends DomainFactory<TAggregate, TCreateParams, TReconstituteParams> 
  implements IAggregateFactory<TAggregate, TId, TCreateParams, TReconstituteParams> {
  
  protected constructor(context: FactoryContext) {
    super(context);
  }
}

import { DomainFactory } from './DomainFactory';
import { IEntityFactory } from './IEntityFactory';
import { Entity } from '../entities/Entity';
import { StronglyTypedId } from '../entities/StronglyTypedId';
import { FactoryContext } from './FactoryContext';

export abstract class EntityFactory<
  TEntity extends Entity<TId>,
  TId extends StronglyTypedId<unknown>,
  TCreateParams,
  TReconstituteParams
> extends DomainFactory<TEntity, TCreateParams, TReconstituteParams>
  implements IEntityFactory<TEntity, TId, TCreateParams, TReconstituteParams> {
  
  protected constructor(context: FactoryContext) {
    super(context);
  }
}

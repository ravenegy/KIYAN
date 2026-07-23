import { IDomainFactory } from './IDomainFactory';
import { Entity } from '../entities/Entity';
import { StronglyTypedId } from '../entities/StronglyTypedId';

export interface IEntityFactory<
  TEntity extends Entity<TId>, 
  TId extends StronglyTypedId<unknown>, 
  TCreateParams, 
  TReconstituteParams
> extends IDomainFactory<TEntity, TCreateParams, TReconstituteParams> {
}

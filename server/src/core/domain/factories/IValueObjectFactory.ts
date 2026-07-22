import { IDomainFactory } from './IDomainFactory';
import { ValueObject } from '../value-objects/ValueObject';

export interface IValueObjectFactory<
  TValueObject extends ValueObject<unknown>, 
  TCreateParams,
  TReconstituteParams = TCreateParams
> extends IDomainFactory<TValueObject, TCreateParams, TReconstituteParams> {
}

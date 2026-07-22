import { DomainFactory } from './DomainFactory';
import { IValueObjectFactory } from './IValueObjectFactory';
import { ValueObject } from '../value-objects/ValueObject';
import { FactoryContext } from './FactoryContext';

export abstract class ValueObjectFactory<
  TValueObject extends ValueObject<unknown>,
  TCreateParams,
  TReconstituteParams = TCreateParams
> extends DomainFactory<TValueObject, TCreateParams, TReconstituteParams>
  implements IValueObjectFactory<TValueObject, TCreateParams, TReconstituteParams> {
  
  protected constructor(context: FactoryContext) {
    super(context);
  }
}

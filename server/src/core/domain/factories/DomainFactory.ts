import { IDomainFactory } from './IDomainFactory';
import { FactoryValidationResult } from './FactoryValidationResult';
import { FactoryContext } from './FactoryContext';
import { FactoryException } from './FactoryException';

export abstract class DomainFactory<TType, TCreateParams, TReconstituteParams> 
  implements IDomainFactory<TType, TCreateParams, TReconstituteParams> {
  
  protected readonly context: FactoryContext;

  constructor(context: FactoryContext) {
    this.context = context;
  }

  public abstract create(params: TCreateParams): TType;
  
  public abstract reconstitute(params: TReconstituteParams): TType;
  
  public abstract clone(instance: TType): TType;
  
  public validate(params: TCreateParams | TReconstituteParams): FactoryValidationResult {
    return FactoryValidationResult.success();
  }

  protected throwIfInvalid(result: FactoryValidationResult, targetType: string): void {
    if (!result.isSuccess) {
      throw new FactoryException(targetType, 'Validation failed during creation or reconstitution', [...result.errors]);
    }
  }
}

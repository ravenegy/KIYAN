import { FactoryValidationResult } from './FactoryValidationResult';

export interface IDomainFactory<TType, TCreateParams, TReconstituteParams> {
  create(params: TCreateParams): TType;
  reconstitute(params: TReconstituteParams): TType;
  clone(instance: TType): TType;
  validate(params: TCreateParams | TReconstituteParams): FactoryValidationResult;
}

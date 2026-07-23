import { IContainer, Lifetime } from '../../../core/di';
import { ProductionModuleTokens } from './ProductionModuleTokens';
import { ProductionValidator } from '../application/validators/impl/ProductionValidator';

export class ProductionValidatorRegistration {
  public static register(container: IContainer): void {
    container.register(
      ProductionModuleTokens.IProductionValidator,
      () => new ProductionValidator(),
      Lifetime.Singleton
    );
  }
}

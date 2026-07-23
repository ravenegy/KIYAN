import { IContainer, Lifetime } from '../../../core/di';
import { ProductionModuleTokens } from './ProductionModuleTokens';
import { ProductionMapper } from '../application/mappers/impl/ProductionMapper';

export class ProductionMapperRegistration {
  public static register(container: IContainer): void {
    container.register(
      ProductionModuleTokens.IProductionMapper,
      () => new ProductionMapper(),
      Lifetime.Singleton
    );
  }
}

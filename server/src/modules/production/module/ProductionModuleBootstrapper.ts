import { IContainer } from '../../../core/di';
import { ProductionDependencyRegistration } from '../registration/ProductionDependencyRegistration';
import { ProductionModuleConfiguration } from './ProductionModuleConfiguration';

export class ProductionModuleBootstrapper {
  public static bootstrap(container: IContainer, config: ProductionModuleConfiguration): void {
    ProductionDependencyRegistration.register(container);
  }
}

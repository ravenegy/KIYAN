import { IContainer } from '../../../core/di';
import { ProductionConfigurationRegistration } from './ProductionConfigurationRegistration';
import { ProductionFactoryRegistration } from './ProductionFactoryRegistration';
import { ProductionValidatorRegistration } from './ProductionValidatorRegistration';
import { ProductionMapperRegistration } from './ProductionMapperRegistration';
import { ProductionRepositoryRegistration } from './ProductionRepositoryRegistration';
import { ProductionServiceRegistration } from './ProductionServiceRegistration';
import { ProductionHandlerRegistration } from './ProductionHandlerRegistration';
import { ProductionMediatorRegistration } from './ProductionMediatorRegistration';

export class ProductionDependencyRegistration {
  public static register(container: IContainer): void {
    ProductionConfigurationRegistration.register(container);
    ProductionFactoryRegistration.register(container);
    ProductionValidatorRegistration.register(container);
    ProductionMapperRegistration.register(container);
    ProductionRepositoryRegistration.register(container);
    ProductionServiceRegistration.register(container);
    ProductionHandlerRegistration.register(container);
    
    // Note: Mediator registration requires handlers to be registered first
    ProductionMediatorRegistration.register(container);
  }
}

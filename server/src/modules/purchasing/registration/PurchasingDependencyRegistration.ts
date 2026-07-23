import { IContainer } from '../../../core/di';
import { PurchasingFactoryRegistration } from './PurchasingFactoryRegistration';
import { PurchasingValidatorRegistration } from './PurchasingValidatorRegistration';
import { PurchasingMapperRegistration } from './PurchasingMapperRegistration';
import { PurchasingRepositoryRegistration } from './PurchasingRepositoryRegistration';
import { PurchasingServiceRegistration } from './PurchasingServiceRegistration';
import { PurchasingHandlerRegistration } from './PurchasingHandlerRegistration';
import { PurchasingMediatorRegistration } from './PurchasingMediatorRegistration';

export class PurchasingDependencyRegistration {
  public static register(container: IContainer): void {
    PurchasingFactoryRegistration.register(container);
    PurchasingValidatorRegistration.register(container);
    PurchasingMapperRegistration.register(container);
    PurchasingRepositoryRegistration.register(container);
    PurchasingServiceRegistration.register(container);
    PurchasingHandlerRegistration.register(container);
    
    // Note: Mediator registration requires handlers to be registered first
    PurchasingMediatorRegistration.register(container);
  }
}

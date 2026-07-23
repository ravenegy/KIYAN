import { IContainer } from '../../../core/di';
import { InventoryConfigurationRegistration } from './InventoryConfigurationRegistration';
import { InventoryFactoryRegistration } from './InventoryFactoryRegistration';
import { InventoryValidatorRegistration } from './InventoryValidatorRegistration';
import { InventoryMapperRegistration } from './InventoryMapperRegistration';
import { InventoryRepositoryRegistration } from './InventoryRepositoryRegistration';
import { InventoryServiceRegistration } from './InventoryServiceRegistration';
import { InventoryHandlerRegistration } from './InventoryHandlerRegistration';
import { InventoryMediatorRegistration } from './InventoryMediatorRegistration';

export class InventoryDependencyRegistration {
  public static register(container: IContainer): void {
    InventoryConfigurationRegistration.register(container);
    InventoryFactoryRegistration.register(container);
    InventoryValidatorRegistration.register(container);
    InventoryMapperRegistration.register(container);
    InventoryRepositoryRegistration.register(container);
    InventoryServiceRegistration.register(container);
    InventoryHandlerRegistration.register(container);
    
    // Note: Mediator registration requires handlers to be registered first
    InventoryMediatorRegistration.register(container);
  }
}

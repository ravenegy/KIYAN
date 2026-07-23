import { IContainer } from '../../../core/di';
import { InventoryDependencyRegistration } from '../registration/InventoryDependencyRegistration';
import { InventoryInfrastructureBootstrapper } from '../infrastructure/bootstrap/InventoryInfrastructureBootstrapper';
import { InventoryModuleConfiguration } from './InventoryModuleConfiguration';

export class InventoryModuleBootstrapper {
  public static bootstrap(container: IContainer, config: InventoryModuleConfiguration): void {
    InventoryDependencyRegistration.register(container);
    InventoryInfrastructureBootstrapper.bootstrap(container, config);
  }
}

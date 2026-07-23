import { IContainer } from '../../../core/di';
import { IRouter } from '../presentation/contracts/IRouter';
import { SharedModuleConfiguration } from '../infrastructure/configuration/SharedModuleConfiguration';
import { SharedInfrastructureBootstrapper } from '../infrastructure/bootstrap/SharedInfrastructureBootstrapper';
import { SharedDependencyRegistration } from '../registration/SharedDependencyRegistration';
import { SharedModuleRegistry } from './SharedModuleRegistry';

export class SharedModule {
  public static initialize(container: IContainer, config: SharedModuleConfiguration, router: IRouter): void {
    // 1. Register Infrastructure Dependencies
    SharedInfrastructureBootstrapper.bootstrap(container, config);

    // 2. Register Module Dependencies (Application, Presentation, etc.)
    SharedDependencyRegistration.register(container);

    // 3. Register Endpoints
    SharedModuleRegistry.registerEndpoints(container, router);
  }
}

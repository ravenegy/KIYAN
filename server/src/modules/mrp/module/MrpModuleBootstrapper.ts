import { IContainer } from '../../../core/di';
import { MrpDependencyRegistration } from '../registration/MrpDependencyRegistration';
import { MrpModuleConfiguration } from './MrpModuleConfiguration';

export class MrpModuleBootstrapper {
  public static bootstrap(container: IContainer, config: MrpModuleConfiguration): void {
    MrpDependencyRegistration.register(container);
    // MrpInfrastructureBootstrapper is handled within MrpRepositoryRegistration
  }
}

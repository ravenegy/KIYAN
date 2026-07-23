import { IContainer } from '../../../core/di';
import { BomDependencyRegistration } from '../registration/BomDependencyRegistration';
import { BomModuleConfiguration } from './BomModuleConfiguration';

export class BomModuleBootstrapper {
  public static bootstrap(container: IContainer, config: BomModuleConfiguration): void {
    BomDependencyRegistration.register(container);
    // BomInfrastructureBootstrapper is handled within BomRepositoryRegistration
  }
}

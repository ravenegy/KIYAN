import { IContainer } from '../../../core/di';
import { BomInfrastructureBootstrapper } from '../infrastructure/bootstrap/BomInfrastructureBootstrapper';
import { BomInfrastructureOptions } from '../infrastructure/configuration/BomInfrastructureOptions';

export class BomConfigurationRegistration {
  public static register(container: IContainer): void {
    // Infrastructure configuration is resolved by Bootstrapper in repository/factory registration
  }
}

import { IContainer } from '../../../core/di';
import { IRouter } from '../presentation/contracts/IRouter';
import { SharedModuleConfiguration } from '../infrastructure/configuration/SharedModuleConfiguration';
import { SharedModule } from '../module/SharedModule';

export class SharedModuleBootstrapper {
  public static bootstrap(container: IContainer, config: SharedModuleConfiguration, router: IRouter): void {
    SharedModule.initialize(container, config, router);
  }
}

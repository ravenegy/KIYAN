import { IContainer } from '../../../core/di';
import { PurchasingDependencyRegistration } from '../registration/PurchasingDependencyRegistration';
import { PurchasingModuleConfiguration } from './PurchasingModuleConfiguration';

export class PurchasingModuleBootstrapper {
  public static bootstrap(container: IContainer, config: PurchasingModuleConfiguration): void {
    PurchasingDependencyRegistration.register(container);
  }
}

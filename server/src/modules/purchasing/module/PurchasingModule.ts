import { IContainer } from '../../../core/di';
import { PurchasingModuleBootstrapper } from './PurchasingModuleBootstrapper';
import { PurchasingModuleInitializer } from './PurchasingModuleInitializer';
import { PurchasingModuleMetadata } from './PurchasingModuleMetadata';
import { PurchasingModuleVersion } from './PurchasingModuleVersion';
import { PurchasingModuleConfiguration } from './PurchasingModuleConfiguration';

export class PurchasingModule {
  public static readonly metadata = PurchasingModuleMetadata;
  public static readonly version = PurchasingModuleVersion;

  public static bootstrap(container: IContainer, config: PurchasingModuleConfiguration): void {
    PurchasingModuleBootstrapper.bootstrap(container, config);
  }

  public static async initialize(container: IContainer): Promise<void> {
    await PurchasingModuleInitializer.initialize(container);
  }
}

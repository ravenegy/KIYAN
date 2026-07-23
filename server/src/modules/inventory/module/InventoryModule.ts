import { IContainer } from '../../../core/di';
import { InventoryModuleBootstrapper } from './InventoryModuleBootstrapper';
import { InventoryModuleInitializer } from './InventoryModuleInitializer';
import { InventoryModuleMetadata } from './InventoryModuleMetadata';
import { InventoryModuleVersion } from './InventoryModuleVersion';
import { InventoryModuleConfiguration } from './InventoryModuleConfiguration';

export class InventoryModule {
  public static readonly metadata = InventoryModuleMetadata;
  public static readonly version = InventoryModuleVersion;

  public static bootstrap(container: IContainer, config: InventoryModuleConfiguration): void {
    InventoryModuleBootstrapper.bootstrap(container, config);
  }

  public static async initialize(container: IContainer): Promise<void> {
    await InventoryModuleInitializer.initialize(container);
  }
}

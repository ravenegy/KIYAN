import { IContainer } from '../../../core/di';
import { MrpModuleBootstrapper } from './MrpModuleBootstrapper';
import { MrpModuleInitializer } from './MrpModuleInitializer';
import { MrpModuleMetadata } from './MrpModuleMetadata';
import { MrpModuleVersion } from './MrpModuleVersion';
import { MrpModuleConfiguration } from './MrpModuleConfiguration';

export class MrpModule {
  public static readonly metadata = MrpModuleMetadata;
  public static readonly version = MrpModuleVersion;

  public static bootstrap(container: IContainer, config: MrpModuleConfiguration): void {
    MrpModuleBootstrapper.bootstrap(container, config);
  }

  public static async initialize(container: IContainer): Promise<void> {
    await MrpModuleInitializer.initialize(container);
  }
}

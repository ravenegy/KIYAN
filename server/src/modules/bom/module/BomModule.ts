import { IContainer } from '../../../core/di';
import { IRouter } from '../presentation/contracts/IRouter';
import { BomModuleBootstrapper } from './BomModuleBootstrapper';
import { BomModuleInitializer } from './BomModuleInitializer';
import { BomModuleMetadata } from './BomModuleMetadata';
import { BomModuleVersion } from './BomModuleVersion';
import { BomModuleConfiguration } from './BomModuleConfiguration';
import { BomModuleRegistry } from './BomModuleRegistry';

export class BomModule {
  public static readonly metadata = BomModuleMetadata;
  public static readonly version = BomModuleVersion;

  public static bootstrap(container: IContainer, config: BomModuleConfiguration): void {
    BomModuleBootstrapper.bootstrap(container, config);
  }

  public static async initialize(container: IContainer): Promise<void> {
    await BomModuleInitializer.initialize(container);
  }

  public static registerEndpoints(container: IContainer, router: IRouter): void {
    BomModuleRegistry.registerEndpoints(container, router);
  }
}

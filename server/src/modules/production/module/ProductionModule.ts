import { IContainer } from '../../../core/di';
import { ProductionModuleBootstrapper } from './ProductionModuleBootstrapper';
import { ProductionModuleInitializer } from './ProductionModuleInitializer';
import { ProductionModuleMetadata } from './ProductionModuleMetadata';
import { ProductionModuleVersion } from './ProductionModuleVersion';
import { ProductionModuleConfiguration } from './ProductionModuleConfiguration';

export class ProductionModule {
  public static readonly metadata = ProductionModuleMetadata;
  public static readonly version = ProductionModuleVersion;

  public static bootstrap(container: IContainer, config: ProductionModuleConfiguration): void {
    ProductionModuleBootstrapper.bootstrap(container, config);
  }

  public static async initialize(container: IContainer): Promise<void> {
    await ProductionModuleInitializer.initialize(container);
  }
}

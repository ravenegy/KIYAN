import { IContainer } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { IHealthRegistry } from '../../../core/health';
import { BomModuleHealthCheck } from './BomModuleHealthCheck';
import { IFeatureRegistry } from '../../../core/features';

export class BomModuleInitializer {
  public static async initialize(container: IContainer): Promise<void> {
    const healthRegistry = container.resolve<IHealthRegistry>(CoreTokens.HealthRegistry);
    healthRegistry.registerLivenessCheck(new BomModuleHealthCheck());
    healthRegistry.registerReadinessCheck(new BomModuleHealthCheck());

    const featureRegistry = container.resolve<IFeatureRegistry>(CoreTokens.FeatureRegistry);
    featureRegistry.register('bom.enable_versioning', false);
    featureRegistry.register('bom.advanced_cycle_detection', true);
  }
}

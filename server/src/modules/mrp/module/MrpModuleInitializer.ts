import { IContainer } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { IHealthRegistry } from '../../../core/health';
import { MrpModuleHealthCheck } from './MrpModuleHealthCheck';
import { IFeatureRegistry } from '../../../core/features';

export class MrpModuleInitializer {
  public static async initialize(container: IContainer): Promise<void> {
    const healthRegistry = container.resolve<IHealthRegistry>(CoreTokens.HealthRegistry);
    healthRegistry.registerLivenessCheck(new MrpModuleHealthCheck());
    healthRegistry.registerReadinessCheck(new MrpModuleHealthCheck());

    const featureRegistry = container.resolve<IFeatureRegistry>(CoreTokens.FeatureRegistry);
    featureRegistry.register('mrp.advanced_planning', true);
  }
}

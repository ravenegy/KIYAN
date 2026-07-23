import { IContainer } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { IHealthRegistry } from '../../../core/health';
import { ProductionModuleHealthCheck } from './ProductionModuleHealthCheck';
import { IFeatureRegistry } from '../../../core/features';

export class ProductionModuleInitializer {
  public static async initialize(container: IContainer): Promise<void> {
    const healthRegistry = container.resolve<IHealthRegistry>(CoreTokens.HealthRegistry);
    healthRegistry.registerLivenessCheck(new ProductionModuleHealthCheck());
    healthRegistry.registerReadinessCheck(new ProductionModuleHealthCheck());

    const featureRegistry = container.resolve<IFeatureRegistry>(CoreTokens.FeatureRegistry);
    featureRegistry.register('production.advanced_scheduling', false);
    featureRegistry.register('production.auto_issue_materials', true);
  }
}

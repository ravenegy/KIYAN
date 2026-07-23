import { IContainer } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { IHealthRegistry } from '../../../core/health';
import { InventoryModuleHealthCheck } from './InventoryModuleHealthCheck';
import { IFeatureRegistry } from '../../../core/features';

export class InventoryModuleInitializer {
  public static async initialize(container: IContainer): Promise<void> {
    const healthRegistry = container.resolve<IHealthRegistry>(CoreTokens.HealthRegistry);
    healthRegistry.registerLivenessCheck(new InventoryModuleHealthCheck());
    healthRegistry.registerReadinessCheck(new InventoryModuleHealthCheck());

    const featureRegistry = container.resolve<IFeatureRegistry>(CoreTokens.FeatureRegistry);
    featureRegistry.register('inventory.stock_alerts', true);
    featureRegistry.register('inventory.multi_location', false);
  }
}

import { IContainer } from '../../../core/di';
import { CoreTokens } from '../../../core/bootstrap';
import { IHealthRegistry } from '../../../core/health';
import { PurchasingModuleHealthCheck } from './PurchasingModuleHealthCheck';
import { IFeatureRegistry } from '../../../core/features';

export class PurchasingModuleInitializer {
  public static async initialize(container: IContainer): Promise<void> {
    const healthRegistry = container.resolve<IHealthRegistry>(CoreTokens.HealthRegistry);
    healthRegistry.registerLivenessCheck(new PurchasingModuleHealthCheck());
    healthRegistry.registerReadinessCheck(new PurchasingModuleHealthCheck());

    const featureRegistry = container.resolve<IFeatureRegistry>(CoreTokens.FeatureRegistry);
    featureRegistry.register('purchasing.auto_approve_orders', false);
    featureRegistry.register('purchasing.advanced_rfq', true);
  }
}

import { InventoryInfrastructureOptions } from '../infrastructure/configuration/InventoryInfrastructureOptions';

export interface InventoryModuleConfiguration {
  readonly enableStockAlerts?: boolean;
  readonly lowStockThreshold?: number;
  readonly infrastructure: InventoryInfrastructureOptions;
}

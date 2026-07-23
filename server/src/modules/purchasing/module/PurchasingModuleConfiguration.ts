import { PurchasingInfrastructureOptions } from '../infrastructure/configuration/PurchasingInfrastructureOptions';

export interface PurchasingModuleConfiguration {
  readonly enableAutoApproval?: boolean;
  readonly defaultCurrency?: string;
  readonly infrastructure: PurchasingInfrastructureOptions;
}

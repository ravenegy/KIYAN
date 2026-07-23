import { ProductionInfrastructureOptions } from '../infrastructure/configuration/ProductionInfrastructureOptions';

export interface ProductionModuleConfiguration {
  readonly enableScheduling?: boolean;
  readonly defaultPriority?: string;
  readonly infrastructure: ProductionInfrastructureOptions;
}

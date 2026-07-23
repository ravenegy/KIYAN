import { BomInfrastructureOptions } from '../infrastructure/configuration/BomInfrastructureOptions';

export interface BomModuleConfiguration {
  readonly enableBomVersioning?: boolean;
  readonly infrastructure: BomInfrastructureOptions;
}

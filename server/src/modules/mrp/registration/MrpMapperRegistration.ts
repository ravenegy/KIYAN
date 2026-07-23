import { IContainer, Lifetime } from '../../../core/di';
import { MrpModuleTokens } from './MrpModuleTokens';
import { MrpRunMapper } from '../application/mappers/impl/MrpRunMapper';
import { PlannedOrderMapper } from '../application/mappers/impl/PlannedOrderMapper';
import { MaterialRequirementMapper } from '../application/mappers/impl/MaterialRequirementMapper';

export class MrpMapperRegistration {
  public static register(container: IContainer): void {
    container.register(MrpModuleTokens.IMrpRunMapper, () => new MrpRunMapper(), Lifetime.Singleton);
    container.register(MrpModuleTokens.IPlannedOrderMapper, () => new PlannedOrderMapper(), Lifetime.Singleton);
    container.register(MrpModuleTokens.IMaterialRequirementMapper, () => new MaterialRequirementMapper(), Lifetime.Singleton);
  }
}

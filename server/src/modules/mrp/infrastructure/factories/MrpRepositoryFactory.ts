import { IMrpRunRepository } from '../../domain/repositories/IMrpRunRepository';
import { IPlannedOrderRepository } from '../../domain/repositories/IPlannedOrderRepository';
import { IMaterialRequirementRepository } from '../../domain/repositories/IMaterialRequirementRepository';
import { MrpRunRepository } from '../repositories/MrpRunRepository';
import { PlannedOrderRepository } from '../repositories/PlannedOrderRepository';
import { MaterialRequirementRepository } from '../repositories/MaterialRequirementRepository';

export class MrpRepositoryFactory {
  private static mrpRunRepository: IMrpRunRepository;
  private static plannedOrderRepository: IPlannedOrderRepository;
  private static materialRequirementRepository: IMaterialRequirementRepository;

  public static getMrpRunRepository(): IMrpRunRepository {
    if (!this.mrpRunRepository) {
      this.mrpRunRepository = new MrpRunRepository();
    }
    return this.mrpRunRepository;
  }

  public static getPlannedOrderRepository(): IPlannedOrderRepository {
    if (!this.plannedOrderRepository) {
      this.plannedOrderRepository = new PlannedOrderRepository();
    }
    return this.plannedOrderRepository;
  }

  public static getMaterialRequirementRepository(): IMaterialRequirementRepository {
    if (!this.materialRequirementRepository) {
      this.materialRequirementRepository = new MaterialRequirementRepository();
    }
    return this.materialRequirementRepository;
  }
}

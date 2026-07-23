import { IRepository } from '../../../../core/domain/repositories/IRepository';
import { MaterialRequirement } from '../entities/MaterialRequirement';
import { MaterialRequirementId } from '../shared/MaterialRequirementId';

export interface IMaterialRequirementRepository extends IRepository<MaterialRequirement, MaterialRequirementId> {
  findByMrpRunId(mrpRunId: string): Promise<MaterialRequirement[]>;
  findByItemId(itemId: string): Promise<MaterialRequirement[]>;
  findUnsatisfiedRequirements(): Promise<MaterialRequirement[]>;
}

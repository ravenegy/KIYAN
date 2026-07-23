import { IMaterialRequirementMapper } from '../IMaterialRequirementMapper';
import { MaterialRequirement } from '../../../domain/entities/MaterialRequirement';
import { MaterialRequirementDto } from '../../dto/MaterialRequirementDto';

export class MaterialRequirementMapper implements IMaterialRequirementMapper {
  public toDto(materialRequirement: MaterialRequirement): MaterialRequirementDto {
    return {
      id: materialRequirement.id.value,
      itemId: materialRequirement.itemId,
      quantity: materialRequirement.quantity.value,
      requiredDate: materialRequirement.requiredDate.toISOString(),
      sourceType: materialRequirement.sourceType,
      sourceId: materialRequirement.sourceId,
      mrpRunId: materialRequirement.mrpRunId,
      isSatisfied: materialRequirement.isSatisfied,
      version: materialRequirement.version
    };
  }
}

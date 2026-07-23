import { MaterialRequirement } from '../../domain/entities/MaterialRequirement';
import { MaterialRequirementDto } from '../dto/MaterialRequirementDto';

export interface IMaterialRequirementMapper {
  toDto(materialRequirement: MaterialRequirement): MaterialRequirementDto;
}

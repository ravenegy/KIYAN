import { MaterialRequirement } from '../../../domain/entities/MaterialRequirement';
import { MaterialRequirementId } from '../../../domain/shared/MaterialRequirementId';
import { RequirementSourceType } from '../../../domain/enums/RequirementSourceType';
import { Quantity } from '../../../domain/value-objects/Quantity';
import { MaterialRequirementPersistenceModel } from '../models/MaterialRequirementPersistenceModel';

export class MaterialRequirementPersistenceMapper {
  public static toDomain(model: MaterialRequirementPersistenceModel): MaterialRequirement {
    const idResult = MaterialRequirementId.create(model.id);
    if (idResult.isFailure) throw new Error(idResult.error?.message);
    const id = idResult.value!;
    
    const quantityResult = Quantity.create(model.requiredQuantity);
    if (quantityResult.isFailure) throw new Error(quantityResult.error?.message);

    const requirementResult = MaterialRequirement.create(id, {
      itemId: model.itemId,
      quantity: quantityResult.value!,
      requiredDate: model.requiredDate,
      sourceType: model.sourceType as RequirementSourceType,
      sourceId: model.sourceId,
      mrpRunId: model.mrpRunId,
      isSatisfied: model.isSatisfied,
    });

    if (requirementResult.isFailure) {
      throw new Error(`Failed to map Material Requirement: ${requirementResult.error?.message}`);
    }

    const req = requirementResult.value!;
    req.clearDomainEvents();
    return req;
  }

  public static toPersistence(domain: MaterialRequirement): MaterialRequirementPersistenceModel {
    return {
      id: domain.id.value,
      mrpRunId: domain.mrpRunId,
      itemId: domain.itemId,
      requiredQuantity: domain.quantity.value,
      requiredDate: domain.requiredDate,
      sourceType: domain.sourceType,
      sourceId: domain.sourceId || '',
      isSatisfied: domain.isSatisfied,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

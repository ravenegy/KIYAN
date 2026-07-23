import { ProductionMaterialIssue } from '../../../domain/entities/ProductionMaterialIssue';
import { MaterialIssueId } from '../../../domain/shared/MaterialIssueId';
import { Quantity } from '../../../domain/value-objects/Quantity';
import { MaterialIssueStatus } from '../../../domain/enums/MaterialIssueStatus';
import { ProductionMaterialIssuePersistenceModel } from '../models/ProductionMaterialIssuePersistenceModel';

export class ProductionMaterialIssuePersistenceMapper {
  public toDomain(model: ProductionMaterialIssuePersistenceModel): ProductionMaterialIssue {
    const issue = Object.create(ProductionMaterialIssue.prototype) as ProductionMaterialIssue;
    
    issue.load(
      model.itemId,
      Quantity.create(model.requiredQuantity).value!,
      Quantity.create(model.issuedQuantity).value!,
      model.status as MaterialIssueStatus
    );
    
    Object.defineProperty(issue, 'id', { value: MaterialIssueId.create(model.id).value!, writable: false });
    Object.defineProperty(issue, 'createdAt', { value: model.createdAt, writable: false });
    Object.defineProperty(issue, 'updatedAt', { value: model.updatedAt, writable: true });
    Object.defineProperty(issue, 'version', { value: model.version, writable: true });
    
    issue.clearDomainEvents();
    return issue;
  }

  public toPersistence(entity: ProductionMaterialIssue, productionOrderId: string): ProductionMaterialIssuePersistenceModel {
    return {
      id: entity.id.value,
      productionOrderId,
      itemId: entity.itemId,
      requiredQuantity: entity.requiredQuantity.amount,
      issuedQuantity: entity.issuedQuantity.amount,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version
    };
  }
}
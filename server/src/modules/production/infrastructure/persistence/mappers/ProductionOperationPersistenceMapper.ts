import { ProductionOperation } from '../../../domain/entities/ProductionOperation';
import { OperationId } from '../../../domain/shared/OperationId';
import { WorkCenterId } from '../../../domain/shared/WorkCenterId';
import { ProductionDuration } from '../../../domain/value-objects/ProductionDuration';
import { OperationStatus } from '../../../domain/enums/OperationStatus';
import { ProductionOperationPersistenceModel } from '../models/ProductionOperationPersistenceModel';

export class ProductionOperationPersistenceMapper {
  public toDomain(model: ProductionOperationPersistenceModel): ProductionOperation {
    const operation = Object.create(ProductionOperation.prototype) as ProductionOperation;
    
    operation.load(
      model.sequence,
      model.name,
      WorkCenterId.create(model.workCenterId).value!,
      ProductionDuration.create(model.setupTimeMinutes).value!,
      ProductionDuration.create(model.runTimeMinutes).value!,
      model.status as OperationStatus
    );
    
    Object.defineProperty(operation, 'id', { value: OperationId.create(model.id).value!, writable: false });
    Object.defineProperty(operation, 'createdAt', { value: model.createdAt, writable: false });
    Object.defineProperty(operation, 'updatedAt', { value: model.updatedAt, writable: true });
    Object.defineProperty(operation, 'version', { value: model.version, writable: true });
    
    operation.clearDomainEvents();
    return operation;
  }

  public toPersistence(entity: ProductionOperation, productionOrderId: string): ProductionOperationPersistenceModel {
    return {
      id: entity.id.value,
      productionOrderId,
      sequence: entity.sequence,
      name: entity.name,
      workCenterId: entity.workCenterId.value,
      setupTimeMinutes: entity.setupTime.minutes,
      runTimeMinutes: entity.runTime.minutes,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version
    };
  }
}
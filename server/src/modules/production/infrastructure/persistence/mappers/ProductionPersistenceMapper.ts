import { ProductionOrder } from '../../../domain/entities/ProductionOrder';
import { ProductionOrderId } from '../../../domain/shared/ProductionOrderId';
import { Quantity } from '../../../domain/value-objects/Quantity';
import { ProductionOrderStatus } from '../../../domain/enums/ProductionOrderStatus';
import { ProductionPriority } from '../../../domain/enums/ProductionPriority';
import { ProductionOrderPersistenceModel } from '../models/ProductionOrderPersistenceModel';
import { ProductionOperationPersistenceMapper } from './ProductionOperationPersistenceMapper';
import { ProductionMaterialIssuePersistenceMapper } from './ProductionMaterialIssuePersistenceMapper';
import { FinishedGoodReceiptPersistenceMapper } from './FinishedGoodReceiptPersistenceMapper';

export class ProductionPersistenceMapper {
  constructor(
    private readonly operationMapper: ProductionOperationPersistenceMapper,
    private readonly materialIssueMapper: ProductionMaterialIssuePersistenceMapper,
    private readonly receiptMapper: FinishedGoodReceiptPersistenceMapper
  ) {}

  public toDomain(model: ProductionOrderPersistenceModel): ProductionOrder {
    const orderId = ProductionOrderId.create(model.id).value!;
    
    // Use reflection/prototype bypass to recreate the aggregate root
    const order = Object.create(ProductionOrder.prototype) as ProductionOrder;
    
    // Using load pattern as defined in domain
    order.load(
      model.targetItemId,
      Quantity.create(model.plannedQuantity).value!,
      Quantity.create(model.actualQuantity).value!,
      model.startDate,
      model.endDate,
      model.status as ProductionOrderStatus,
      model.priority as ProductionPriority,
      model.operations.map(o => this.operationMapper.toDomain(o)),
      model.materialIssues.map(m => this.materialIssueMapper.toDomain(m)),
      model.receipts.map(r => this.receiptMapper.toDomain(r)),
      model.actualStartDate,
      model.actualEndDate
    );
    
    // Set base entity properties directly
    Object.defineProperty(order, 'id', { value: orderId, writable: false });
    Object.defineProperty(order, 'createdAt', { value: model.createdAt, writable: false });
    Object.defineProperty(order, 'updatedAt', { value: model.updatedAt, writable: true });
    Object.defineProperty(order, 'version', { value: model.version, writable: true });
    
    order.clearDomainEvents();
    
    return order;
  }

  public toPersistence(entity: ProductionOrder): ProductionOrderPersistenceModel {
    return {
      id: entity.id.value,
      targetItemId: entity.targetItemId,
      plannedQuantity: entity.plannedQuantity.amount,
      actualQuantity: entity.actualQuantity.amount,
      startDate: entity.startDate,
      endDate: entity.endDate,
      actualStartDate: entity.actualStartDate,
      actualEndDate: entity.actualEndDate,
      status: entity.status,
      priority: entity.priority,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
      operations: entity.operations.map(o => this.operationMapper.toPersistence(o, entity.id.value)),
      materialIssues: entity.materialIssues.map(m => this.materialIssueMapper.toPersistence(m, entity.id.value)),
      receipts: entity.receipts.map(r => this.receiptMapper.toPersistence(r, entity.id.value))
    };
  }
}
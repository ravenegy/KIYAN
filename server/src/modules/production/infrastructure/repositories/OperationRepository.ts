import { IOperationRepository } from '../../domain/repositories/IOperationRepository';
import { ProductionOperation } from '../../domain/entities/ProductionOperation';
import { OperationId } from '../../domain/shared/OperationId';
import { ProductionOrderId } from '../../domain/shared/ProductionOrderId';
import { ProductionPersistenceMapper } from '../persistence/mappers/ProductionPersistenceMapper';
import { ProductionOrderPersistenceModel } from '../persistence/models/ProductionOrderPersistenceModel';
import { ProductionOperationPersistenceMapper } from '../persistence/mappers/ProductionOperationPersistenceMapper';

export class OperationRepository implements IOperationRepository {
  // Uses the same backing store from ProductionOrderRepository to simulate database
  constructor(
    private readonly store: Map<string, ProductionOrderPersistenceModel>,
    private readonly operationMapper: ProductionOperationPersistenceMapper
  ) {}

  public async findById(id: OperationId): Promise<ProductionOperation | null> {
    for (const order of this.store.values()) {
      for (const op of order.operations) {
        if (op.id === id.value) {
          return this.operationMapper.toDomain(op);
        }
      }
    }
    return null;
  }

  public async findByProductionOrderId(productionOrderId: ProductionOrderId): Promise<ProductionOperation[]> {
    const order = this.store.get(productionOrderId.value);
    if (!order) return [];
    
    return order.operations.map(op => this.operationMapper.toDomain(op));
  }
}
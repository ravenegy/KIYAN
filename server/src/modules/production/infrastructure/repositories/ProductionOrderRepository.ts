import { IProductionOrderRepository } from '../../domain/repositories/IProductionOrderRepository';
import { ProductionOrder } from '../../domain/entities/ProductionOrder';
import { ProductionOrderId } from '../../domain/shared/ProductionOrderId';
import { ProductionPersistenceMapper } from '../persistence/mappers/ProductionPersistenceMapper';
import { ProductionOrderPersistenceModel } from '../persistence/models/ProductionOrderPersistenceModel';

export class ProductionOrderRepository implements IProductionOrderRepository {
  private readonly store = new Map<string, ProductionOrderPersistenceModel>();

  constructor(private readonly mapper: ProductionPersistenceMapper) {}

  public async findById(id: ProductionOrderId): Promise<ProductionOrder | null> {
    const model = this.store.get(id.value);
    if (!model) return null;
    return this.mapper.toDomain(model);
  }

  public async save(order: ProductionOrder): Promise<void> {
    const model = this.mapper.toPersistence(order);
    this.store.set(model.id, model);
  }

  public async findByStatus(status: string): Promise<ProductionOrder[]> {
    const results: ProductionOrder[] = [];
    for (const model of this.store.values()) {
      if (model.status === status) {
        results.push(this.mapper.toDomain(model));
      }
    }
    return results;
  }

  public async findByTargetItemId(itemId: string): Promise<ProductionOrder[]> {
    const results: ProductionOrder[] = [];
    for (const model of this.store.values()) {
      if (model.targetItemId === itemId) {
        results.push(this.mapper.toDomain(model));
      }
    }
    return results;
  }
}
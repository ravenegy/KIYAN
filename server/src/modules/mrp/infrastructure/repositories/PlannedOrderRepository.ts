import { IPlannedOrderRepository } from '../../domain/repositories/IPlannedOrderRepository';
import { PlannedOrder } from '../../domain/entities/PlannedOrder';
import { PlannedOrderId } from '../../domain/shared/PlannedOrderId';
import { PlannedOrderPersistenceMapper } from '../persistence/mappers/PlannedOrderPersistenceMapper';
import { PlannedOrderPersistenceModel } from '../persistence/models/PlannedOrderPersistenceModel';
import { PagedResult } from '../../../../core/domain/repositories/PagedResult';
import { RepositoryQuery } from '../../../../core/domain/repositories/RepositoryQuery';
import { RepositoryOptions } from '../../../../core/domain/repositories/RepositoryOptions';

export class PlannedOrderRepository implements IPlannedOrderRepository {
  private readonly store = new Map<string, PlannedOrderPersistenceModel>();

  public async getById(id: PlannedOrderId, options?: RepositoryOptions): Promise<PlannedOrder | null> {
    const model = this.store.get(id.value);
    if (!model) return null;
    return PlannedOrderPersistenceMapper.toDomain(model);
  }

  public async exists(id: PlannedOrderId, options?: RepositoryOptions): Promise<boolean> {
    return this.store.has(id.value);
  }

  public async count(query?: RepositoryQuery<PlannedOrder>, options?: RepositoryOptions): Promise<number> {
    return this.store.size;
  }

  public async find(query?: RepositoryQuery<PlannedOrder>, options?: RepositoryOptions): Promise<PagedResult<PlannedOrder>> {
    const items = Array.from(this.store.values()).map(m => PlannedOrderPersistenceMapper.toDomain(m));
    return new PagedResult(items, items.length, 1, items.length);
  }

  public async findOne(query?: RepositoryQuery<PlannedOrder>, options?: RepositoryOptions): Promise<PlannedOrder | null> {
    const items = Array.from(this.store.values());
    if (items.length === 0) return null;
    return PlannedOrderPersistenceMapper.toDomain(items[0]);
  }

  public async add(entity: PlannedOrder, options?: RepositoryOptions): Promise<void> {
    const model = PlannedOrderPersistenceMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async update(entity: PlannedOrder, options?: RepositoryOptions): Promise<void> {
    const model = PlannedOrderPersistenceMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async delete(entity: PlannedOrder, options?: RepositoryOptions): Promise<void> {
    this.store.delete(entity.id.value);
  }

  public async softDelete(entity: PlannedOrder, options?: RepositoryOptions): Promise<void> {
    this.store.delete(entity.id.value);
  }

  public async restore(entity: PlannedOrder, options?: RepositoryOptions): Promise<void> {
    const model = PlannedOrderPersistenceMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async save(entity: PlannedOrder, options?: RepositoryOptions): Promise<void> {
    const model = PlannedOrderPersistenceMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async findByMrpRunId(mrpRunId: string): Promise<PlannedOrder[]> {
    const models = Array.from(this.store.values()).filter(m => m.mrpRunId === mrpRunId);
    return models.map(PlannedOrderPersistenceMapper.toDomain);
  }

  public async findByItemId(itemId: string): Promise<PlannedOrder[]> {
    const models = Array.from(this.store.values()).filter(m => m.itemId === itemId);
    return models.map(PlannedOrderPersistenceMapper.toDomain);
  }

  public async deleteDraftOrdersByMrpRunId(mrpRunId: string): Promise<void> {
    for (const [key, model] of this.store.entries()) {
      if (model.mrpRunId === mrpRunId && model.status === 'Draft') {
        this.store.delete(key);
      }
    }
  }
}

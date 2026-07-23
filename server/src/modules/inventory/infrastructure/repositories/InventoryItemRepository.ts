import { IInventoryItemRepository } from '../../domain/repositories/IInventoryItemRepository';
import { InventoryItem } from '../../domain/entities/InventoryItem';
import { InventoryItemId } from '../../domain/shared/InventoryItemId';
import { SKU } from '../../domain/value-objects/SKU';
import { PagedResult } from '../../../../core/domain/repositories/PagedResult';
import { RepositoryQuery } from '../../../../core/domain/repositories/RepositoryQuery';
import { RepositoryOptions } from '../../../../core/domain/repositories/RepositoryOptions';
import { InventoryPersistenceMapper } from '../persistence/mappers/InventoryPersistenceMapper';
import { InventoryItemPersistenceModel } from '../persistence/models/InventoryItemPersistenceModel';

export class InventoryItemRepository implements IInventoryItemRepository {
  private readonly store = new Map<string, InventoryItemPersistenceModel>();

  constructor(private readonly mapper: InventoryPersistenceMapper) {}

  public async getById(id: InventoryItemId, options?: RepositoryOptions): Promise<InventoryItem | null> {
    const model = this.store.get(id.value);
    if (!model) return null;
    return this.mapper.toDomain(model);
  }

  public async exists(id: InventoryItemId, options?: RepositoryOptions): Promise<boolean> {
    return this.store.has(id.value);
  }

  public async count(query?: RepositoryQuery<InventoryItem>, options?: RepositoryOptions): Promise<number> {
    // In-memory naive implementation
    return this.store.size;
  }

  public async find(query?: RepositoryQuery<InventoryItem>, options?: RepositoryOptions): Promise<PagedResult<InventoryItem>> {
    const items = Array.from(this.store.values()).map(m => this.mapper.toDomain(m));
    return new PagedResult(items, items.length, 1, items.length);
  }

  public async findOne(query?: RepositoryQuery<InventoryItem>, options?: RepositoryOptions): Promise<InventoryItem | null> {
    const items = Array.from(this.store.values());
    if (items.length === 0) return null;
    return this.mapper.toDomain(items[0]);
  }

  public async add(entity: InventoryItem, options?: RepositoryOptions): Promise<void> {
    const model = this.mapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async update(entity: InventoryItem, options?: RepositoryOptions): Promise<void> {
    const model = this.mapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async delete(entity: InventoryItem, options?: RepositoryOptions): Promise<void> {
    this.store.delete(entity.id.value);
  }

  public async softDelete(entity: InventoryItem, options?: RepositoryOptions): Promise<void> {
    this.store.delete(entity.id.value);
  }

  public async restore(entity: InventoryItem, options?: RepositoryOptions): Promise<void> {
    const model = this.mapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async save(entity: InventoryItem, options?: RepositoryOptions): Promise<void> {
    const model = this.mapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async findBySku(sku: SKU): Promise<InventoryItem | null> {
    const items = Array.from(this.store.values()).filter(m => m.sku === sku.value);
    if (items.length === 0) return null;
    return this.mapper.toDomain(items[0]);
  }
}

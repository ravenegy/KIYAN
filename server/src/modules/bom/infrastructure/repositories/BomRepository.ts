import { IBomRepository } from '../../domain/repositories/IBomRepository';
import { BillOfMaterial } from '../../domain/entities/BillOfMaterial';
import { BomId } from '../../domain/shared/BomId';
import { ItemId } from '../../domain/shared/ItemId';
import { BomStatus } from '../../domain/enums/BomStatus';
import { PagedResult } from '../../../../core/domain/repositories/PagedResult';
import { RepositoryQuery } from '../../../../core/domain/repositories/RepositoryQuery';
import { RepositoryOptions } from '../../../../core/domain/repositories/RepositoryOptions';
import { BomPersistenceMapper } from '../persistence/mappers/BomPersistenceMapper';
import { BomPersistenceModel } from '../persistence/models/BomPersistenceModel';

export class BomRepository implements IBomRepository {
  private readonly store = new Map<string, BomPersistenceModel>();

  constructor(private readonly mapper: BomPersistenceMapper) {}

  public async getById(id: BomId, options?: RepositoryOptions): Promise<BillOfMaterial | null> {
    const model = this.store.get(id.value);
    if (!model) return null;
    return this.mapper.toDomain(model);
  }

  public async exists(id: BomId, options?: RepositoryOptions): Promise<boolean> {
    return this.store.has(id.value);
  }

  public async count(query?: RepositoryQuery<BillOfMaterial>, options?: RepositoryOptions): Promise<number> {
    return this.store.size;
  }

  public async find(query?: RepositoryQuery<BillOfMaterial>, options?: RepositoryOptions): Promise<PagedResult<BillOfMaterial>> {
    const items = Array.from(this.store.values()).map(m => this.mapper.toDomain(m));
    return new PagedResult(items, items.length, 1, items.length);
  }

  public async findOne(query?: RepositoryQuery<BillOfMaterial>, options?: RepositoryOptions): Promise<BillOfMaterial | null> {
    const items = Array.from(this.store.values());
    if (items.length === 0) return null;
    return this.mapper.toDomain(items[0]);
  }

  public async add(entity: BillOfMaterial, options?: RepositoryOptions): Promise<void> {
    const model = this.mapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async update(entity: BillOfMaterial, options?: RepositoryOptions): Promise<void> {
    const model = this.mapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async delete(entity: BillOfMaterial, options?: RepositoryOptions): Promise<void> {
    this.store.delete(entity.id.value);
  }

  public async softDelete(entity: BillOfMaterial, options?: RepositoryOptions): Promise<void> {
    this.store.delete(entity.id.value);
  }

  public async restore(entity: BillOfMaterial, options?: RepositoryOptions): Promise<void> {
    const model = this.mapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async save(entity: BillOfMaterial, options?: RepositoryOptions): Promise<void> {
    const model = this.mapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async findByTargetItemId(itemId: ItemId): Promise<BillOfMaterial[]> {
    const boms = Array.from(this.store.values())
      .filter(m => m.targetItemId === itemId.value)
      .map(m => this.mapper.toDomain(m));
    return boms;
  }

  public async getActiveBomForTarget(itemId: ItemId): Promise<BillOfMaterial | null> {
    const boms = Array.from(this.store.values())
      .filter(m => m.targetItemId === itemId.value && m.status === BomStatus.Active);
    
    if (boms.length === 0) return null;
    return this.mapper.toDomain(boms[0]);
  }
}

import { IMaterialRequirementRepository } from '../../domain/repositories/IMaterialRequirementRepository';
import { MaterialRequirement } from '../../domain/entities/MaterialRequirement';
import { MaterialRequirementId } from '../../domain/shared/MaterialRequirementId';
import { MaterialRequirementPersistenceMapper } from '../persistence/mappers/MaterialRequirementPersistenceMapper';
import { MaterialRequirementPersistenceModel } from '../persistence/models/MaterialRequirementPersistenceModel';
import { PagedResult } from '../../../../core/domain/repositories/PagedResult';
import { RepositoryQuery } from '../../../../core/domain/repositories/RepositoryQuery';
import { RepositoryOptions } from '../../../../core/domain/repositories/RepositoryOptions';

export class MaterialRequirementRepository implements IMaterialRequirementRepository {
  private readonly store = new Map<string, MaterialRequirementPersistenceModel>();

  public async getById(id: MaterialRequirementId, options?: RepositoryOptions): Promise<MaterialRequirement | null> {
    const model = this.store.get(id.value);
    if (!model) return null;
    return MaterialRequirementPersistenceMapper.toDomain(model);
  }

  public async exists(id: MaterialRequirementId, options?: RepositoryOptions): Promise<boolean> {
    return this.store.has(id.value);
  }

  public async count(query?: RepositoryQuery<MaterialRequirement>, options?: RepositoryOptions): Promise<number> {
    return this.store.size;
  }

  public async find(query?: RepositoryQuery<MaterialRequirement>, options?: RepositoryOptions): Promise<PagedResult<MaterialRequirement>> {
    const items = Array.from(this.store.values()).map(m => MaterialRequirementPersistenceMapper.toDomain(m));
    return new PagedResult(items, items.length, 1, items.length);
  }

  public async findOne(query?: RepositoryQuery<MaterialRequirement>, options?: RepositoryOptions): Promise<MaterialRequirement | null> {
    const items = Array.from(this.store.values());
    if (items.length === 0) return null;
    return MaterialRequirementPersistenceMapper.toDomain(items[0]);
  }

  public async add(entity: MaterialRequirement, options?: RepositoryOptions): Promise<void> {
    const model = MaterialRequirementPersistenceMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async update(entity: MaterialRequirement, options?: RepositoryOptions): Promise<void> {
    const model = MaterialRequirementPersistenceMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async delete(entity: MaterialRequirement, options?: RepositoryOptions): Promise<void> {
    this.store.delete(entity.id.value);
  }

  public async softDelete(entity: MaterialRequirement, options?: RepositoryOptions): Promise<void> {
    this.store.delete(entity.id.value);
  }

  public async restore(entity: MaterialRequirement, options?: RepositoryOptions): Promise<void> {
    const model = MaterialRequirementPersistenceMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async save(entity: MaterialRequirement, options?: RepositoryOptions): Promise<void> {
    const model = MaterialRequirementPersistenceMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async findByMrpRunId(mrpRunId: string): Promise<MaterialRequirement[]> {
    const models = Array.from(this.store.values()).filter(m => m.mrpRunId === mrpRunId);
    return models.map(MaterialRequirementPersistenceMapper.toDomain);
  }

  public async findByItemId(itemId: string): Promise<MaterialRequirement[]> {
    const models = Array.from(this.store.values()).filter(m => m.itemId === itemId);
    return models.map(MaterialRequirementPersistenceMapper.toDomain);
  }

  public async findUnsatisfiedRequirements(): Promise<MaterialRequirement[]> {
    const models = Array.from(this.store.values()).filter(m => !m.isSatisfied);
    return models.map(MaterialRequirementPersistenceMapper.toDomain);
  }
}

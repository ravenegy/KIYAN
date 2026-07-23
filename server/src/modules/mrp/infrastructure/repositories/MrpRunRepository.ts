import { IMrpRunRepository } from '../../domain/repositories/IMrpRunRepository';
import { MrpRun } from '../../domain/entities/MrpRun';
import { MrpRunId } from '../../domain/shared/MrpRunId';
import { MrpRunStatus } from '../../domain/enums/MrpRunStatus';
import { MrpRunPersistenceMapper } from '../persistence/mappers/MrpRunPersistenceMapper';
import { MrpRunPersistenceModel } from '../persistence/models/MrpRunPersistenceModel';
import { PagedResult } from '../../../../core/domain/repositories/PagedResult';
import { RepositoryQuery } from '../../../../core/domain/repositories/RepositoryQuery';
import { RepositoryOptions } from '../../../../core/domain/repositories/RepositoryOptions';

export class MrpRunRepository implements IMrpRunRepository {
  private readonly store = new Map<string, MrpRunPersistenceModel>();

  public async getById(id: MrpRunId, options?: RepositoryOptions): Promise<MrpRun | null> {
    const model = this.store.get(id.value);
    if (!model) return null;
    return MrpRunPersistenceMapper.toDomain(model);
  }

  public async exists(id: MrpRunId, options?: RepositoryOptions): Promise<boolean> {
    return this.store.has(id.value);
  }

  public async count(query?: RepositoryQuery<MrpRun>, options?: RepositoryOptions): Promise<number> {
    return this.store.size;
  }

  public async find(query?: RepositoryQuery<MrpRun>, options?: RepositoryOptions): Promise<PagedResult<MrpRun>> {
    const items = Array.from(this.store.values()).map(m => MrpRunPersistenceMapper.toDomain(m));
    return new PagedResult(items, items.length, 1, items.length);
  }

  public async findOne(query?: RepositoryQuery<MrpRun>, options?: RepositoryOptions): Promise<MrpRun | null> {
    const items = Array.from(this.store.values());
    if (items.length === 0) return null;
    return MrpRunPersistenceMapper.toDomain(items[0]);
  }

  public async add(entity: MrpRun, options?: RepositoryOptions): Promise<void> {
    const model = MrpRunPersistenceMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async update(entity: MrpRun, options?: RepositoryOptions): Promise<void> {
    const model = MrpRunPersistenceMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async delete(entity: MrpRun, options?: RepositoryOptions): Promise<void> {
    this.store.delete(entity.id.value);
  }

  public async softDelete(entity: MrpRun, options?: RepositoryOptions): Promise<void> {
    this.store.delete(entity.id.value);
  }

  public async restore(entity: MrpRun, options?: RepositoryOptions): Promise<void> {
    const model = MrpRunPersistenceMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async save(entity: MrpRun, options?: RepositoryOptions): Promise<void> {
    const model = MrpRunPersistenceMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async findLatestRun(): Promise<MrpRun | null> {
    const allModels = Array.from(this.store.values());
    if (allModels.length === 0) return null;
    
    allModels.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return MrpRunPersistenceMapper.toDomain(allModels[0]);
  }

  public async findPendingRuns(): Promise<MrpRun[]> {
    const pendingModels = Array.from(this.store.values()).filter(
      model => model.status === MrpRunStatus.Pending || model.status === MrpRunStatus.Running
    );
    return pendingModels.map(MrpRunPersistenceMapper.toDomain);
  }
}

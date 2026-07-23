import { IPermissionGroupRepository } from '../../domain/repositories/IPermissionGroupRepository';
import { PermissionGroup } from '../../domain/entities/PermissionGroup';
import { PermissionGroupMapper } from '../persistence/mappers/PermissionGroupMapper';
import { PermissionGroupModel } from '../persistence/models/PermissionGroupModel';

export class PermissionGroupRepository implements IPermissionGroupRepository {
  private readonly store = new Map<string, PermissionGroupModel>();

  public async findById(id: string): Promise<PermissionGroup | null> {
    const model = this.store.get(id);
    if (!model) return null;
    return PermissionGroupMapper.toDomain(model);
  }

  public async save(entity: PermissionGroup): Promise<void> {
    const model = PermissionGroupMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}

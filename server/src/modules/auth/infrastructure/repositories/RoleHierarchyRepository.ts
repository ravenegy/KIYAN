import { IRoleHierarchyRepository } from '../../domain/repositories/IRoleHierarchyRepository';
import { RoleHierarchy } from '../../domain/entities/RoleHierarchy';
import { RoleHierarchyMapper } from '../persistence/mappers/RoleHierarchyMapper';
import { RoleHierarchyModel } from '../persistence/models/RoleHierarchyModel';

export class RoleHierarchyRepository implements IRoleHierarchyRepository {
  private readonly store = new Map<string, RoleHierarchyModel>();

  public async findById(id: string): Promise<RoleHierarchy | null> {
    const model = this.store.get(id);
    if (!model) return null;
    return RoleHierarchyMapper.toDomain(model);
  }

  public async save(entity: RoleHierarchy): Promise<void> {
    const model = RoleHierarchyMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}

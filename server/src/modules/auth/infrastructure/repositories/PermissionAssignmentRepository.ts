import { IPermissionAssignmentRepository } from '../../domain/repositories/IPermissionAssignmentRepository';
import { PermissionAssignment } from '../../domain/entities/PermissionAssignment';
import { PermissionAssignmentMapper } from '../persistence/mappers/PermissionAssignmentMapper';
import { PermissionAssignmentModel } from '../persistence/models/PermissionAssignmentModel';

export class PermissionAssignmentRepository implements IPermissionAssignmentRepository {
  private readonly store = new Map<string, PermissionAssignmentModel>();

  public async findById(id: string): Promise<PermissionAssignment | null> {
    const model = this.store.get(id);
    if (!model) return null;
    return PermissionAssignmentMapper.toDomain(model);
  }

  public async save(entity: PermissionAssignment): Promise<void> {
    const model = PermissionAssignmentMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}

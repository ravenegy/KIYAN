import { IRoleAssignmentRepository } from '../../domain/repositories/IRoleAssignmentRepository';
import { RoleAssignment } from '../../domain/entities/RoleAssignment';
import { RoleAssignmentMapper } from '../persistence/mappers/RoleAssignmentMapper';
import { RoleAssignmentModel } from '../persistence/models/RoleAssignmentModel';

export class RoleAssignmentRepository implements IRoleAssignmentRepository {
  private readonly store = new Map<string, RoleAssignmentModel>();

  public async findById(id: string): Promise<RoleAssignment | null> {
    const model = this.store.get(id);
    if (!model) return null;
    return RoleAssignmentMapper.toDomain(model);
  }

  public async save(entity: RoleAssignment): Promise<void> {
    const model = RoleAssignmentMapper.toPersistence(entity);
    this.store.set(model.id, model);
  }

  public async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}

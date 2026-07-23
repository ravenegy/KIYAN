import { RoleAssignment } from '../../../domain/entities/RoleAssignment';
import { RoleAssignmentModel } from '../models/RoleAssignmentModel';

export class RoleAssignmentMapper {
  public static toDomain(model: RoleAssignmentModel): RoleAssignment {
    return {} as RoleAssignment;
  }

  public static toPersistence(entity: RoleAssignment): RoleAssignmentModel {
    return {
      id: (entity as any).id?.toString() || crypto.randomUUID()
    } as RoleAssignmentModel;
  }
}

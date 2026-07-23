import { PermissionAssignment } from '../../../domain/entities/PermissionAssignment';
import { PermissionAssignmentModel } from '../models/PermissionAssignmentModel';

export class PermissionAssignmentMapper {
  public static toDomain(model: PermissionAssignmentModel): PermissionAssignment {
    return {} as PermissionAssignment;
  }

  public static toPersistence(entity: PermissionAssignment): PermissionAssignmentModel {
    return {
      id: (entity as any).id?.toString() || crypto.randomUUID()
    } as PermissionAssignmentModel;
  }
}

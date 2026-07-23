import { RoleHierarchy } from '../../../domain/entities/RoleHierarchy';
import { RoleHierarchyModel } from '../models/RoleHierarchyModel';

export class RoleHierarchyMapper {
  public static toDomain(model: RoleHierarchyModel): RoleHierarchy {
    return {} as RoleHierarchy;
  }

  public static toPersistence(entity: RoleHierarchy): RoleHierarchyModel {
    return {
      id: (entity as any).id?.toString() || crypto.randomUUID()
    } as RoleHierarchyModel;
  }
}

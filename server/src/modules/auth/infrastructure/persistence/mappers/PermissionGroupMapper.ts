import { PermissionGroup } from '../../../domain/entities/PermissionGroup';
import { PermissionGroupModel } from '../models/PermissionGroupModel';

export class PermissionGroupMapper {
  public static toDomain(model: PermissionGroupModel): PermissionGroup {
    return {} as PermissionGroup;
  }

  public static toPersistence(entity: PermissionGroup): PermissionGroupModel {
    return {
      id: (entity as any).id?.toString() || crypto.randomUUID()
    } as PermissionGroupModel;
  }
}

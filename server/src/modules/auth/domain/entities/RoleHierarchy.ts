import { Entity } from '../../../../core/domain/entities/Entity';
import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { RoleId } from '../../../identity/domain/value-objects/RoleId';
import { RoleHierarchyException } from '../exceptions/RoleHierarchyException';

export class RoleHierarchyId extends StronglyTypedId<string> {
  private constructor(value: string) { super(value); }
  public static create(value: string): RoleHierarchyId { return new RoleHierarchyId(value); }
}

export class RoleHierarchy extends Entity<RoleHierarchyId> {
  private constructor(
    id: RoleHierarchyId,
    private _parentRoleId: RoleId,
    private _childRoleId: RoleId
  ) {
    super(id);
  }

  public get parentRoleId(): RoleId { return this._parentRoleId; }
  public get childRoleId(): RoleId { return this._childRoleId; }

  public static create(id: RoleHierarchyId, parentRoleId: RoleId, childRoleId: RoleId): RoleHierarchy {
    if (parentRoleId.equals(childRoleId)) {
      throw new RoleHierarchyException('A role cannot be its own parent.');
    }
    return new RoleHierarchy(id, parentRoleId, childRoleId);
  }
}

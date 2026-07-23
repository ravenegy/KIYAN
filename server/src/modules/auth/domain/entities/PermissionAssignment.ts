import { Entity } from '../../../../core/domain/entities/Entity';
import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { PermissionId } from '../../../identity/domain/value-objects/PermissionId';

export class PermissionAssignmentId extends StronglyTypedId<string> {
  private constructor(value: string) { super(value); }
  public static create(value: string): PermissionAssignmentId { return new PermissionAssignmentId(value); }
}

export class PermissionAssignment extends Entity<PermissionAssignmentId> {
  private constructor(
    id: PermissionAssignmentId,
    private _permissionId: PermissionId,
    private _assigneeId: string,
    private _isGranted: boolean
  ) {
    super(id);
  }

  public get permissionId(): PermissionId { return this._permissionId; }
  public get assigneeId(): string { return this._assigneeId; }
  public get isGranted(): boolean { return this._isGranted; }

  public static create(id: PermissionAssignmentId, permissionId: PermissionId, assigneeId: string, isGranted: boolean): PermissionAssignment {
    return new PermissionAssignment(id, permissionId, assigneeId, isGranted);
  }
}

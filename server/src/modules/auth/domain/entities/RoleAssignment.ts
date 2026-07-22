import { Entity } from '../../../../core/domain/entities/Entity';
import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { RoleId } from '../../../identity/domain/value-objects/RoleId';

export class RoleAssignmentId extends StronglyTypedId<string> {
  private constructor(value: string) { super(value); }
  public static create(value: string): RoleAssignmentId { return new RoleAssignmentId(value); }
}

export class RoleAssignment extends Entity<RoleAssignmentId> {
  private constructor(
    id: RoleAssignmentId,
    private _roleId: RoleId,
    private _assigneeId: string,
    private _assignedAt: Date
  ) {
    super(id);
  }

  public get roleId(): RoleId { return this._roleId; }
  public get assigneeId(): string { return this._assigneeId; }
  public get assignedAt(): Date { return this._assignedAt; }

  public static create(id: RoleAssignmentId, roleId: RoleId, assigneeId: string): RoleAssignment {
    return new RoleAssignment(id, roleId, assigneeId, new Date());
  }
}

import { Entity } from '../../../../core/domain/entities/Entity';
import { StronglyTypedId } from '../../../../core/domain/entities/StronglyTypedId';
import { PermissionId } from '../../../identity/domain/value-objects/PermissionId';

export class PermissionGroupId extends StronglyTypedId<string> {
  private constructor(value: string) { super(value); }
  public static create(value: string): PermissionGroupId { return new PermissionGroupId(value); }
}

export class PermissionGroup extends Entity<PermissionGroupId> {
  private _permissions: Set<string> = new Set();
  
  private constructor(id: PermissionGroupId, private _name: string) {
    super(id);
  }

  public get name(): string { return this._name; }
  public get permissions(): ReadonlyArray<string> { return Array.from(this._permissions); }

  public static create(id: PermissionGroupId, name: string): PermissionGroup {
    return new PermissionGroup(id, name);
  }

  public addPermission(permissionId: PermissionId): void {
    this._permissions.add(permissionId.value);
  }
}

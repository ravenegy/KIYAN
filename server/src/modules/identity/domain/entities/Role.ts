import { Entity } from '../../../../core/domain/entities/Entity';
import { RoleId } from '../value-objects/RoleId';
import { Permission } from './Permission';
import { IdentityException } from '../exceptions/IdentityException';

export class Role extends Entity<RoleId> {
  private _name: string;
  private _description: string;
  private _permissions: Permission[];

  private constructor(
    id: RoleId,
    name: string,
    description: string,
    permissions: Permission[] = [],
    createdAt?: Date,
    version?: number
  ) {
    super(id, createdAt, version);
    this._name = name;
    this._description = description;
    this._permissions = [...permissions];
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get permissions(): ReadonlyArray<Permission> {
    return Object.freeze([...this._permissions]);
  }

  public static create(
    id: RoleId,
    name: string,
    description: string,
    permissions: Permission[] = []
  ): Role {
    if (!name || name.trim().length === 0) {
      throw new IdentityException('Role name cannot be empty');
    }

    return new Role(id, name, description, permissions);
  }

  public rename(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new IdentityException('Role name cannot be empty');
    }
    this._name = newName;
  }

  public grantPermission(permission: Permission): void {
    if (!permission) {
      throw new IdentityException('Permission cannot be null');
    }
    const exists = this._permissions.some((p) => p.equals(permission));
    if (!exists) {
      this._permissions.push(permission);
    }
  }

  public revokePermission(permission: Permission): void {
    if (!permission) {
      throw new IdentityException('Permission cannot be null');
    }
    this._permissions = this._permissions.filter((p) => !p.equals(permission));
  }
}

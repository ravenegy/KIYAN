import { Entity } from '../../../../core/domain/entities/Entity';
import { PermissionId } from '../value-objects/PermissionId';
import { PermissionEffect } from '../enums/PermissionEffect';
import { IdentityException } from '../exceptions/IdentityException';

export class Permission extends Entity<PermissionId> {
  private _name: string;
  private _code: string;
  private _description: string;
  private _effect: PermissionEffect;

  private constructor(
    id: PermissionId,
    name: string,
    code: string,
    description: string,
    effect: PermissionEffect,
    createdAt?: Date,
    version?: number
  ) {
    super(id, createdAt, version);
    this._name = name;
    this._code = code;
    this._description = description;
    this._effect = effect;
  }

  public get name(): string {
    return this._name;
  }

  public get code(): string {
    return this._code;
  }

  public get description(): string {
    return this._description;
  }

  public get effect(): PermissionEffect {
    return this._effect;
  }

  public static create(
    id: PermissionId,
    name: string,
    code: string,
    description: string,
    effect: PermissionEffect
  ): Permission {
    if (!name || name.trim().length === 0) {
      throw new IdentityException('Permission name cannot be empty');
    }
    if (!code || code.trim().length === 0) {
      throw new IdentityException('Permission code cannot be empty');
    }

    return new Permission(id, name, code, description, effect);
  }
}

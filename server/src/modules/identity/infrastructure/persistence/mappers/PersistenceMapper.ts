import { User } from '../../../domain/entities/User';
import { Role } from '../../../domain/entities/Role';
import { Permission } from '../../../domain/entities/Permission';
import { Claim } from '../../../domain/entities/Claim';
import { UserSession } from '../../../domain/entities/UserSession';
import { RefreshToken } from '../../../domain/entities/RefreshToken';
import { UserModel, RoleModel, PermissionModel, UserSessionModel, RefreshTokenModel } from '../models';
import { UserId } from '../../../domain/value-objects/UserId';
import { RoleId } from '../../../domain/value-objects/RoleId';
import { PermissionId } from '../../../domain/value-objects/PermissionId';
import { SessionId } from '../../../domain/value-objects/SessionId';
import { RefreshTokenId } from '../../../domain/value-objects/RefreshTokenId';
import { Username } from '../../../domain/value-objects/Username';
import { EmailAddress } from '../../../domain/value-objects/EmailAddress';
import { PasswordHash } from '../../../domain/value-objects/PasswordHash';
import { UserStatus } from '../../../domain/enums/UserStatus';
import { PermissionEffect } from '../../../domain/enums/PermissionEffect';
import { SessionStatus } from '../../../domain/enums/SessionStatus';

export class PersistenceMapper {
  
  public static toUserModel(user: User): UserModel {
    return {
      id: user.id.value,
      username: user.username.value,
      email: user.emailAddress.value,
      password_hash: user.passwordHash.value,
      status: user.status as unknown as number,
      roles: user.roles.map(r => r.id.value),
      claims: user.claims.map(c => ({ type: c.type, value: c.value })),
      permissions: user.permissions.map(p => p.id.value),
      last_login_at: user.lastLoginAt || null,
      password_changed_at: user.passwordChangedAt || null,
      failed_login_attempts: user.failedLoginAttempts,
      lockout_until: user.lockoutUntil || null,
      created_at: user.createdAt,
      version: user.version
    };
  }

  public static toUserDomain(model: UserModel, roles: Role[] = [], permissions: Permission[] = []): User {
    const claims = model.claims.map(c => (Claim as any).create(c.type, c.value));
    
    return new (User as any)(
      UserId.create(model.id),
      Username.create(model.username),
      EmailAddress.create(model.email),
      PasswordHash.create(model.password_hash),
      model.status as unknown as UserStatus,
      roles,
      claims,
      permissions,
      model.created_at,
      model.version,
      model.last_login_at,
      model.password_changed_at,
      model.failed_login_attempts,
      model.lockout_until
    );
  }

  public static toRoleModel(role: Role): RoleModel {
    return {
      id: role.id.value,
      name: role.name,
      description: role.description,
      permissions: role.permissions.map(p => p.id.value),
      created_at: role.createdAt,
      version: role.version
    };
  }

  public static toRoleDomain(model: RoleModel, permissions: Permission[] = []): Role {
    return new (Role as any)(
      RoleId.create(model.id),
      model.name,
      model.description,
      permissions,
      model.created_at,
      model.version
    );
  }

  public static toPermissionModel(permission: Permission): PermissionModel {
    return {
      id: permission.id.value,
      name: permission.name,
      code: permission.code,
      description: permission.description,
      effect: permission.effect as unknown as number,
      created_at: permission.createdAt,
      version: permission.version
    };
  }

  public static toPermissionDomain(model: PermissionModel): Permission {
    return new (Permission as any)(
      PermissionId.create(model.id),
      model.name,
      model.code,
      model.description,
      model.effect as unknown as PermissionEffect,
      model.created_at,
      model.version
    );
  }

  public static toUserSessionModel(session: UserSession): UserSessionModel {
    return {
      id: session.id.value,
      user_id: session.userId.value,
      ip_address: '',
      user_agent: '',
      expires_at: session.expiresAt,
      is_revoked: session.revokedAt !== undefined,
      created_at: session.createdAt,
      version: session.version
    };
  }

  public static toUserSessionDomain(model: UserSessionModel): UserSession {
    return new (UserSession as any)(
      SessionId.create(model.id),
      UserId.create(model.user_id),
      model.expires_at,
      model.is_revoked ? SessionStatus.REVOKED : SessionStatus.ACTIVE,
      model.created_at,
      model.is_revoked ? new Date() : undefined,
      model.version
    );
  }

  public static toRefreshTokenModel(token: RefreshToken): RefreshTokenModel {
    return {
      id: token.id.value,
      token: token.id.value,
      user_id: token.userId.value,
      expires_at: token.expiresAt,
      is_revoked: token.revokedAt !== undefined,
      created_at: token.createdAt,
      version: token.version
    };
  }

  public static toRefreshTokenDomain(model: RefreshTokenModel): RefreshToken {
    return new (RefreshToken as any)(
      RefreshTokenId.create(model.id),
      UserId.create(model.user_id),
      model.expires_at,
      model.created_at,
      undefined,
      model.is_revoked ? new Date() : undefined,
      model.version
    );
  }
}

import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IRoleRepository } from '../../domain/repositories/IRoleRepository';
import { IPermissionRepository } from '../../domain/repositories/IPermissionRepository';
import { IUserSessionRepository } from '../../domain/repositories/IUserSessionRepository';
import { IRefreshTokenRepository } from '../../domain/repositories/IRefreshTokenRepository';
import { UserRepository } from '../repositories/UserRepository';
import { RoleRepository } from '../repositories/RoleRepository';
import { PermissionRepository } from '../repositories/PermissionRepository';
import { SessionRepository } from '../repositories/SessionRepository';
import { RefreshTokenRepository } from '../repositories/RefreshTokenRepository';

export class RepositoryFactory {
  // Simple factory pattern with singletons for in-memory DB instances
  private static userRepository: IUserRepository;
  private static roleRepository: IRoleRepository;
  private static permissionRepository: IPermissionRepository;
  private static sessionRepository: IUserSessionRepository;
  private static refreshTokenRepository: IRefreshTokenRepository;

  public static getUserRepository(): IUserRepository {
    if (!this.userRepository) {
      this.userRepository = new UserRepository();
    }
    return this.userRepository;
  }

  public static getRoleRepository(): IRoleRepository {
    if (!this.roleRepository) {
      this.roleRepository = new RoleRepository();
    }
    return this.roleRepository;
  }

  public static getPermissionRepository(): IPermissionRepository {
    if (!this.permissionRepository) {
      this.permissionRepository = new PermissionRepository();
    }
    return this.permissionRepository;
  }

  public static getSessionRepository(): IUserSessionRepository {
    if (!this.sessionRepository) {
      this.sessionRepository = new SessionRepository();
    }
    return this.sessionRepository;
  }

  public static getRefreshTokenRepository(): IRefreshTokenRepository {
    if (!this.refreshTokenRepository) {
      this.refreshTokenRepository = new RefreshTokenRepository();
    }
    return this.refreshTokenRepository;
  }
}


import { IContainer } from '../../../core';
import { IdentityModuleOptions } from './IdentityModuleManifest';
import { IdentityTokens } from './IdentityTokens';
import { Lifetime } from '../../../core';
import { Token } from '../../../core';
import { CoreTokens } from '../../../core';

import { AuthenticationApplicationService } from '../application/services/AuthenticationApplicationService';
import { IdentityApplicationService } from '../application/services/IdentityApplicationService';
import { PermissionApplicationService } from '../application/services/PermissionApplicationService';
import { PermissionReadService } from '../application/services/PermissionReadService';
import { PermissionWriteService } from '../application/services/PermissionWriteService';
import { RoleApplicationService } from '../application/services/RoleApplicationService';
import { RoleReadService } from '../application/services/RoleReadService';
import { RoleWriteService } from '../application/services/RoleWriteService';
import { UserReadService } from '../application/services/UserReadService';
import { UserWriteService } from '../application/services/UserWriteService';

import { PasswordHasher } from '../infrastructure/services/PasswordHasher';
import { PasswordVerifier } from '../infrastructure/services/PasswordVerifier';
import { RefreshTokenGenerator } from '../infrastructure/services/RefreshTokenGenerator';
import { TokenGenerator } from '../infrastructure/services/TokenGenerator';
import { UserLookupService } from '../infrastructure/services/UserLookupService';
import { IdentityClock } from '../infrastructure/services/IdentityClock';
import { IdentityGuidProvider } from '../infrastructure/services/IdentityGuidProvider';

import { PermissionRepository } from '../infrastructure/repositories/PermissionRepository';
import { RefreshTokenRepository } from '../infrastructure/repositories/RefreshTokenRepository';
import { RoleRepository } from '../infrastructure/repositories/RoleRepository';
import { SessionRepository } from '../infrastructure/repositories/SessionRepository';
import { UserRepository } from '../infrastructure/repositories/UserRepository';

import { ActivateUserCommandHandler } from '../application/handlers/impl/ActivateUserCommandHandler';
import { AssignRoleCommandHandler } from '../application/handlers/impl/AssignRoleCommandHandler';
import { ChangeEmailCommandHandler } from '../application/handlers/impl/ChangeEmailCommandHandler';
import { ChangePasswordCommandHandler } from '../application/handlers/impl/ChangePasswordCommandHandler';
import { ChangeUsernameCommandHandler } from '../application/handlers/impl/ChangeUsernameCommandHandler';
import { CreatePermissionCommandHandler } from '../application/handlers/impl/CreatePermissionCommandHandler';
import { CreateRoleCommandHandler } from '../application/handlers/impl/CreateRoleCommandHandler';
import { CreateUserCommandHandler } from '../application/handlers/impl/CreateUserCommandHandler';
import { DeactivateUserCommandHandler } from '../application/handlers/impl/DeactivateUserCommandHandler';
import { DeletePermissionCommandHandler } from '../application/handlers/impl/DeletePermissionCommandHandler';
import { DeleteRoleCommandHandler } from '../application/handlers/impl/DeleteRoleCommandHandler';
import { DeleteUserCommandHandler } from '../application/handlers/impl/DeleteUserCommandHandler';
import { GrantPermissionCommandHandler } from '../application/handlers/impl/GrantPermissionCommandHandler';
import { LockUserCommandHandler } from '../application/handlers/impl/LockUserCommandHandler';
import { RemoveRoleCommandHandler } from '../application/handlers/impl/RemoveRoleCommandHandler';
import { ResetPasswordCommandHandler } from '../application/handlers/impl/ResetPasswordCommandHandler';
import { RevokePermissionCommandHandler } from '../application/handlers/impl/RevokePermissionCommandHandler';
import { UnlockUserCommandHandler } from '../application/handlers/impl/UnlockUserCommandHandler';
import { UpdatePermissionCommandHandler } from '../application/handlers/impl/UpdatePermissionCommandHandler';
import { UpdateRoleCommandHandler } from '../application/handlers/impl/UpdateRoleCommandHandler';
import { UpdateUserCommandHandler } from '../application/handlers/impl/UpdateUserCommandHandler';
import { GetPermissionByIdQueryHandler } from '../application/handlers/impl/GetPermissionByIdQueryHandler';
import { GetPermissionsQueryHandler } from '../application/handlers/impl/GetPermissionsQueryHandler';
import { GetRoleByIdQueryHandler } from '../application/handlers/impl/GetRoleByIdQueryHandler';
import { GetRolesQueryHandler } from '../application/handlers/impl/GetRolesQueryHandler';
import { GetUserByEmailQueryHandler } from '../application/handlers/impl/GetUserByEmailQueryHandler';
import { GetUserByIdQueryHandler } from '../application/handlers/impl/GetUserByIdQueryHandler';
import { GetUserByUsernameQueryHandler } from '../application/handlers/impl/GetUserByUsernameQueryHandler';
import { GetUsersQueryHandler } from '../application/handlers/impl/GetUsersQueryHandler';
import { SearchPermissionsQueryHandler } from '../application/handlers/impl/SearchPermissionsQueryHandler';
import { SearchRolesQueryHandler } from '../application/handlers/impl/SearchRolesQueryHandler';
import { SearchUsersQueryHandler } from '../application/handlers/impl/SearchUsersQueryHandler';

import { AuthenticationController } from '../presentation/controllers/AuthenticationController';
import { IdentityController } from '../presentation/controllers/IdentityController';
import { PermissionsController } from '../presentation/controllers/PermissionsController';
import { RolesController } from '../presentation/controllers/RolesController';
import { UsersController } from '../presentation/controllers/UsersController';

export class IdentityModuleBuilder {
  private options: IdentityModuleOptions = {};

  constructor(private readonly container: IContainer) {}

  public configure(options: IdentityModuleOptions): this {
    this.options = { ...this.options, ...options };
    return this;
  }

  public build(): void {
    this.registerOptions();
    this.registerInfrastructure();
    this.registerRepositories();
    this.registerApplicationServices();
    this.registerHandlers();
    this.registerControllers();
  }

  private registerOptions(): void {
    this.container.registerInstance(new Token('IdentityModuleOptions'), this.options);
  }

  private registerInfrastructure(): void {
    this.container.register(IdentityTokens.IPasswordHasher, () => new PasswordHasher(), Lifetime.Singleton);
    this.container.register(IdentityTokens.IPasswordVerifier, () => new PasswordVerifier(), Lifetime.Singleton);
    this.container.register(IdentityTokens.IRefreshTokenGenerator, () => new RefreshTokenGenerator(), Lifetime.Singleton);
    this.container.register(IdentityTokens.ITokenGenerator, () => new TokenGenerator(), Lifetime.Singleton);
    
    this.container.register(IdentityTokens.IUserLookupService, (c) => new UserLookupService(c.resolve(IdentityTokens.IUserRepository)), Lifetime.Singleton);
    
    this.container.register(IdentityTokens.IDomainClock, () => new IdentityClock(), Lifetime.Singleton);
    this.container.register(IdentityTokens.IGuidProvider, () => new IdentityGuidProvider(), Lifetime.Singleton);
  }

  private registerRepositories(): void {
    this.container.register(IdentityTokens.IPermissionRepository, () => new PermissionRepository(), Lifetime.Scoped);
    this.container.register(IdentityTokens.IRefreshTokenRepository, () => new RefreshTokenRepository(), Lifetime.Scoped);
    this.container.register(IdentityTokens.IRoleRepository, () => new RoleRepository(), Lifetime.Scoped);
    this.container.register(IdentityTokens.ISessionRepository, () => new SessionRepository(), Lifetime.Scoped);
    this.container.register(IdentityTokens.IUserRepository, () => new UserRepository(), Lifetime.Scoped);
  }

  private registerApplicationServices(): void {
    this.container.register(IdentityTokens.AuthenticationApplicationService, (c) => new AuthenticationApplicationService(c.resolve(CoreTokens.Mediator)), Lifetime.Scoped);
    this.container.register(IdentityTokens.IdentityApplicationService, (c) => new IdentityApplicationService(c.resolve(CoreTokens.Mediator)), Lifetime.Scoped);
    this.container.register(IdentityTokens.PermissionApplicationService, (c) => new PermissionApplicationService(c.resolve(CoreTokens.Mediator)), Lifetime.Scoped);
    this.container.register(IdentityTokens.PermissionReadService, (c) => new PermissionReadService(c.resolve(CoreTokens.Mediator)), Lifetime.Scoped);
    this.container.register(IdentityTokens.PermissionWriteService, (c) => new PermissionWriteService(c.resolve(CoreTokens.Mediator)), Lifetime.Scoped);
    this.container.register(IdentityTokens.RoleApplicationService, (c) => new RoleApplicationService(c.resolve(CoreTokens.Mediator)), Lifetime.Scoped);
    this.container.register(IdentityTokens.RoleReadService, (c) => new RoleReadService(c.resolve(CoreTokens.Mediator)), Lifetime.Scoped);
    this.container.register(IdentityTokens.RoleWriteService, (c) => new RoleWriteService(c.resolve(CoreTokens.Mediator)), Lifetime.Scoped);
    this.container.register(IdentityTokens.UserReadService, (c) => new UserReadService(c.resolve(CoreTokens.Mediator)), Lifetime.Scoped);
    this.container.register(IdentityTokens.UserWriteService, (c) => new UserWriteService(c.resolve(CoreTokens.Mediator)), Lifetime.Scoped);
  }

  private registerHandlers(): void {
    this.container.register(IdentityTokens.ActivateUserCommandHandler, () => new ActivateUserCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.AssignRoleCommandHandler, () => new AssignRoleCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.ChangeEmailCommandHandler, () => new ChangeEmailCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.ChangePasswordCommandHandler, () => new ChangePasswordCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.ChangeUsernameCommandHandler, () => new ChangeUsernameCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.CreatePermissionCommandHandler, () => new CreatePermissionCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.CreateRoleCommandHandler, () => new CreateRoleCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.CreateUserCommandHandler, () => new CreateUserCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.DeactivateUserCommandHandler, () => new DeactivateUserCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.DeletePermissionCommandHandler, () => new DeletePermissionCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.DeleteRoleCommandHandler, () => new DeleteRoleCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.DeleteUserCommandHandler, () => new DeleteUserCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.GrantPermissionCommandHandler, () => new GrantPermissionCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.LockUserCommandHandler, () => new LockUserCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.RemoveRoleCommandHandler, () => new RemoveRoleCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.ResetPasswordCommandHandler, () => new ResetPasswordCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.RevokePermissionCommandHandler, () => new RevokePermissionCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.UnlockUserCommandHandler, () => new UnlockUserCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.UpdatePermissionCommandHandler, () => new UpdatePermissionCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.UpdateRoleCommandHandler, () => new UpdateRoleCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.UpdateUserCommandHandler, () => new UpdateUserCommandHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.GetPermissionByIdQueryHandler, () => new GetPermissionByIdQueryHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.GetPermissionsQueryHandler, () => new GetPermissionsQueryHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.GetRoleByIdQueryHandler, () => new GetRoleByIdQueryHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.GetRolesQueryHandler, () => new GetRolesQueryHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.GetUserByEmailQueryHandler, () => new GetUserByEmailQueryHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.GetUserByIdQueryHandler, () => new GetUserByIdQueryHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.GetUserByUsernameQueryHandler, () => new GetUserByUsernameQueryHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.GetUsersQueryHandler, () => new GetUsersQueryHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.SearchPermissionsQueryHandler, () => new SearchPermissionsQueryHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.SearchRolesQueryHandler, () => new SearchRolesQueryHandler(), Lifetime.Scoped);
    this.container.register(IdentityTokens.SearchUsersQueryHandler, () => new SearchUsersQueryHandler(), Lifetime.Scoped);
  }

  private registerControllers(): void {
    this.container.register(IdentityTokens.AuthenticationController, (c) => new AuthenticationController(c.resolve(IdentityTokens.AuthenticationApplicationService)), Lifetime.Scoped);
    this.container.register(IdentityTokens.IdentityController, (c) => new IdentityController(c.resolve(IdentityTokens.IdentityApplicationService)), Lifetime.Scoped);
    this.container.register(IdentityTokens.PermissionsController, (c) => new PermissionsController(c.resolve(IdentityTokens.PermissionReadService) as any, c.resolve(IdentityTokens.PermissionWriteService) as any), Lifetime.Scoped);
    this.container.register(IdentityTokens.RolesController, (c) => new RolesController(c.resolve(IdentityTokens.RoleReadService) as any, c.resolve(IdentityTokens.RoleWriteService) as any), Lifetime.Scoped);
    this.container.register(IdentityTokens.UsersController, (c) => new UsersController(c.resolve(IdentityTokens.UserReadService) as any, c.resolve(IdentityTokens.UserWriteService) as any), Lifetime.Scoped);
  }
}

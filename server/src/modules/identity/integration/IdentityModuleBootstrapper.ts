import { HealthStatus } from '../../../core';
import { IContainer } from '../../../core';
import { IFeatureRegistry } from '../../../core';
import { IHealthRegistry } from '../../../core';
import { ICommandBus } from '../../../core';
import { IQueryBus } from '../../../core';
import { CoreTokens } from '../../../core';
import { IdentityTokens } from './IdentityTokens';
import { IdentityModule } from './IdentityModule';

export class IdentityModuleBootstrapper {
  public static bootstrap(container: IContainer): void {
    IdentityModule.register(container);

    const featureRegistry = container.resolve<IFeatureRegistry>(CoreTokens.FeatureRegistry);
    const healthRegistry = container.resolve<IHealthRegistry>(CoreTokens.HealthRegistry);
    const commandBus = container.resolve<ICommandBus>(CoreTokens.CommandBus);
    const queryBus = container.resolve<IQueryBus>(CoreTokens.QueryBus);

    featureRegistry.register('Identity.Registration', true);

    
    healthRegistry.registerLivenessCheck({
      name: 'IdentityModule',
      check: async () => ({
      name: 'IdentityModule',
      status: HealthStatus.Healthy,
      timestamp: new Date()
      })
    });

    this.registerMediatorHandlers(container, commandBus, queryBus);
  }

  private static registerMediatorHandlers(container: IContainer, commandBus: ICommandBus, queryBus: IQueryBus): void {
    // Commands
    commandBus.register('ActivateUserCommand', container.resolve(IdentityTokens.ActivateUserCommandHandler) as any);
    commandBus.register('AssignRoleCommand', container.resolve(IdentityTokens.AssignRoleCommandHandler) as any);
    commandBus.register('ChangeEmailCommand', container.resolve(IdentityTokens.ChangeEmailCommandHandler) as any);
    commandBus.register('ChangePasswordCommand', container.resolve(IdentityTokens.ChangePasswordCommandHandler) as any);
    commandBus.register('ChangeUsernameCommand', container.resolve(IdentityTokens.ChangeUsernameCommandHandler) as any);
    commandBus.register('CreatePermissionCommand', container.resolve(IdentityTokens.CreatePermissionCommandHandler) as any);
    commandBus.register('CreateRoleCommand', container.resolve(IdentityTokens.CreateRoleCommandHandler) as any);
    commandBus.register('CreateUserCommand', container.resolve(IdentityTokens.CreateUserCommandHandler) as any);
    commandBus.register('DeactivateUserCommand', container.resolve(IdentityTokens.DeactivateUserCommandHandler) as any);
    commandBus.register('DeletePermissionCommand', container.resolve(IdentityTokens.DeletePermissionCommandHandler) as any);
    commandBus.register('DeleteRoleCommand', container.resolve(IdentityTokens.DeleteRoleCommandHandler) as any);
    commandBus.register('DeleteUserCommand', container.resolve(IdentityTokens.DeleteUserCommandHandler) as any);
    commandBus.register('GrantPermissionCommand', container.resolve(IdentityTokens.GrantPermissionCommandHandler) as any);
    commandBus.register('LockUserCommand', container.resolve(IdentityTokens.LockUserCommandHandler) as any);
    commandBus.register('RemoveRoleCommand', container.resolve(IdentityTokens.RemoveRoleCommandHandler) as any);
    commandBus.register('ResetPasswordCommand', container.resolve(IdentityTokens.ResetPasswordCommandHandler) as any);
    commandBus.register('RevokePermissionCommand', container.resolve(IdentityTokens.RevokePermissionCommandHandler) as any);
    commandBus.register('UnlockUserCommand', container.resolve(IdentityTokens.UnlockUserCommandHandler) as any);
    commandBus.register('UpdatePermissionCommand', container.resolve(IdentityTokens.UpdatePermissionCommandHandler) as any);
    commandBus.register('UpdateRoleCommand', container.resolve(IdentityTokens.UpdateRoleCommandHandler) as any);
    commandBus.register('UpdateUserCommand', container.resolve(IdentityTokens.UpdateUserCommandHandler) as any);

    // Queries
    queryBus.register('GetPermissionByIdQuery', container.resolve(IdentityTokens.GetPermissionByIdQueryHandler) as any);
    queryBus.register('GetPermissionsQuery', container.resolve(IdentityTokens.GetPermissionsQueryHandler) as any);
    queryBus.register('GetRoleByIdQuery', container.resolve(IdentityTokens.GetRoleByIdQueryHandler) as any);
    queryBus.register('GetRolesQuery', container.resolve(IdentityTokens.GetRolesQueryHandler) as any);
    queryBus.register('GetUserByEmailQuery', container.resolve(IdentityTokens.GetUserByEmailQueryHandler) as any);
    queryBus.register('GetUserByIdQuery', container.resolve(IdentityTokens.GetUserByIdQueryHandler) as any);
    queryBus.register('GetUserByUsernameQuery', container.resolve(IdentityTokens.GetUserByUsernameQueryHandler) as any);
    queryBus.register('GetUsersQuery', container.resolve(IdentityTokens.GetUsersQueryHandler) as any);
    queryBus.register('SearchPermissionsQuery', container.resolve(IdentityTokens.SearchPermissionsQueryHandler) as any);
    queryBus.register('SearchRolesQuery', container.resolve(IdentityTokens.SearchRolesQueryHandler) as any);
    queryBus.register('SearchUsersQuery', container.resolve(IdentityTokens.SearchUsersQueryHandler) as any);
  }
}

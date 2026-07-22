const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'server/src/modules/identity/application/handlers');

const commands = [
  { name: 'CreateUserCommand', result: 'Result<string>' },
  { name: 'UpdateUserCommand', result: 'Result<void>' },
  { name: 'DeleteUserCommand', result: 'Result<void>' },
  { name: 'ActivateUserCommand', result: 'Result<void>' },
  { name: 'DeactivateUserCommand', result: 'Result<void>' },
  { name: 'LockUserCommand', result: 'Result<void>' },
  { name: 'UnlockUserCommand', result: 'Result<void>' },
  { name: 'ChangePasswordCommand', result: 'Result<void>' },
  { name: 'ResetPasswordCommand', result: 'Result<void>' },
  { name: 'ChangeEmailCommand', result: 'Result<void>' },
  { name: 'ChangeUsernameCommand', result: 'Result<void>' },
  { name: 'AssignRoleCommand', result: 'Result<void>' },
  { name: 'RemoveRoleCommand', result: 'Result<void>' },
  { name: 'GrantPermissionCommand', result: 'Result<void>' },
  { name: 'RevokePermissionCommand', result: 'Result<void>' },
  { name: 'CreateRoleCommand', result: 'Result<string>' },
  { name: 'UpdateRoleCommand', result: 'Result<void>' },
  { name: 'DeleteRoleCommand', result: 'Result<void>' },
  { name: 'CreatePermissionCommand', result: 'Result<string>' },
  { name: 'UpdatePermissionCommand', result: 'Result<void>' },
  { name: 'DeletePermissionCommand', result: 'Result<void>' },
];

const queries = [
  { name: 'GetUserByIdQuery', result: 'Result<UserDto>' },
  { name: 'GetUserByUsernameQuery', result: 'Result<UserDto>' },
  { name: 'GetUserByEmailQuery', result: 'Result<UserDto>' },
  { name: 'GetUsersQuery', result: 'Result<PagedUserDto>' },
  { name: 'GetRolesQuery', result: 'Result<PagedRoleDto>' },
  { name: 'GetPermissionsQuery', result: 'Result<PagedPermissionDto>' },
  { name: 'GetRoleByIdQuery', result: 'Result<RoleDto>' },
  { name: 'GetPermissionByIdQuery', result: 'Result<PermissionDto>' },
  { name: 'SearchUsersQuery', result: 'Result<PagedUserDto>' },
  { name: 'SearchRolesQuery', result: 'Result<PagedRoleDto>' },
  { name: 'SearchPermissionsQuery', result: 'Result<PagedPermissionDto>' },
];

// Combine all handlers
const commandHandlers = commands.map(c => ({
  handlerName: `I${c.name}Handler`,
  commandName: c.name,
  resultType: c.result,
  isCommand: true
}));

const queryHandlers = queries.map(q => ({
  handlerName: `I${q.name}Handler`,
  commandName: q.name,
  resultType: q.result,
  isCommand: false
}));

const allHandlers = [...commandHandlers, ...queryHandlers];

allHandlers.forEach(h => {
  let content = `
import { Result } from '../../../../core/results/Result';
${h.isCommand ? `import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';` : `import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';`}
${h.isCommand ? `import { ${h.commandName} } from '../commands/${h.commandName}';` : `import { ${h.commandName} } from '../queries/${h.commandName}';`}
${!h.isCommand && h.resultType.includes('Dto') ? `import { ${h.resultType.replace('Result<', '').replace('>', '')} } from '../dto/${h.resultType.replace('Result<', '').replace('>', '')}';` : ''}

export interface ${h.handlerName} extends ${h.isCommand ? 'ICommandHandler' : 'IQueryHandler'}<${h.commandName}, ${h.resultType}> {
}
`;
  fs.writeFileSync(path.join(baseDir, h.handlerName + '.ts'), content.trim() + '\n');
});

fs.writeFileSync(path.join(baseDir, 'index.ts'), allHandlers.map(h => `export * from './${h.handlerName}';`).join('\n') + '\n');


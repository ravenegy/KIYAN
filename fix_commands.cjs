const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'server/src/modules/identity/application/commands');

const commands = [
  { name: 'CreateUserCommand', result: 'string', payloadType: 'CreateUserRequest', importDto: 'CreateUserRequest' },
  { name: 'UpdateUserCommand', result: 'void', payloadType: 'UpdateUserRequest', importDto: 'UpdateUserRequest' },
  { name: 'DeleteUserCommand', result: 'void', payloadType: '{ id: string }' },
  { name: 'ActivateUserCommand', result: 'void', payloadType: '{ id: string }' },
  { name: 'DeactivateUserCommand', result: 'void', payloadType: '{ id: string }' },
  { name: 'LockUserCommand', result: 'void', payloadType: '{ id: string; until?: Date }' },
  { name: 'UnlockUserCommand', result: 'void', payloadType: '{ id: string }' },
  { name: 'ChangePasswordCommand', result: 'void', payloadType: '{ id: string; newPasswordHash: string }' },
  { name: 'ResetPasswordCommand', result: 'void', payloadType: '{ email: string }' },
  { name: 'ChangeEmailCommand', result: 'void', payloadType: '{ id: string; newEmail: string }' },
  { name: 'ChangeUsernameCommand', result: 'void', payloadType: '{ id: string; newUsername: string }' },
  { name: 'AssignRoleCommand', result: 'void', payloadType: 'AssignRoleRequest', importDto: 'AssignRoleRequest' },
  { name: 'RemoveRoleCommand', result: 'void', payloadType: '{ userId: string; roleId: string }' },
  { name: 'GrantPermissionCommand', result: 'void', payloadType: 'GrantPermissionRequest', importDto: 'GrantPermissionRequest' },
  { name: 'RevokePermissionCommand', result: 'void', payloadType: '{ userId?: string; roleId?: string; permissionId: string }' },
  { name: 'CreateRoleCommand', result: 'string', payloadType: '{ name: string; description: string }' },
  { name: 'UpdateRoleCommand', result: 'void', payloadType: '{ id: string; name?: string; description?: string }' },
  { name: 'DeleteRoleCommand', result: 'void', payloadType: '{ id: string }' },
  { name: 'CreatePermissionCommand', result: 'string', payloadType: '{ name: string; code: string; description: string; effect: string }' },
  { name: 'UpdatePermissionCommand', result: 'void', payloadType: '{ id: string; name?: string; description?: string; effect?: string }' },
  { name: 'DeletePermissionCommand', result: 'void', payloadType: '{ id: string }' },
];

commands.forEach(c => {
  let content = `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core/results/Result';
${c.importDto ? `import { ${c.importDto} } from '../dto/${c.importDto}';` : ''}

export class ${c.name} implements ICommand<Result<${c.result}>> {
  public readonly id: string;
  public readonly type: string = '${c.name}';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<${c.result}>;

  constructor(public readonly payload: Readonly<${c.payloadType}>) {
    this.id = crypto.randomUUID();
  }
}
`;
  fs.writeFileSync(path.join(baseDir, c.name + '.ts'), content.trim() + '\n');
});


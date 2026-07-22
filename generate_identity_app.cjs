const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'server/src/modules/identity/application');
const dirs = [
  'commands',
  'queries',
  'dto',
  'contracts',
  'handlers',
  'mappers',
  'validators',
  'services',
  'interfaces',
  'exceptions'
];

dirs.forEach(dir => fs.mkdirSync(path.join(baseDir, dir), { recursive: true }));

function write(filePath, content) {
  fs.writeFileSync(path.join(baseDir, filePath), content.trim() + '\n');
}

// 1. DTOs
write('dto/UserDto.ts', `
export interface UserDto {
  id: string;
  username: string;
  email: string;
  status: string;
  roles: string[];
  permissions: string[];
  lastLoginAt?: Date;
  createdAt: Date;
}
`);
write('dto/RoleDto.ts', `
export interface RoleDto {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}
`);
write('dto/PermissionDto.ts', `
export interface PermissionDto {
  id: string;
  name: string;
  code: string;
  description: string;
  effect: string;
}
`);
write('dto/ClaimDto.ts', `
export interface ClaimDto {
  type: string;
  value: string;
  issuer: string;
}
`);
write('dto/SessionDto.ts', `
export interface SessionDto {
  id: string;
  userId: string;
  expiresAt: Date;
  status: string;
}
`);
write('dto/RefreshTokenDto.ts', `
export interface RefreshTokenDto {
  id: string;
  userId: string;
  expiresAt: Date;
  isExpired: boolean;
}
`);
write('dto/PagedUserDto.ts', `
import { UserDto } from './UserDto';
export interface PagedUserDto {
  items: UserDto[];
  totalCount: number;
  page: number;
  pageSize: number;
}
`);
write('dto/PagedRoleDto.ts', `
import { RoleDto } from './RoleDto';
export interface PagedRoleDto {
  items: RoleDto[];
  totalCount: number;
  page: number;
  pageSize: number;
}
`);
write('dto/PagedPermissionDto.ts', `
import { PermissionDto } from './PermissionDto';
export interface PagedPermissionDto {
  items: PermissionDto[];
  totalCount: number;
  page: number;
  pageSize: number;
}
`);
write('dto/CreateUserRequest.ts', `
export interface CreateUserRequest {
  username: string;
  email: string;
  password?: string;
}
`);
write('dto/UpdateUserRequest.ts', `
export interface UpdateUserRequest {
  id: string;
  email?: string;
  status?: string;
}
`);
write('dto/AssignRoleRequest.ts', `
export interface AssignRoleRequest {
  userId: string;
  roleId: string;
}
`);
write('dto/GrantPermissionRequest.ts', `
export interface GrantPermissionRequest {
  userId?: string;
  roleId?: string;
  permissionId: string;
}
`);
write('dto/index.ts', `
export * from './UserDto';
export * from './RoleDto';
export * from './PermissionDto';
export * from './ClaimDto';
export * from './SessionDto';
export * from './RefreshTokenDto';
export * from './PagedUserDto';
export * from './PagedRoleDto';
export * from './PagedPermissionDto';
export * from './CreateUserRequest';
export * from './UpdateUserRequest';
export * from './AssignRoleRequest';
export * from './GrantPermissionRequest';
`);

// 2. Commands
const commands = [
  { name: 'CreateUserCommand', result: 'string' },
  { name: 'UpdateUserCommand', result: 'void' },
  { name: 'DeleteUserCommand', result: 'void' },
  { name: 'ActivateUserCommand', result: 'void' },
  { name: 'DeactivateUserCommand', result: 'void' },
  { name: 'LockUserCommand', result: 'void' },
  { name: 'UnlockUserCommand', result: 'void' },
  { name: 'ChangePasswordCommand', result: 'void' },
  { name: 'ResetPasswordCommand', result: 'void' },
  { name: 'ChangeEmailCommand', result: 'void' },
  { name: 'ChangeUsernameCommand', result: 'void' },
  { name: 'AssignRoleCommand', result: 'void' },
  { name: 'RemoveRoleCommand', result: 'void' },
  { name: 'GrantPermissionCommand', result: 'void' },
  { name: 'RevokePermissionCommand', result: 'void' },
  { name: 'CreateRoleCommand', result: 'string' },
  { name: 'UpdateRoleCommand', result: 'void' },
  { name: 'DeleteRoleCommand', result: 'void' },
  { name: 'CreatePermissionCommand', result: 'string' },
  { name: 'UpdatePermissionCommand', result: 'void' },
  { name: 'DeletePermissionCommand', result: 'void' },
];

commands.forEach(c => {
  write(`commands/${c.name}.ts`, `
import { ICommand } from '../../../../core/mediator/commands/ICommand';
import { Result } from '../../../../core/results/Result';

export class ${c.name} implements ICommand<Result<${c.result}>> {
  public readonly id: string;
  public readonly type: string = '${c.name}';
  public readonly timestamp: Date = new Date();
  public readonly _resultType?: Result<${c.result}>;

  constructor(public readonly payload: Readonly<Record<string, any>>) {
    this.id = crypto.randomUUID();
  }
}
`);
});
write('commands/index.ts', commands.map(c => `export * from './${c.name}';`).join('\n'));

// 3. Queries
const queries = [
  { name: 'GetUserByIdQuery', result: 'UserDto' },
  { name: 'GetUserByUsernameQuery', result: 'UserDto' },
  { name: 'GetUserByEmailQuery', result: 'UserDto' },
  { name: 'GetUsersQuery', result: 'PagedUserDto' },
  { name: 'GetRolesQuery', result: 'PagedRoleDto' },
  { name: 'GetPermissionsQuery', result: 'PagedPermissionDto' },
  { name: 'GetRoleByIdQuery', result: 'RoleDto' },
  { name: 'GetPermissionByIdQuery', result: 'PermissionDto' },
  { name: 'SearchUsersQuery', result: 'PagedUserDto' },
  { name: 'SearchRolesQuery', result: 'PagedRoleDto' },
  { name: 'SearchPermissionsQuery', result: 'PagedPermissionDto' },
];

queries.forEach(q => {
  write(`queries/${q.name}.ts`, `
import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { ${q.result.replace('Paged', '')} } from '../dto/${q.result.replace('Paged', '')}';
${q.result.startsWith('Paged') ? `import { ${q.result} } from '../dto/${q.result}';` : ''}

export class ${q.name} implements IQuery<Result<${q.result}>> {
  public readonly type: string = '${q.name}';
  public readonly _resultType?: Result<${q.result}>;

  constructor(public readonly params: Readonly<Record<string, any>>) {}
}
`);
});
write('queries/index.ts', queries.map(q => `export * from './${q.name}';`).join('\n'));

// 4. Exceptions
write('exceptions/IdentityApplicationException.ts', `
import { ApplicationException } from '../../../../core/application/exceptions/ApplicationException';

export class IdentityApplicationException extends ApplicationException {
  constructor(message: string, code?: string, metadata?: Record<string, unknown>) {
    super(message, code, metadata);
    this.name = 'IdentityApplicationException';
  }
}
`);
const exceptions = ['UserNotFoundException', 'UserAlreadyExistsException', 'InvalidCredentialsException'];
exceptions.forEach(e => {
  write(`exceptions/${e}.ts`, `
import { IdentityApplicationException } from './IdentityApplicationException';

export class ${e} extends IdentityApplicationException {
  constructor(message: string, metadata?: Record<string, unknown>) {
    super(message, '${e.replace(/Exception$/, '').toUpperCase()}', metadata);
    this.name = '${e}';
  }
}
`);
});
write('exceptions/index.ts', `export * from './IdentityApplicationException';\n` + exceptions.map(e => `export * from './${e}';`).join('\n'));

// 5. Contracts & Interfaces (Services)
const serviceInterfaces = [
  'IIdentityApplicationService',
  'IAuthenticationApplicationService',
  'IRoleApplicationService',
  'IPermissionApplicationService',
  'IUserReadService',
  'IUserWriteService',
  'IRoleReadService',
  'IRoleWriteService',
  'IPermissionReadService',
  'IPermissionWriteService'
];

serviceInterfaces.forEach(si => {
  write(`interfaces/${si}.ts`, `
export interface ${si} {
  // Service contract definitions
}
`);
});
write('interfaces/index.ts', serviceInterfaces.map(si => `export * from './${si}';`).join('\n'));
write('contracts/index.ts', `export * from '../interfaces';`); // alias or placeholder
write('services/index.ts', `export * from '../interfaces';`); // alias

// 6. Mappers
const mappers = ['IUserMapper', 'IRoleMapper', 'IPermissionMapper'];
mappers.forEach(m => {
  write(`mappers/${m}.ts`, `
export interface ${m} {
  toDto(domainEntity: any): any;
  toDomain(dto: any): any;
}
`);
});
write('mappers/index.ts', mappers.map(m => `export * from './${m}';`).join('\n'));

// 7. Validators
const validators = ['ICreateUserValidator', 'IUpdateUserValidator', 'IAssignRoleValidator', 'IGrantPermissionValidator'];
validators.forEach(v => {
  write(`validators/${v}.ts`, `
import { Result } from '../../../../core/results/Result';

export interface ${v} {
  validate(request: any): Result<void>;
}
`);
});
write('validators/index.ts', validators.map(v => `export * from './${v}';`).join('\n'));

// 8. Handlers
const handlers = [
  'ICreateUserHandler',
  'IUpdateUserHandler',
  'IGetUserHandler'
];
handlers.forEach(h => {
  write(`handlers/${h}.ts`, `
export interface ${h} {
  handle(request: any): Promise<any>;
}
`);
});
write('handlers/index.ts', handlers.map(h => `export * from './${h}';`).join('\n'));

// Index
write('index.ts', `
export * from './commands';
export * from './queries';
export * from './dto';
export * from './handlers';
export * from './mappers';
export * from './validators';
export * from './interfaces';
export * from './exceptions';
`);


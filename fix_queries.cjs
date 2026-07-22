const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'server/src/modules/identity/application/queries');

const queries = [
  { name: 'GetUserByIdQuery', result: 'UserDto', payloadType: '{ id: string }' },
  { name: 'GetUserByUsernameQuery', result: 'UserDto', payloadType: '{ username: string }' },
  { name: 'GetUserByEmailQuery', result: 'UserDto', payloadType: '{ email: string }' },
  { name: 'GetUsersQuery', result: 'PagedUserDto', payloadType: '{ page: number; pageSize: number; search?: string }' },
  { name: 'GetRolesQuery', result: 'PagedRoleDto', payloadType: '{ page: number; pageSize: number }' },
  { name: 'GetPermissionsQuery', result: 'PagedPermissionDto', payloadType: '{ page: number; pageSize: number }' },
  { name: 'GetRoleByIdQuery', result: 'RoleDto', payloadType: '{ id: string }' },
  { name: 'GetPermissionByIdQuery', result: 'PermissionDto', payloadType: '{ id: string }' },
  { name: 'SearchUsersQuery', result: 'PagedUserDto', payloadType: '{ query: string; page: number; pageSize: number }' },
  { name: 'SearchRolesQuery', result: 'PagedRoleDto', payloadType: '{ query: string; page: number; pageSize: number }' },
  { name: 'SearchPermissionsQuery', result: 'PagedPermissionDto', payloadType: '{ query: string; page: number; pageSize: number }' },
];

queries.forEach(q => {
  let content = `
import { IQuery } from '../../../../core/mediator/queries/IQuery';
import { Result } from '../../../../core/results/Result';
import { ${q.result.replace('Paged', '')} } from '../dto/${q.result.replace('Paged', '')}';
${q.result.startsWith('Paged') ? `import { ${q.result} } from '../dto/${q.result}';` : ''}

export class ${q.name} implements IQuery<Result<${q.result}>> {
  public readonly type: string = '${q.name}';
  public readonly _resultType?: Result<${q.result}>;

  constructor(public readonly params: Readonly<${q.payloadType}>) {}
}
`;
  fs.writeFileSync(path.join(baseDir, q.name + '.ts'), content.trim() + '\n');
});


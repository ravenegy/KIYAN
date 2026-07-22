import { IQuery } from '../../../../core';
import { Result } from '../../../../core';
import { PermissionDto } from '../dto';
import { PagedPermissionDto } from '../dto';

export class GetPermissionsQuery implements IQuery<Result<PagedPermissionDto>> {
  public readonly type: string = 'GetPermissionsQuery';
  public readonly _resultType?: Result<PagedPermissionDto>;

  constructor(public readonly params: Readonly<{ page: number; pageSize: number }>) {}
}

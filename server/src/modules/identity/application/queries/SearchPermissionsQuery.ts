import { IQuery } from '../../../../core';
import { Result } from '../../../../core';
import { PermissionDto } from '../dto';
import { PagedPermissionDto } from '../dto';

export class SearchPermissionsQuery implements IQuery<Result<PagedPermissionDto>> {
  public readonly type: string = 'SearchPermissionsQuery';
  public readonly _resultType?: Result<PagedPermissionDto>;

  constructor(public readonly params: Readonly<{ query: string; page: number; pageSize: number }>) {}
}

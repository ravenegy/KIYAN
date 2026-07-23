import { Result, IMediator } from '../../../../core';
import { IPermissionReadService } from '../interfaces';
import { GetPermissionByIdQuery, GetPermissionsQuery, SearchPermissionsQuery } from '../queries';
import { PermissionDto, PagedPermissionDto } from '../dto';

export class PermissionReadService implements IPermissionReadService {
  constructor(private readonly mediator: IMediator) {}

  public async getPermissionById(id: string): Promise<Result<PermissionDto>> {
    return this.mediator.query(new GetPermissionByIdQuery({ id }));
  }
  public async getPermissions(params: Readonly<{ page: number; pageSize: number }>): Promise<Result<PagedPermissionDto>> {
    return this.mediator.query(new GetPermissionsQuery(params));
  }
  public async searchPermissions(params: Readonly<{ query: string; page: number; pageSize: number }>): Promise<Result<PagedPermissionDto>> {
    return this.mediator.query(new SearchPermissionsQuery(params));
  }
}

import { Result, IMediator } from '../../../../core';
import { IRoleReadService } from '../interfaces';
import { GetRoleByIdQuery, GetRolesQuery, SearchRolesQuery } from '../queries';
import { RoleDto, PagedRoleDto } from '../dto';

export class RoleReadService implements IRoleReadService {
  constructor(private readonly mediator: IMediator) {}

  public async getRoleById(id: string): Promise<Result<RoleDto>> {
    return this.mediator.query(new GetRoleByIdQuery({ id }));
  }
  public async getRoles(params: Readonly<{ page: number; pageSize: number }>): Promise<Result<PagedRoleDto>> {
    return this.mediator.query(new GetRolesQuery(params));
  }
  public async searchRoles(params: Readonly<{ query: string; page: number; pageSize: number }>): Promise<Result<PagedRoleDto>> {
    return this.mediator.query(new SearchRolesQuery(params));
  }
}

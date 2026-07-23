import { Result, IQueryHandler } from '../../../../core';
import { GetRolesQuery } from '../queries';
import { PagedRoleDto } from '../dto';

export interface IGetRolesQueryHandler extends IQueryHandler<GetRolesQuery, Result<PagedRoleDto>> {
}

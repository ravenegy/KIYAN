import { Result, IQueryHandler } from '../../../../core';
import { SearchRolesQuery } from '../queries';
import { PagedRoleDto } from '../dto';

export interface ISearchRolesQueryHandler extends IQueryHandler<SearchRolesQuery, Result<PagedRoleDto>> {
}

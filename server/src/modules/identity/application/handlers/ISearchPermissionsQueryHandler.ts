import { Result, IQueryHandler } from '../../../../core';
import { SearchPermissionsQuery } from '../queries';
import { PagedPermissionDto } from '../dto';

export interface ISearchPermissionsQueryHandler extends IQueryHandler<SearchPermissionsQuery, Result<PagedPermissionDto>> {
}

import { Result, IQueryHandler } from '../../../../core';
import { GetPermissionsQuery } from '../queries';
import { PagedPermissionDto } from '../dto';

export interface IGetPermissionsQueryHandler extends IQueryHandler<GetPermissionsQuery, Result<PagedPermissionDto>> {
}

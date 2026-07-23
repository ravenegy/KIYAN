import { Result } from '../../../../core/results/Result';
import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetPermissionGroupsQuery } from '../queries/GetPermissionGroupsQuery';
import { PagedPermissionGroupDto } from '../dto/PagedPermissionGroupDto';

export interface IGetPermissionGroupsQueryHandler extends IQueryHandler<GetPermissionGroupsQuery, Result<PagedPermissionGroupDto>> {}

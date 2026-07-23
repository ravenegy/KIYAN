import { Result } from '../../../../core/results/Result';
import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetPermissionAssignmentsQuery } from '../queries/GetPermissionAssignmentsQuery';
import { PagedPermissionAssignmentDto } from '../dto/PagedPermissionAssignmentDto';

export interface IGetPermissionAssignmentsQueryHandler extends IQueryHandler<GetPermissionAssignmentsQuery, Result<PagedPermissionAssignmentDto>> {}

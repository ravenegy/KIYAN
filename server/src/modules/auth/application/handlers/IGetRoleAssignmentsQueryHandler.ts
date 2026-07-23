import { Result } from '../../../../core/results/Result';
import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetRoleAssignmentsQuery } from '../queries/GetRoleAssignmentsQuery';
import { PagedRoleAssignmentDto } from '../dto/PagedRoleAssignmentDto';

export interface IGetRoleAssignmentsQueryHandler extends IQueryHandler<GetRoleAssignmentsQuery, Result<PagedRoleAssignmentDto>> {}

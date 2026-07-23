import { Result } from '../../../../core/results/Result';
import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetRoleHierarchyQuery } from '../queries/GetRoleHierarchyQuery';
import { RoleHierarchyDto } from '../dto/RoleHierarchyDto';

export interface IGetRoleHierarchyQueryHandler extends IQueryHandler<GetRoleHierarchyQuery, Result<RoleHierarchyDto[]>> {}

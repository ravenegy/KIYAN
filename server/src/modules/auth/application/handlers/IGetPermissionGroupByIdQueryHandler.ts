import { Result } from '../../../../core/results/Result';
import { IQueryHandler } from '../../../../core/mediator/queries/IQueryHandler';
import { GetPermissionGroupByIdQuery } from '../queries/GetPermissionGroupByIdQuery';
import { PermissionGroupDto } from '../dto/PermissionGroupDto';

export interface IGetPermissionGroupByIdQueryHandler extends IQueryHandler<GetPermissionGroupByIdQuery, Result<PermissionGroupDto>> {}

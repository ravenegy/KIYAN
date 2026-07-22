import { Result, IQueryHandler } from '../../../../core';
import { GetPermissionByIdQuery } from '../queries';
import { PermissionDto } from '../dto';

export interface IGetPermissionByIdQueryHandler extends IQueryHandler<GetPermissionByIdQuery, Result<PermissionDto>> {
}

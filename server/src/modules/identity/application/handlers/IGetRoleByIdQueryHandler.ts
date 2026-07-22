import { Result, IQueryHandler } from '../../../../core';
import { GetRoleByIdQuery } from '../queries';
import { RoleDto } from '../dto';

export interface IGetRoleByIdQueryHandler extends IQueryHandler<GetRoleByIdQuery, Result<RoleDto>> {
}

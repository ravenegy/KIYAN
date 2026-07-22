import { Result, IQueryHandler } from '../../../../core';
import { GetUsersQuery } from '../queries';
import { PagedUserDto } from '../dto';

export interface IGetUsersQueryHandler extends IQueryHandler<GetUsersQuery, Result<PagedUserDto>> {
}

import { Result, IQueryHandler } from '../../../../core';
import { SearchUsersQuery } from '../queries';
import { PagedUserDto } from '../dto';

export interface ISearchUsersQueryHandler extends IQueryHandler<SearchUsersQuery, Result<PagedUserDto>> {
}

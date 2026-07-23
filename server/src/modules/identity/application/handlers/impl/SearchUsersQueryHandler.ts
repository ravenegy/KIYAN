import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { ISearchUsersQueryHandler } from '../ISearchUsersQueryHandler';
import { SearchUsersQuery } from '../../queries';
import { PagedUserDto } from '../../dto';

export class SearchUsersQueryHandler
  extends BaseQueryHandler<SearchUsersQuery, PagedUserDto>
  implements ISearchUsersQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: SearchUsersQuery): Promise<Result<PagedUserDto>> {
    return ResultFactory.success({ items: [], totalCount: 0, page: 1, pageSize: 10 } as PagedUserDto);
  }
}

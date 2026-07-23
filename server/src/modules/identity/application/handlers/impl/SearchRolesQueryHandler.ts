import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { ISearchRolesQueryHandler } from '../ISearchRolesQueryHandler';
import { SearchRolesQuery } from '../../queries';
import { PagedRoleDto } from '../../dto';

export class SearchRolesQueryHandler
  extends BaseQueryHandler<SearchRolesQuery, PagedRoleDto>
  implements ISearchRolesQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: SearchRolesQuery): Promise<Result<PagedRoleDto>> {
    return ResultFactory.success({ items: [], totalCount: 0, page: 1, pageSize: 10 } as PagedRoleDto);
  }
}

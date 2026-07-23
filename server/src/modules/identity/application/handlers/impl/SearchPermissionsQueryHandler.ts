import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { ISearchPermissionsQueryHandler } from '../ISearchPermissionsQueryHandler';
import { SearchPermissionsQuery } from '../../queries';
import { PagedPermissionDto } from '../../dto';

export class SearchPermissionsQueryHandler
  extends BaseQueryHandler<SearchPermissionsQuery, PagedPermissionDto>
  implements ISearchPermissionsQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: SearchPermissionsQuery): Promise<Result<PagedPermissionDto>> {
    return ResultFactory.success({ items: [], totalCount: 0, page: 1, pageSize: 10 } as PagedPermissionDto);
  }
}

import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetPermissionsQueryHandler } from '../IGetPermissionsQueryHandler';
import { GetPermissionsQuery } from '../../queries';
import { PagedPermissionDto } from '../../dto';

export class GetPermissionsQueryHandler
  extends BaseQueryHandler<GetPermissionsQuery, PagedPermissionDto>
  implements IGetPermissionsQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetPermissionsQuery): Promise<Result<PagedPermissionDto>> {
    return ResultFactory.success({ items: [], totalCount: 0, page: 1, pageSize: 10 } as PagedPermissionDto);
  }
}

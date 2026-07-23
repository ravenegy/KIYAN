import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetPermissionGroupsQueryHandler } from '../IGetPermissionGroupsQueryHandler';
import { GetPermissionGroupsQuery } from '../../queries';
import { PagedPermissionGroupDto } from '../../dto';

export class GetPermissionGroupsQueryHandler
  extends BaseQueryHandler<GetPermissionGroupsQuery, PagedPermissionGroupDto>
  implements IGetPermissionGroupsQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetPermissionGroupsQuery): Promise<Result<PagedPermissionGroupDto>> {
    return ResultFactory.success({} as PagedPermissionGroupDto);
  }
}

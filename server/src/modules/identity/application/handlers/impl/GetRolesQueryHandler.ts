import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetRolesQueryHandler } from '../IGetRolesQueryHandler';
import { GetRolesQuery } from '../../queries';
import { PagedRoleDto } from '../../dto';

export class GetRolesQueryHandler
  extends BaseQueryHandler<GetRolesQuery, PagedRoleDto>
  implements IGetRolesQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetRolesQuery): Promise<Result<PagedRoleDto>> {
    return ResultFactory.success({ items: [], totalCount: 0, page: 1, pageSize: 10 } as PagedRoleDto);
  }
}

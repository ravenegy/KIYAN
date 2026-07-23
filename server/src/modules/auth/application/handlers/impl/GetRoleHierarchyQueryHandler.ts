import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetRoleHierarchyQueryHandler } from '../IGetRoleHierarchyQueryHandler';
import { GetRoleHierarchyQuery } from '../../queries';
import { RoleHierarchyDto } from '../../dto';

export class GetRoleHierarchyQueryHandler
  extends BaseQueryHandler<GetRoleHierarchyQuery, RoleHierarchyDto[]>
  implements IGetRoleHierarchyQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetRoleHierarchyQuery): Promise<Result<RoleHierarchyDto[]>> {
    return ResultFactory.success({} as RoleHierarchyDto[]);
  }
}

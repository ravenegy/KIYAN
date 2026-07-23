import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetPermissionAssignmentsQueryHandler } from '../IGetPermissionAssignmentsQueryHandler';
import { GetPermissionAssignmentsQuery } from '../../queries';
import { PagedPermissionAssignmentDto } from '../../dto';

export class GetPermissionAssignmentsQueryHandler
  extends BaseQueryHandler<GetPermissionAssignmentsQuery, PagedPermissionAssignmentDto>
  implements IGetPermissionAssignmentsQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetPermissionAssignmentsQuery): Promise<Result<PagedPermissionAssignmentDto>> {
    return ResultFactory.success({} as PagedPermissionAssignmentDto);
  }
}

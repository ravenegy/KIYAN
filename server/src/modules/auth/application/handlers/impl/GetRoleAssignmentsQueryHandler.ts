import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetRoleAssignmentsQueryHandler } from '../IGetRoleAssignmentsQueryHandler';
import { GetRoleAssignmentsQuery } from '../../queries';
import { PagedRoleAssignmentDto } from '../../dto';

export class GetRoleAssignmentsQueryHandler
  extends BaseQueryHandler<GetRoleAssignmentsQuery, PagedRoleAssignmentDto>
  implements IGetRoleAssignmentsQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetRoleAssignmentsQuery): Promise<Result<PagedRoleAssignmentDto>> {
    return ResultFactory.success({} as PagedRoleAssignmentDto);
  }
}

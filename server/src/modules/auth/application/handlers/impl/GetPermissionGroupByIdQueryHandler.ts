import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetPermissionGroupByIdQueryHandler } from '../IGetPermissionGroupByIdQueryHandler';
import { GetPermissionGroupByIdQuery } from '../../queries';
import { PermissionGroupDto } from '../../dto';

export class GetPermissionGroupByIdQueryHandler
  extends BaseQueryHandler<GetPermissionGroupByIdQuery, PermissionGroupDto>
  implements IGetPermissionGroupByIdQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetPermissionGroupByIdQuery): Promise<Result<PermissionGroupDto>> {
    return ResultFactory.success({} as PermissionGroupDto);
  }
}

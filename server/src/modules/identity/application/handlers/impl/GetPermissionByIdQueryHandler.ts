import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetPermissionByIdQueryHandler } from '../IGetPermissionByIdQueryHandler';
import { GetPermissionByIdQuery } from '../../queries';
import { PermissionDto } from '../../dto';

export class GetPermissionByIdQueryHandler
  extends BaseQueryHandler<GetPermissionByIdQuery, PermissionDto>
  implements IGetPermissionByIdQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetPermissionByIdQuery): Promise<Result<PermissionDto>> {
    return ResultFactory.success({} as PermissionDto);
  }
}

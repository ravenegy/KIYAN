import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetRoleByIdQueryHandler } from '../IGetRoleByIdQueryHandler';
import { GetRoleByIdQuery } from '../../queries';
import { RoleDto } from '../../dto';

export class GetRoleByIdQueryHandler
  extends BaseQueryHandler<GetRoleByIdQuery, RoleDto>
  implements IGetRoleByIdQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetRoleByIdQuery): Promise<Result<RoleDto>> {
    return ResultFactory.success({} as RoleDto);
  }
}

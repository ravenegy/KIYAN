import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetUserByEmailQueryHandler } from '../IGetUserByEmailQueryHandler';
import { GetUserByEmailQuery } from '../../queries';
import { UserDto } from '../../dto';

export class GetUserByEmailQueryHandler
  extends BaseQueryHandler<GetUserByEmailQuery, UserDto>
  implements IGetUserByEmailQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetUserByEmailQuery): Promise<Result<UserDto>> {
    return ResultFactory.success({} as UserDto);
  }
}

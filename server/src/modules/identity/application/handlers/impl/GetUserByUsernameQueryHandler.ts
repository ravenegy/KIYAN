import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetUserByUsernameQueryHandler } from '../IGetUserByUsernameQueryHandler';
import { GetUserByUsernameQuery } from '../../queries';
import { UserDto } from '../../dto';

export class GetUserByUsernameQueryHandler
  extends BaseQueryHandler<GetUserByUsernameQuery, UserDto>
  implements IGetUserByUsernameQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetUserByUsernameQuery): Promise<Result<UserDto>> {
    return ResultFactory.success({} as UserDto);
  }
}

import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetUserByIdQueryHandler } from '../IGetUserByIdQueryHandler';
import { GetUserByIdQuery } from '../../queries';
import { UserDto } from '../../dto';

export class GetUserByIdQueryHandler
  extends BaseQueryHandler<GetUserByIdQuery, UserDto>
  implements IGetUserByIdQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetUserByIdQuery): Promise<Result<UserDto>> {
    return ResultFactory.success({} as UserDto);
  }
}

import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetUsersQueryHandler } from '../IGetUsersQueryHandler';
import { GetUsersQuery } from '../../queries';
import { PagedUserDto } from '../../dto';

export class GetUsersQueryHandler
  extends BaseQueryHandler<GetUsersQuery, PagedUserDto>
  implements IGetUsersQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetUsersQuery): Promise<Result<PagedUserDto>> {
    return ResultFactory.success({ items: [], totalCount: 0, page: 1, pageSize: 10 } as PagedUserDto);
  }
}

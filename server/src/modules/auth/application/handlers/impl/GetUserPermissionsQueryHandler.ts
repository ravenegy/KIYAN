import { Result, ResultFactory, BaseQueryHandler } from '../../../../../core';
import { IGetUserPermissionsQueryHandler } from '../IGetUserPermissionsQueryHandler';
import { GetUserPermissionsQuery } from '../../queries';

export class GetUserPermissionsQueryHandler
  extends BaseQueryHandler<GetUserPermissionsQuery, string[]>
  implements IGetUserPermissionsQueryHandler
{
  constructor() {
    super();
  }

  public async handle(query: GetUserPermissionsQuery): Promise<Result<string[]>> {
    return ResultFactory.success([]);
  }
}

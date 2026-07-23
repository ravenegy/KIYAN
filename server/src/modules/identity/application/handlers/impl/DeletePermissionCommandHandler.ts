import { Result, ResultFactory, BaseCommandHandler } from '../../../../../core';
import { IDeletePermissionCommandHandler } from '../IDeletePermissionCommandHandler';
import { DeletePermissionCommand } from '../../commands';

export class DeletePermissionCommandHandler
  extends BaseCommandHandler<DeletePermissionCommand, void>
  implements IDeletePermissionCommandHandler
{
  constructor() {
    super();
  }

  public async handle(command: DeletePermissionCommand): Promise<Result<void>> {
    return ResultFactory.success();
  }
}

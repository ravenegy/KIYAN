import { Result, ResultFactory } from '../../../../../core';
import { IDeletePermissionGroupValidator } from '../IDeletePermissionGroupValidator';
import { DeletePermissionGroupCommand } from '../../commands';

export class DeletePermissionGroupValidator implements IDeletePermissionGroupValidator {
  public validate(request: DeletePermissionGroupCommand): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }
    return ResultFactory.success<void>();
  }
}

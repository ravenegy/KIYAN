import { Result, ResultFactory } from '../../../../../core';
import { IUpdatePermissionGroupValidator } from '../IUpdatePermissionGroupValidator';
import { UpdatePermissionGroupCommand } from '../../commands';

export class UpdatePermissionGroupValidator implements IUpdatePermissionGroupValidator {
  public validate(request: UpdatePermissionGroupCommand): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }
    return ResultFactory.success<void>();
  }
}

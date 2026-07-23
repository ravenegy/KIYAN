import { Result, ResultFactory } from '../../../../../core';
import { ICreatePermissionGroupValidator } from '../ICreatePermissionGroupValidator';
import { CreatePermissionGroupCommand } from '../../commands';

export class CreatePermissionGroupValidator implements ICreatePermissionGroupValidator {
  public validate(request: CreatePermissionGroupCommand): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }
    return ResultFactory.success<void>();
  }
}

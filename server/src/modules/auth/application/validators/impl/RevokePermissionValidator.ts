import { Result, ResultFactory } from '../../../../../core';
import { IRevokePermissionValidator } from '../IRevokePermissionValidator';
import { RevokePermissionCommand } from '../../commands';

export class RevokePermissionValidator implements IRevokePermissionValidator {
  public validate(request: RevokePermissionCommand): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }
    return ResultFactory.success<void>();
  }
}

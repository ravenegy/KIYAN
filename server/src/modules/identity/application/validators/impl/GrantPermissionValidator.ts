import { Result, ResultFactory } from '../../../../../core';
import { IGrantPermissionValidator } from '../IGrantPermissionValidator';
import { GrantPermissionRequest } from '../../dto';

export class GrantPermissionValidator implements IGrantPermissionValidator {
  public validate(request: GrantPermissionRequest): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }

    if (!request.permissionId) {
      return ResultFactory.validation<void>('permissionId is required.');
    }

    if (!request.userId && !request.roleId) {
      return ResultFactory.validation<void>('Either userId or roleId must be provided.');
    }
    if (request.userId && request.roleId) {
      return ResultFactory.validation<void>('Cannot provide both userId and roleId.');
    }
    
    return ResultFactory.success<void>();
  }
}

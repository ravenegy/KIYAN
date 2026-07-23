import { Result, ResultFactory } from '../../../../../core';
import { IAssignPermissionValidator } from '../IAssignPermissionValidator';
import { AssignPermissionCommand } from '../../commands';

export class AssignPermissionValidator implements IAssignPermissionValidator {
  public validate(request: AssignPermissionCommand): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }
    return ResultFactory.success<void>();
  }
}

import { Result, ResultFactory } from '../../../../../core';
import { IAssignRoleValidator } from '../IAssignRoleValidator';
import { AssignRoleRequest } from '../../dto';

export class AssignRoleValidator implements IAssignRoleValidator {
  public validate(request: AssignRoleRequest): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }

    if (!request.userId) {
      return ResultFactory.validation<void>('userId is required.');
    }
    if (!request.roleId) {
      return ResultFactory.validation<void>('roleId is required.');
    }
    return ResultFactory.success<void>();
  }
}

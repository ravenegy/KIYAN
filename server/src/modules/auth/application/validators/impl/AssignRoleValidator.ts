import { Result, ResultFactory } from '../../../../../core';
import { IAssignRoleValidator } from '../IAssignRoleValidator';
import { AssignRoleCommand } from '../../commands';

export class AssignRoleValidator implements IAssignRoleValidator {
  public validate(request: AssignRoleCommand): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }
    return ResultFactory.success<void>();
  }
}

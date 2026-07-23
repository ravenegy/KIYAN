import { Result, ResultFactory } from '../../../../../core';
import { IRevokeRoleValidator } from '../IRevokeRoleValidator';
import { RevokeRoleCommand } from '../../commands';

export class RevokeRoleValidator implements IRevokeRoleValidator {
  public validate(request: RevokeRoleCommand): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }
    return ResultFactory.success<void>();
  }
}

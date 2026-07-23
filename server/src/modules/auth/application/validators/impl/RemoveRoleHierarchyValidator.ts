import { Result, ResultFactory } from '../../../../../core';
import { IRemoveRoleHierarchyValidator } from '../IRemoveRoleHierarchyValidator';
import { RemoveRoleHierarchyCommand } from '../../commands';

export class RemoveRoleHierarchyValidator implements IRemoveRoleHierarchyValidator {
  public validate(request: RemoveRoleHierarchyCommand): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }
    return ResultFactory.success<void>();
  }
}

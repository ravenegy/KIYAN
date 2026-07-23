import { Result, ResultFactory } from '../../../../../core';
import { IDefineRoleHierarchyValidator } from '../IDefineRoleHierarchyValidator';
import { DefineRoleHierarchyCommand } from '../../commands';

export class DefineRoleHierarchyValidator implements IDefineRoleHierarchyValidator {
  public validate(request: DefineRoleHierarchyCommand): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }
    return ResultFactory.success<void>();
  }
}

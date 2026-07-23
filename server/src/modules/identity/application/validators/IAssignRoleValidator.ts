import { Result } from '../../../../core';

export interface IAssignRoleValidator {
  validate(request: any): Result<void>;
}

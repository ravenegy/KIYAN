import { Result } from '../../../../core';

export interface IGrantPermissionValidator {
  validate(request: any): Result<void>;
}

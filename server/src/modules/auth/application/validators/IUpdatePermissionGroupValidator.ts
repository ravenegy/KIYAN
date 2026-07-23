import { Result } from '../../../../core/results/Result';

export interface IUpdatePermissionGroupValidator {
  validate(request: any): Result<void>;
}

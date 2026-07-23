import { Result } from '../../../../core/results/Result';

export interface ICreatePermissionGroupValidator {
  validate(request: any): Result<void>;
}

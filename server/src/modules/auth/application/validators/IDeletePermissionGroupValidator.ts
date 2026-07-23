import { Result } from '../../../../core/results/Result';

export interface IDeletePermissionGroupValidator {
  validate(request: any): Result<void>;
}

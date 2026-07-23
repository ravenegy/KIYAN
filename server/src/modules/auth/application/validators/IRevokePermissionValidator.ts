import { Result } from '../../../../core/results/Result';

export interface IRevokePermissionValidator {
  validate(request: any): Result<void>;
}

import { Result } from '../../../../core/results/Result';

export interface IRevokeRoleValidator {
  validate(request: any): Result<void>;
}

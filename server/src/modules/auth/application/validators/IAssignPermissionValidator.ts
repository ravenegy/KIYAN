import { Result } from '../../../../core/results/Result';

export interface IAssignPermissionValidator {
  validate(request: any): Result<void>;
}

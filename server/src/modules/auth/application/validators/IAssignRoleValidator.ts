import { Result } from '../../../../core/results/Result';

export interface IAssignRoleValidator {
  validate(request: any): Result<void>;
}

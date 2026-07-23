import { Result } from '../../../../core/results/Result';

export interface IRemoveRoleHierarchyValidator {
  validate(request: any): Result<void>;
}

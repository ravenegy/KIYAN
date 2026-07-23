import { Result } from '../../../../core/results/Result';

export interface IDefineRoleHierarchyValidator {
  validate(request: any): Result<void>;
}

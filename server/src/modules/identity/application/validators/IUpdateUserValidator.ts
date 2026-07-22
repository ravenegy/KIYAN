import { Result } from '../../../../core';

export interface IUpdateUserValidator {
  validate(request: any): Result<void>;
}

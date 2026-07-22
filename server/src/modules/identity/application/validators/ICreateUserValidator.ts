import { Result } from '../../../../core';

export interface ICreateUserValidator {
  validate(request: any): Result<void>;
}

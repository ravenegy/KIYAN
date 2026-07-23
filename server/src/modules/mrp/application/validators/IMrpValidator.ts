import { Result } from '../../../../core';

export interface IMrpValidator<T> {
  validate(data: T): Result<void>;
}

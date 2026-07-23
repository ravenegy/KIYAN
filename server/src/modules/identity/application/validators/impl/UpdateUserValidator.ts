import { Result, ResultFactory } from '../../../../../core';
import { IUpdateUserValidator } from '../IUpdateUserValidator';
import { UpdateUserRequest } from '../../dto';

export class UpdateUserValidator implements IUpdateUserValidator {
  public validate(request: UpdateUserRequest): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }

    if (!request.id) {
      return ResultFactory.validation<void>('id is required.');
    }
    if (request.email && !/^\S+@\S+\.\S+$/.test(request.email)) {
      return ResultFactory.validation<void>('email must be a valid email address.');
    }
    return ResultFactory.success<void>();
  }
}

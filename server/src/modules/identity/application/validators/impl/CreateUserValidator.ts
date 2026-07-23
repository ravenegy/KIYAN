import { Result, ResultFactory } from '../../../../../core';
import { ICreateUserValidator } from '../ICreateUserValidator';
import { CreateUserRequest } from '../../dto';

export class CreateUserValidator implements ICreateUserValidator {
  public validate(request: CreateUserRequest): Result<void> {
    if (!request) {
      return ResultFactory.validation<void>('Request cannot be null or undefined.');
    }

    if (!request.username) {
      return ResultFactory.validation<void>('username is required.');
    }
    if (request.username.length < 3) {
      return ResultFactory.validation<void>('username must be at least 3 characters.');
    }
    if (request.username.length > 50) {
      return ResultFactory.validation<void>('username cannot exceed 50 characters.');
    }
    if (!request.email) {
      return ResultFactory.validation<void>('email is required.');
    }
    if (!/^\S+@\S+\.\S+$/.test(request.email)) {
      return ResultFactory.validation<void>('email must be a valid email address.');
    }
    if (request.password && request.password.length < 8) {
      return ResultFactory.validation<void>('password must be at least 8 characters.');
    }
    if (request.password && request.password.length > 100) {
      return ResultFactory.validation<void>('password cannot exceed 100 characters.');
    }
    return ResultFactory.success<void>();
  }
}

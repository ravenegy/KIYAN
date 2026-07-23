import { CreateLookupCommand } from '../commands/CreateLookupCommand';
import { Result, ErrorCode } from '../../../../core';

export class CreateLookupValidator {
  public validate(command: CreateLookupCommand): Result<void> {
    if (!command.code || command.code.trim() === '') {
      return Result.failure({
        code: ErrorCode.Validation,
        message: 'Code is required.'
      });
    }
    if (!command.name || command.name.trim() === '') {
      return Result.failure({
        code: ErrorCode.Validation,
        message: 'Name is required.'
      });
    }
    return Result.success();
  }
}

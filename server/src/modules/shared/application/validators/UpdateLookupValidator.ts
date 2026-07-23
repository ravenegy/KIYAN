import { UpdateLookupCommand } from '../commands/UpdateLookupCommand';
import { Result, ErrorCode } from '../../../../core';

export class UpdateLookupValidator {
  public validate(command: UpdateLookupCommand): Result<void> {
    if (!command.lookupId || command.lookupId.trim() === '') {
      return Result.failure({
        code: ErrorCode.Validation,
        message: 'Lookup ID is required.'
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

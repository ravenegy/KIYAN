import { Result, ErrorCode } from '../../../../core';
import { IMrpValidator } from './IMrpValidator';
import { CreateMrpRunCommand } from '../commands/CreateMrpRunCommand';

export class CreateMrpRunValidator implements IMrpValidator<CreateMrpRunCommand> {
  public validate(command: CreateMrpRunCommand): Result<void> {
    if (!command.plantId) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Plant ID is required' });
    }
    if (!command.horizonStartDate || !command.horizonEndDate) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Horizon dates are required' });
    }
    if (command.horizonStartDate >= command.horizonEndDate) {
      return Result.failure({ code: ErrorCode.Validation, message: 'Horizon start date must be before end date' });
    }
    return Result.success();
  }
}

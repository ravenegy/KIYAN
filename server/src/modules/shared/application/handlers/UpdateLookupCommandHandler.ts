import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { Result, ErrorCode } from '../../../../core';
import { UpdateLookupCommand } from '../commands/UpdateLookupCommand';

export class UpdateLookupCommandHandler implements ICommandHandler<UpdateLookupCommand, Result<void>> {
  public async handle(command: UpdateLookupCommand): Promise<Result<void>> {
    return Result.failure({
      code: ErrorCode.Unexpected,
      message: 'Not implemented'
    });
  }
}

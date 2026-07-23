import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { Result, ErrorCode } from '../../../../core';
import { DeleteLookupCommand } from '../commands/DeleteLookupCommand';

export class DeleteLookupCommandHandler implements ICommandHandler<DeleteLookupCommand, Result<void>> {
  public async handle(command: DeleteLookupCommand): Promise<Result<void>> {
    return Result.failure({
      code: ErrorCode.Unexpected,
      message: 'Not implemented'
    });
  }
}

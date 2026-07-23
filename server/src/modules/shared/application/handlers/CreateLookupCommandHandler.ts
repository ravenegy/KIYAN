import { ICommandHandler } from '../../../../core/mediator/commands/ICommandHandler';
import { Result, ErrorCode } from '../../../../core';
import { CreateLookupCommand } from '../commands/CreateLookupCommand';

export class CreateLookupCommandHandler implements ICommandHandler<CreateLookupCommand, Result<string>> {
  public async handle(command: CreateLookupCommand): Promise<Result<string>> {
    return Result.failure({
      code: ErrorCode.Unexpected,
      message: 'Not implemented'
    });
  }
}

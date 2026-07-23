import { Result, ErrorCode } from "../../../../../core";
import { ICommandHandler } from "../../../../../core/mediator/commands/ICommandHandler";
import { CancelMrpRunCommand } from "../../commands/CancelMrpRunCommand";
import { IMrpRunRepository } from "../../../domain/repositories/IMrpRunRepository";
import { MrpRunId } from "../../../domain/shared/MrpRunId";
import { MrpRunNotFoundException } from "../../exceptions/MrpApplicationExceptions";

export class CancelMrpRunCommandHandler implements ICommandHandler<
  CancelMrpRunCommand,
  Result<void>
> {
  constructor(private readonly mrpRunRepository: IMrpRunRepository) {}

  public async handle(command: CancelMrpRunCommand): Promise<Result<void>> {
    const idResult = MrpRunId.create(command.mrpRunId);
    if (idResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: "Invalid MrpRunId",
      });
    }

    const run = await this.mrpRunRepository.getById(idResult.value!);
    if (!run) {
      throw new MrpRunNotFoundException(command.mrpRunId);
    }

    const failResult = run.fail(command.reason);
    if (failResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: failResult.error?.message || "Failed to cancel MRP run",
      });
    }

    await this.mrpRunRepository.save(run);
    return Result.success();
  }
}

import { Result, ErrorCode } from "../../../../../core";
import { ICommandHandler } from "../../../../../core/mediator/commands/ICommandHandler";
import { StartMrpRunCommand } from "../../commands/StartMrpRunCommand";
import { IMrpRunRepository } from "../../../domain/repositories/IMrpRunRepository";
import { MrpRunId } from "../../../domain/shared/MrpRunId";
import { MrpRunNotFoundException } from "../../exceptions/MrpApplicationExceptions";

export class StartMrpRunCommandHandler implements ICommandHandler<
  StartMrpRunCommand,
  Result<void>
> {
  constructor(private readonly mrpRunRepository: IMrpRunRepository) {}

  public async handle(command: StartMrpRunCommand): Promise<Result<void>> {
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

    const startResult = run.start();
    if (startResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: startResult.error?.message || "Failed to start MRP run",
      });
    }

    await this.mrpRunRepository.save(run);
    return Result.success();
  }
}

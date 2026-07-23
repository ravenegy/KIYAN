import { Result, ErrorCode } from "../../../../../core";
import { ICommandHandler } from "../../../../../core/mediator/commands/ICommandHandler";
import { CompleteMrpRunCommand } from "../../commands/CompleteMrpRunCommand";
import { IMrpRunRepository } from "../../../domain/repositories/IMrpRunRepository";
import { MrpRunId } from "../../../domain/shared/MrpRunId";
import { MrpRunNotFoundException } from "../../exceptions/MrpApplicationExceptions";

export class CompleteMrpRunCommandHandler implements ICommandHandler<
  CompleteMrpRunCommand,
  Result<void>
> {
  constructor(private readonly mrpRunRepository: IMrpRunRepository) {}

  public async handle(command: CompleteMrpRunCommand): Promise<Result<void>> {
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

    const completeResult = run.complete(command.plannedOrdersCount);
    if (completeResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: completeResult.error?.message || "Failed to complete MRP run",
      });
    }

    await this.mrpRunRepository.save(run);
    return Result.success();
  }
}

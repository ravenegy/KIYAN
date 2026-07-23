import { ICommandHandler } from "../../../../../core/mediator/commands/ICommandHandler";
import { CreateMrpRunCommand } from "../../commands/CreateMrpRunCommand";
import { IMrpRunRepository } from "../../../domain/repositories/IMrpRunRepository";
import { MrpRun } from "../../../domain/entities/MrpRun";
import { MrpRunId } from "../../../domain/shared/MrpRunId";
import { PlanningHorizon } from "../../../domain/value-objects/PlanningHorizon";
import { Result, ErrorCode } from "../../../../../core";

export class CreateMrpRunCommandHandler implements ICommandHandler<
  CreateMrpRunCommand,
  Result<string>
> {
  constructor(private readonly mrpRunRepository: IMrpRunRepository) {}

  public async handle(command: CreateMrpRunCommand): Promise<Result<string>> {
    const horizonResult = PlanningHorizon.create(
      command.horizonStartDate,
      command.horizonEndDate,
    );
    if (horizonResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: horizonResult.error?.message || "Invalid horizon",
      });
    }

    const idResult = MrpRunId.create(crypto.randomUUID());
    if (idResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: idResult.error?.message || "Invalid ID",
      });
    }

    const runResult = MrpRun.create(idResult.value!, {
      plantId: command.plantId,
      horizon: horizonResult.value!,
    });

    if (runResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: runResult.error?.message || "Failed to create MRP run",
      });
    }

    await this.mrpRunRepository.save(runResult.value!);

    return Result.success(idResult.value!.value);
  }
}

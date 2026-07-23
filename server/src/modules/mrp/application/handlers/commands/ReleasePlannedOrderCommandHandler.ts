import { Result, ErrorCode } from "../../../../../core";
import { ICommandHandler } from "../../../../../core/mediator/commands/ICommandHandler";
import { ReleasePlannedOrderCommand } from "../../commands/ReleasePlannedOrderCommand";
import { IPlannedOrderRepository } from "../../../domain/repositories/IPlannedOrderRepository";
import { PlannedOrderId } from "../../../domain/shared/PlannedOrderId";
import { PlannedOrderNotFoundException } from "../../exceptions/MrpApplicationExceptions";

export class ReleasePlannedOrderCommandHandler implements ICommandHandler<
  ReleasePlannedOrderCommand,
  Result<void>
> {
  constructor(
    private readonly plannedOrderRepository: IPlannedOrderRepository,
  ) {}

  public async handle(
    command: ReleasePlannedOrderCommand,
  ): Promise<Result<void>> {
    const idResult = PlannedOrderId.create(command.plannedOrderId);
    if (idResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: "Invalid PlannedOrderId",
      });
    }

    const order = await this.plannedOrderRepository.getById(idResult.value!);
    if (!order) {
      throw new PlannedOrderNotFoundException(command.plannedOrderId);
    }

    const releaseResult = order.release();
    if (releaseResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message:
          releaseResult.error?.message || "Failed to release planned order",
      });
    }

    await this.plannedOrderRepository.save(order);
    return Result.success();
  }
}

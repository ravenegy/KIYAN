import { Result, ErrorCode } from "../../../../../core";
import { ICommandHandler } from "../../../../../core/mediator/commands/ICommandHandler";
import { CancelPlannedOrderCommand } from "../../commands/CancelPlannedOrderCommand";
import { IPlannedOrderRepository } from "../../../domain/repositories/IPlannedOrderRepository";
import { PlannedOrderId } from "../../../domain/shared/PlannedOrderId";
import { PlannedOrderNotFoundException } from "../../exceptions/MrpApplicationExceptions";

export class CancelPlannedOrderCommandHandler implements ICommandHandler<
  CancelPlannedOrderCommand,
  Result<void>
> {
  constructor(
    private readonly plannedOrderRepository: IPlannedOrderRepository,
  ) {}

  public async handle(
    command: CancelPlannedOrderCommand,
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

    const cancelResult = order.cancel(command.reason);
    if (cancelResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message:
          cancelResult.error?.message || "Failed to cancel planned order",
      });
    }

    await this.plannedOrderRepository.save(order);
    return Result.success();
  }
}

import { Result, ErrorCode } from "../../../../../core";
import { ICommandHandler } from "../../../../../core/mediator/commands/ICommandHandler";
import { FirmPlannedOrderCommand } from "../../commands/FirmPlannedOrderCommand";
import { IPlannedOrderRepository } from "../../../domain/repositories/IPlannedOrderRepository";
import { PlannedOrderId } from "../../../domain/shared/PlannedOrderId";
import { PlannedOrderNotFoundException } from "../../exceptions/MrpApplicationExceptions";

export class FirmPlannedOrderCommandHandler implements ICommandHandler<
  FirmPlannedOrderCommand,
  Result<void>
> {
  constructor(
    private readonly plannedOrderRepository: IPlannedOrderRepository,
  ) {}

  public async handle(command: FirmPlannedOrderCommand): Promise<Result<void>> {
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

    const firmResult = order.firm();
    if (firmResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: firmResult.error?.message || "Failed to firm planned order",
      });
    }

    await this.plannedOrderRepository.save(order);
    return Result.success();
  }
}

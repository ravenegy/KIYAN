import { Result, ErrorCode } from "../../../../../core";
import { ICommandHandler } from "../../../../../core/mediator/commands/ICommandHandler";
import { CreatePlannedOrderCommand } from "../../commands/CreatePlannedOrderCommand";
import { IPlannedOrderRepository } from "../../../domain/repositories/IPlannedOrderRepository";
import { PlannedOrder } from "../../../domain/entities/PlannedOrder";
import { PlannedOrderId } from "../../../domain/shared/PlannedOrderId";
import { Quantity } from "../../../domain/value-objects/Quantity";
import { PlannedOrderType } from "../../../domain/enums/PlannedOrderType";

export class CreatePlannedOrderCommandHandler implements ICommandHandler<
  CreatePlannedOrderCommand,
  Result<string>
> {
  constructor(
    private readonly plannedOrderRepository: IPlannedOrderRepository,
  ) {}

  public async handle(
    command: CreatePlannedOrderCommand,
  ): Promise<Result<string>> {
    const idResult = PlannedOrderId.create(crypto.randomUUID());
    if (idResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: idResult.error?.message || "Invalid ID",
      });
    }

    const quantityResult = Quantity.create(command.quantity);
    if (quantityResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: quantityResult.error?.message || "Invalid quantity",
      });
    }

    const orderResult = PlannedOrder.create(idResult.value!, {
      itemId: command.itemId,
      quantity: quantityResult.value!,
      startDate: command.startDate,
      endDate: command.endDate,
      type: command.orderType as PlannedOrderType,
      mrpRunId: command.mrpRunId,
      sourceRequirementId: command.sourceRequirementId,
    });

    if (orderResult.isFailure) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: orderResult.error?.message || "Failed to create planned order",
      });
    }

    await this.plannedOrderRepository.save(orderResult.value!);

    return Result.success(idResult.value!.value);
  }
}

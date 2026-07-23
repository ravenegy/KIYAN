import { IMrpCommandService } from "../IMrpCommandService";
import { ICommandBus } from "../../../../../core/mediator/commands/ICommandBus";
import { Result, ErrorCode } from "../../../../../core";
import {
  CreateMrpRunCommand,
  StartMrpRunCommand,
  CompleteMrpRunCommand,
  CancelMrpRunCommand,
  CreatePlannedOrderCommand,
  FirmPlannedOrderCommand,
  ReleasePlannedOrderCommand,
  CancelPlannedOrderCommand,
} from "../../commands";

export class MrpCommandService implements IMrpCommandService {
  constructor(private readonly commandBus: ICommandBus) {}

  public async createMrpRun(
    plantId: string,
    horizonStartDate: Date,
    horizonEndDate: Date,
  ): Promise<Result<string>> {
    try {
      const command = new CreateMrpRunCommand(
        plantId,
        horizonStartDate,
        horizonEndDate,
      );
      return await this.commandBus.execute<Result<string>>(command);
    } catch (error: any) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: error.message,
      });
    }
  }

  public async startMrpRun(mrpRunId: string): Promise<Result<void>> {
    try {
      const command = new StartMrpRunCommand(mrpRunId);
      return await this.commandBus.execute<Result<void>>(command);
    } catch (error: any) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: error.message,
      });
    }
  }

  public async completeMrpRun(
    mrpRunId: string,
    plannedOrdersCount: number,
  ): Promise<Result<void>> {
    try {
      const command = new CompleteMrpRunCommand(mrpRunId, plannedOrdersCount);
      return await this.commandBus.execute<Result<void>>(command);
    } catch (error: any) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: error.message,
      });
    }
  }

  public async cancelMrpRun(
    mrpRunId: string,
    reason: string,
  ): Promise<Result<void>> {
    try {
      const command = new CancelMrpRunCommand(mrpRunId, reason);
      return await this.commandBus.execute<Result<void>>(command);
    } catch (error: any) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: error.message,
      });
    }
  }

  public async createPlannedOrder(
    itemId: string,
    quantity: number,
    startDate: Date,
    endDate: Date,
    orderType: string,
    mrpRunId: string,
    sourceRequirementId?: string,
  ): Promise<Result<string>> {
    try {
      const command = new CreatePlannedOrderCommand(
        itemId,
        quantity,
        startDate,
        endDate,
        orderType,
        mrpRunId,
        sourceRequirementId,
      );
      return await this.commandBus.execute<Result<string>>(command);
    } catch (error: any) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: error.message,
      });
    }
  }

  public async firmPlannedOrder(plannedOrderId: string): Promise<Result<void>> {
    try {
      const command = new FirmPlannedOrderCommand(plannedOrderId);
      return await this.commandBus.execute<Result<void>>(command);
    } catch (error: any) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: error.message,
      });
    }
  }

  public async releasePlannedOrder(
    plannedOrderId: string,
  ): Promise<Result<void>> {
    try {
      const command = new ReleasePlannedOrderCommand(plannedOrderId);
      return await this.commandBus.execute<Result<void>>(command);
    } catch (error: any) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: error.message,
      });
    }
  }

  public async cancelPlannedOrder(
    plannedOrderId: string,
    reason: string,
  ): Promise<Result<void>> {
    try {
      const command = new CancelPlannedOrderCommand(plannedOrderId, reason);
      return await this.commandBus.execute<Result<void>>(command);
    } catch (error: any) {
      return Result.failure({
        code: ErrorCode.Unexpected,
        message: error.message,
      });
    }
  }
}

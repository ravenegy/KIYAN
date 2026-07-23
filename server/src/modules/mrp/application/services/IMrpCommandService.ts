import { Result } from "../../../../core";

export interface IMrpCommandService {
  createMrpRun(
    plantId: string,
    horizonStartDate: Date,
    horizonEndDate: Date,
  ): Promise<Result<string>>;
  startMrpRun(mrpRunId: string): Promise<Result<void>>;
  completeMrpRun(
    mrpRunId: string,
    plannedOrdersCount: number,
  ): Promise<Result<void>>;
  cancelMrpRun(mrpRunId: string, reason: string): Promise<Result<void>>;
  createPlannedOrder(
    itemId: string,
    quantity: number,
    startDate: Date,
    endDate: Date,
    orderType: string,
    mrpRunId: string,
    sourceRequirementId?: string,
  ): Promise<Result<string>>;
  firmPlannedOrder(plannedOrderId: string): Promise<Result<void>>;
  releasePlannedOrder(plannedOrderId: string): Promise<Result<void>>;
  cancelPlannedOrder(
    plannedOrderId: string,
    reason: string,
  ): Promise<Result<void>>;
}

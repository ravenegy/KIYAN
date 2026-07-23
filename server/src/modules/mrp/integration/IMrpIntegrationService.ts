import { Result } from '../../../core';
import { MrpRunDto } from '../application/dto/MrpRunDto';
import { PlannedOrderDto } from '../application/dto/PlannedOrderDto';
import { MaterialRequirementDto } from '../application/dto/MaterialRequirementDto';

export interface SupplyRecommendationDto {
  readonly itemId: string;
  readonly recommendedQuantity: number;
  readonly requiredDate: string;
  readonly sourceRequirementId: string;
}

export interface DemandSummaryDto {
  readonly itemId: string;
  readonly totalDemand: number;
  readonly pendingSupply: number;
  readonly netRequirement: number;
}

/**
 * Cross-module integration service for the MRP module.
 * Provides internal APIs for other modules (e.g., Production, Purchasing) to access MRP data
 * returning only DTOs and Result<T>.
 */
export interface IMrpIntegrationService {
  createMrpRun(
    plantId: string,
    horizonStartDate: Date,
    horizonEndDate: Date
  ): Promise<Result<string>>;

  getMrpRun(mrpRunId: string): Promise<Result<MrpRunDto | null>>;

  getMaterialRequirements(mrpRunId: string): Promise<Result<readonly MaterialRequirementDto[]>>;

  getPlannedOrders(mrpRunId: string): Promise<Result<readonly PlannedOrderDto[]>>;

  getOpenPlannedOrders(itemId?: string): Promise<Result<readonly PlannedOrderDto[]>>;

  releasePlannedOrder(plannedOrderId: string): Promise<Result<void>>;

  firmPlannedOrder(plannedOrderId: string): Promise<Result<void>>;

  cancelPlannedOrder(plannedOrderId: string, reason: string): Promise<Result<void>>;

  getSupplyRecommendations(mrpRunId: string): Promise<Result<readonly SupplyRecommendationDto[]>>;

  getDemandSummary(mrpRunId: string): Promise<Result<readonly DemandSummaryDto[]>>;
}
